import Head from 'next/head';

import { Box, SimpleGrid, Text } from '@chakra-ui/react';

export default function Testpage() {
  return (
    <>
      <Head>
        <title>Testpage | Circ</title>
      </Head>
      <SimpleGrid flex="1" gap="4" minChildWidth="320px" alignItems="flex-start">
        <Box p={['6', '8']} bg="gray.800" borderRadius={8} pb="4">
          <Text align="center" colorScheme="pink" size="lg">
            Testpage
          </Text>
        </Box>
      </SimpleGrid>
    </>
  )
}
