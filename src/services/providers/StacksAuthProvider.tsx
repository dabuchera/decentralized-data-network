import { useRouter } from 'next/router';
import {
    createContext, Dispatch, PropsWithChildren, SetStateAction, useContext, useEffect, useState
} from 'react';
import { useRelayEnvironment } from 'react-relay';

import { appDetails } from '@/lib/constants';
import { loadDIDSession } from '@/relay/environment';
import { AppConfig, showConnect, UserData, UserSession } from '@stacks/connect';
import { StacksMainnet, StacksMocknet, StacksNetwork, StacksTestnet } from '@stacks/network';

interface IStacksAuthContextValue {
  network: StacksNetwork
  address?: string
  userSession: UserSession
  userData: UserData | undefined
  setUserData: Dispatch<SetStateAction<UserData | undefined>>
  authenticate: () => void
  logout: () => void
}

const AuthContext = createContext<IStacksAuthContextValue | undefined>(undefined)

// eslint-disable-next-line @typescript-eslint/ban-types
export default function StacksProvider({ children }: PropsWithChildren<{}>) {
  const [userData, setUserData] = useState<UserData | undefined>(undefined)

  const network = new StacksMainnet()
  // const network = new StacksTestnet()
  // const network = new StacksMocknet()

  const appConfig = new AppConfig(['store_write']) // Might need publish_data instead?
  const userSession = new UserSession({ appConfig })
  // BNS Change
  const address: string | undefined = userData?.profile?.stxAddress?.mainnet

  const authenticate = (): void => {
    showConnect({
      appDetails,
      onFinish: async () => {
        const userData = userSession.loadUserData()
        await loadDIDSession(userData).then((didsession) => {
          setUserData(userData)
          // window.location.reload()
        })
      },
      userSession,
    })
  }

  const logout = (): void => {
    userSession.signUserOut()
    localStorage.removeItem('didsession')
    window.location.reload()
  }

  useEffect(() => {
    if (userSession.isSignInPending()) {
      console.log('isSignInPending')
      userSession.handlePendingSignIn().then((userData) => {
        if (userData) {
          loadDIDSession(userData).then((session) => {
            if (session) {
              setUserData(userData)
            }
          })
        }      })
    } else if (userSession.isUserSignedIn()) {
      console.log('User Signed In')
      const userData = userSession.loadUserData()
      if (userData) {
        loadDIDSession(userData).then((session) => {
          if (session) {
            setUserData(userData)
          }
        })
      }
    }
  }, [])

  const value: IStacksAuthContextValue = { network, address, userSession, userData, setUserData, authenticate, logout }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuthContext(fromWhere:string) {
  console.log('useAuthContext ' + fromWhere)
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuthContext must be used within a AuthProvider')
  }
  return context
}
