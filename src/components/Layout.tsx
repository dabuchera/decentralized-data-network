import Link from 'next/link';
import { ReactNode } from 'react';

import { SideBarDrawerProvider } from '@/context/SidebarDrawerContext';
import { useAuthContext } from '@/services/providers/StacksAuthProvider';
import { Button, Flex } from '@chakra-ui/react';

import { Header } from './Header';
import { Sidebar } from './Sidebar';

type LayoutProps = {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const { userData, authenticate } = useAuthContext('Layout')

  return (
    <>
      {userData ? (
        <SideBarDrawerProvider>
          <Flex direction="column" h="100vh">
            <Header />
            {/* <Flex w="100%" mt="6" maxWidth={1480} mx="auto" px="6"> */}
            <Flex w="100%" mt="6" maxWidth="90vw" mx="auto" px="6">

              <Sidebar />
              <main>{children}</main>
            </Flex>
          </Flex>
        </SideBarDrawerProvider>
      ) : (
        <Flex w="100vw" h="100vh" align="center" justify="center">
          <Flex w="100%" maxWidth={360} bg="gray.800" p="8" borderRadius={8} flexDirection="column">
            <Button type="submit" colorScheme="pink" size="lg" onClick={authenticate}>
              Connect Wallet
            </Button>
          </Flex>
        </Flex>
      )}
    </>
  )
}
