import NextLink from 'next/link';

import { Box, Text } from '@chakra-ui/react';

export function Logo() {
  return (
    <NextLink href="/" passHref>
      <Box as="div" fontSize={['2xl', '3xl']} fontWeight="bold" letterSpacing="tight" w="32">
        Circ
        <Text as="span" ml="1" color="pink.300">
          .
        </Text>
      </Box>
    </NextLink>
  )
}
