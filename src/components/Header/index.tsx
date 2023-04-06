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

  /*  sm: 'sm', // 480px
    md: 'md', // 768px
    lg: 'lg', // 992px
    xl: 'xl', // 1280px
    xxl: 'xxl', // 1536px */

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  })

  const isWideVersionTest = useBreakpointValue({
    sm: 'sm', // 480px
    md: 'md', // 768px
    lg: 'lg', // 992px
    xl: 'xl', // 1280px
    xxl: 'xxl', // 1536px
  })

  useEffect(() => {
    console.log(isWideVersionTest)
  }, [isWideVersionTest])

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
