import type { AppProps } from 'next/app'
import { makeServer } from '../services/mirage'
import { ReactQueryDevtools } from 'react-query/devtools'
import { QueryClientProvider } from 'react-query'
import { SideBarDrawerProvider } from '../context/SidebarDrawerContext'
import { ReactRelayContext } from 'react-relay'
import { environment } from '@/lib/relay'

import { theme } from '../styles/theme'
import { Button, ChakraProvider } from '@chakra-ui/react'
import { queryClient } from '../services/queryClient'
import { useEffect } from 'react'
import { useAuth } from '@/services/hook/useAuth'
import { UserData, UserSession } from '@stacks/connect'
import { getAccountIdByNetwork, StacksWebAuth } from '@didtools/pkh-stacks'
import { DIDSession } from 'did-session'
import { composeClient, loadDIDSession } from '@/lib/composeDB'

if (process.env.NODE_ENV === 'development') {
  makeServer()
}

function MyApp({ Component, pageProps }: AppProps) {
  const { userSession, setUserData, authenticate, userData } = useAuth()

  useEffect(() => {
    if (userSession.isSignInPending()) {
      console.log('isSignInPending')
      userSession.handlePendingSignIn().then((userData) => {
        console.log('session')
        if (userData) {
          loadDIDSession(userData).then((session) => {
            if (session) {
              setUserData(userData)
            }
          })
        }
      })
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
  }, [userSession, setUserData])

  return (
    <ReactRelayContext.Provider value={{ environment }}>
      <QueryClientProvider client={queryClient}>
        <ChakraProvider theme={theme}>
          <SideBarDrawerProvider>
            <Component {...pageProps} />
          </SideBarDrawerProvider>
        </ChakraProvider>

        {/* <ReactQueryDevtools /> */}
      </QueryClientProvider>
    </ReactRelayContext.Provider>
  )
}

export default MyApp
