import { Box, Text } from '@chakra-ui/react';
import Link from 'next/link';

export function Logo() {
  return (
    <Link href="/dashboard" passHref>
      <Box
        as="a"
        fontSize={['2xl', '3xl']}
        fontWeight="bold"
        letterSpacing="tight"
        w="64"
      >
        Circ
        <Text as="span" ml="1" color="pink.300">
          .
        </Text>
      </Box>
    </Link>
  );
}
