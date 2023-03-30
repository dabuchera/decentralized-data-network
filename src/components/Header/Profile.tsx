import { truncateMiddle } from '@/lib/utils';
import { useAuth } from '@/services/hook/useAuth';
import { Avatar, Box, Button, Flex, Text } from '@chakra-ui/react';

interface ProfileProps {
  isWideVersion?: boolean
}

export function Profile({ isWideVersion = true }: ProfileProps) {
  const { authenticate, logout, userData, useSTXAddress } = useAuth()
  return (
    // <Flex align="center">
    //   {showProfileData && (
    //     <Box mr="4" textAlign="right">
    //       <Text>Igor Michael</Text>
    //       <Text color="gray.300" fontSize="small">
    //         igormichael120@gmail.com
    //       </Text>
    //     </Box>
    //   )}

    //   <Avatar
    //     size="md"
    //     name="Igor Michael"
    //     bg="pink.300"
    //     src="https://github.com/igoormichaeel.png"
    //   />
    // </Flex>
    <Flex align="center" gap="2">
      {userData ? (
        <>
          {isWideVersion && (
            <Button colorScheme="pink" size="md">
              {truncateMiddle(useSTXAddress())}
            </Button>
          )}
          <Button onClick={logout} colorScheme="pink" size="md">
            Disconnect Wallet
          </Button>
        </>
      ) : (
        <Button onClick={authenticate} colorScheme="pink" size="md">
          Connect Wallet
        </Button>
      )}
    </Flex>
  )
}
