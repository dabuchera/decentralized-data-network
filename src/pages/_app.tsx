import type { AppProps } from 'next/app'
import { ReactRelayContext } from 'react-relay';

import Layout from '@/components/Layout';
import { environment } from '@/lib/relay';
import AppProvider from '@/services/providers/AppStateProvider';
import StacksAuthProvider from '@/services/providers/StacksAuthProvider';
import { ChakraProvider } from '@chakra-ui/react';

import { theme } from '../styles/theme';

if (process.env.NODE_ENV === 'development') {
  // Dies auskommentieren sodass der graphql stuff läuft
  // makeServer()
}

function MyApp({ Component, pageProps }: AppProps) {
  console.log('MyApp')

  return (
    <ReactRelayContext.Provider value={{ environment }}>
      <ChakraProvider theme={theme}>
        <StacksAuthProvider>
          {/* App Provider for later (DDM) see DAS */}
          <AppProvider>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </AppProvider>
        </StacksAuthProvider>
      </ChakraProvider>
    </ReactRelayContext.Provider>
  )
}

export default MyApp
