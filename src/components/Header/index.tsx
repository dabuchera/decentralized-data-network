import { useEffect } from 'react';
import { RiMenuLine } from 'react-icons/ri';

import { Flex, Icon, IconButton, useBreakpointValue } from '@chakra-ui/react';

import { useSideBarDrawer } from '../../context/SidebarDrawerContext';
import { Logo } from './Logo';
import { NotificationNav } from './NotificationNav';
import { Profile } from './Profile';
import { SearchBox } from './SearchBox';

export function Header() {
  const { onOpen } = useSideBarDrawer()

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  })

  return (
    <Flex
      as="header"
      w="100%"
      // maxWidth={1480}
      maxWidth="95vw"
      h="20"
      mx="auto"
      mt="4"
      px="6"
      align="center"
    >
      {!isWideVersion && (
        <IconButton aria-label="Open navigation" icon={<Icon as={RiMenuLine} />} fontSize="24" variant="unstyled" onClick={onOpen} mr="2" />
      )}

      <Logo />

      {isWideVersion && <SearchBox />}

      <Flex align="center" ml="auto">
        <NotificationNav />

        <Profile isWideVersion={isWideVersion} />
      </Flex>
    </Flex>
  )
}
