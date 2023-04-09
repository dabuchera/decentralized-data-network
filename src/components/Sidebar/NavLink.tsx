import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { ElementType, ReactNode } from 'react';

import { Icon, Link as ChakraLink, LinkProps as ChakraLinkProps, Text } from '@chakra-ui/react';

interface NavLinkProps extends ChakraLinkProps {
  href: string
  icon: ElementType
  children: ReactNode
}

export function NavLink({ icon, children, href, ...rest }: NavLinkProps) {
  const { asPath } = useRouter()

  let isActive = false

  // console.log('asPath')
  // console.log(asPath)

  // console.log('href')
  // console.log(href)

  const segments = asPath.split("/");

  // '/' + segments[1] === hre : This is for stuff like materialpassports/create
  if (asPath === href || asPath === rest.as || '/' + segments[1] === href )  {
    isActive = true
  }

  if (asPath === String(href) || asPath === String(rest.as)) {
    isActive = true
  }
  return (
    <ChakraLink as={NextLink} href={href} display="flex" alignItems="center" color={isActive ? 'pink.400' : 'gray.50'}>
      <Icon as={icon} fontSize="20" />
      <Text ml="2" fontWeight="medium">
        {children}
      </Text>
    </ChakraLink>
  )
}
