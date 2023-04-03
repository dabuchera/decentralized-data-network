import Head from 'next/head';
import { useEffect } from 'react';
import { useRelayEnvironment } from 'react-relay';

import { loadDIDSession } from '@/lib/composeDB';
import { getCurrentEnvironment } from '@/relay/environment';
import { useAuth } from '@/services/hook/useAuth';
import { Box, SimpleGrid, Text } from '@chakra-ui/react';

import type { NextPage } from 'next'
/* The useHasMounted function is typically used in Next.js applications to ensure that certain code,
  such as analytics or other client-side libraries, only runs after the component has mounted on the client side.
  This is because some code may not be compatible with server-side rendering,
  or may not be necessary until the component has been fully mounted. */
const Home: NextPage = () => {
  // const hasMounted = useHasMounted()
  // const { userSession, setUserData } = useAuth()

  // useEffect(() => {
  //   // We had an error where when not reloading the app it was not working at the beginning
  //   const userData = userSession.loadUserData();
  //   (async () => {
  //     await loadDIDSession(userData)
  //     setUserData(userData)
  //   })()
  // }, [])

  // useEffect(() => {
  //   const environment = getCurrentEnvironment()
  //   console.log(environment)
  // }, [])

  return (
    <>
      <Head>
        <title>Index | Circ</title>
      </Head>
      <SimpleGrid flex="1" gap="4" w="75vw" minChildWidth="320px" alignItems="flex-start">
        <Box p={['6', '8']} bg="gray.800" borderRadius={8} pb="4">
          <Text align="center" colorScheme="pink" size="lg">
            Do the Description here
          </Text>
        </Box>
      </SimpleGrid>
    </>
  )
}

export default Home
