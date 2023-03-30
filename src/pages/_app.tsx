import type { AppProps } from 'next/app'
import { Head } from 'next/document';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { ReactRelayContext } from 'react-relay';

import { Header } from '@/components/Header';
import Layout from '@/components/Layout';
import { Sidebar } from '@/components/Sidebar';
import { loadDIDSession } from '@/lib/composeDB';
import { environment } from '@/lib/relay';
import { useAuth } from '@/services/hook/useAuth';
import { Button, ChakraProvider, Flex } from '@chakra-ui/react';

import { SideBarDrawerProvider } from '../context/SidebarDrawerContext';
import { theme } from '../styles/theme';

if (process.env.NODE_ENV === 'development') {
  // Dies auskommentieren sodass der graphql stuff läuft
  // makeServer()
}

function MyApp({ Component, pageProps }: AppProps) {
  const { userSession, setUserData, authenticate, userData } = useAuth()
  const router = useRouter()

  useEffect(() => {
    console.log('_app.tsx -> useEffect')
    console.log('userSession')
    console.log(userSession)

    console.log('userData')
    console.log(userData)

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
            // router.push('/dashboard', undefined, { shallow: true })
          }
        })
      }
    }
  }, [userSession])

  return (
    <ReactRelayContext.Provider value={{ environment }}>
      {/* <QueryClientProvider client={queryClient}> */}
      <ChakraProvider theme={theme}>
        {userData ? (
          <>
            <SideBarDrawerProvider>
              <Flex direction="column" h="100vh">
                <Header />

                <Flex w="100%" mt="6" maxWidth={1480} mx="auto" px="6">
                  <Sidebar />
                  <Component {...pageProps} />
                </Flex>
              </Flex>
            </SideBarDrawerProvider>
          </>
        ) : (
          <>
            <Flex w="100vw" h="100vh" align="center" justify="center">
              <Flex w="100%" maxWidth={360} bg="gray.800" p="8" borderRadius={8} flexDirection="column">
                <Button type="submit" colorScheme="pink" size="lg" onClick={authenticate}>
                  Enter
                </Button>
              </Flex>
            </Flex>
          </>
        )}
      </ChakraProvider>

      {/* <ReactQueryDevtools /> */}
      {/* </QueryClientProvider> */}
    </ReactRelayContext.Provider>
  )
}

export default MyApp
