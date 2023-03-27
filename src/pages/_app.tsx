import type { AppProps } from 'next/app'
import { DIDSession } from 'did-session';
import { useEffect } from 'react';
import { QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { ReactRelayContext } from 'react-relay';

import { composeClient, loadDIDSession } from '@/lib/composeDB';
import { environment } from '@/lib/relay';
import { useAuth } from '@/services/hook/useAuth';
import { Button, ChakraProvider } from '@chakra-ui/react';
import { getAccountIdByNetwork, StacksWebAuth } from '@didtools/pkh-stacks';
import { UserData, UserSession } from '@stacks/connect';

import { SideBarDrawerProvider } from '../context/SidebarDrawerContext';
import { makeServer } from '../services/mirage';
import { queryClient } from '../services/queryClient';
import { theme } from '../styles/theme';

if (process.env.NODE_ENV === 'development') {
  // Dies auskommentieren sodass der graphql stuff läuft
  // makeServer()
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
      {/* <QueryClientProvider client={queryClient}> */}
        <ChakraProvider theme={theme}>
          <SideBarDrawerProvider>
            <Component {...pageProps} />
          </SideBarDrawerProvider>
        </ChakraProvider>

        {/* <ReactQueryDevtools /> */}
      {/* </QueryClientProvider> */}
    </ReactRelayContext.Provider>
  )
}

export default MyApp
