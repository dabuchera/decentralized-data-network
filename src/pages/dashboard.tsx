import { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { AiOutlineReload } from 'react-icons/ai';
import { RiAddLine, RiPencilLine } from 'react-icons/ri';
import { RxComponent1 } from 'react-icons/rx';

import { truncateMiddle } from '@/lib/utils';
import { Materialpassport } from '@/types';
import {
    Box, Button, Checkbox, Flex, Heading, Icon, Link, SimpleGrid, Spinner, Switch, Table, Tbody, Td,
    Text, Th, Thead, theme, Tr, useBreakpointValue, useToast
} from '@chakra-ui/react';

import Components from './components';

const Dashboard: NextPage = () => {
  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  })
  const toast = useToast()
  const router = useRouter()

  const [isChecked, setIsChecked] = useState(false)
  const [isFetching, setIsFetching] = useState(false/* true */)

  const handleToggle = () => {
    setIsChecked(!isChecked)
  }

  return (
    <>
      <Head>
        <title>Dashboard | Circ</title>
      </Head>
      <SimpleGrid flex="1" gap="4" minChildWidth="320px" alignItems="flex-start">
        <Box minW="70vw" flex="1" borderRadius={8} bg="gray.800" p={['4', '4', '8']}>
          <Flex mb="8" justify="space-between" align="center">
            <Heading size="lg" fontWeight="normal">
              {!isChecked ? 'To Be Defined' : 'To Be Defined 2'}
            </Heading>
            <Flex>
              <Button
                size="sm"
                fontSize="sm"
                mr="4"
                colorScheme="purple"
                _hover={{ cursor: 'pointer' }}
                leftIcon={<Icon as={AiOutlineReload} fontSize="16" />}
                onClick={() => {
                  router.push('/dashboard')
                  setIsFetching(true)
                }}
              >
                Update
              </Button>
              <Switch ml='4' size="lg" colorScheme="pink" isChecked={isChecked} onChange={handleToggle} />
            </Flex>
          </Flex>

          {isFetching ? (
            <Flex w="50vw" justify="center">
              <Spinner size="xl" />
            </Flex>
          ) : (
            <>
              <Table colorScheme="whiteAlpha" size={'sm'}>
                <Thead>
                  <Tr>
                    <Th>Name</Th>
                    <Th>Created</Th>
                    {isWideVersion && <Th>Owner</Th>}
                    {isWideVersion && <Th>Completed</Th>}
                    {isWideVersion && <Th>Components</Th>}
                  </Tr>
                </Thead>
                <Tbody>
                  {/* {materialpassports?.map((materialpassport: Materialpassport) => (
                    <Tr key={materialpassport.id}>
                      <Td>
                        <Box>
                          <Link color="purple.400">
                            <Text fontWeight="bold">{materialpassport.name}</Text>
                          </Link>
                          <Text fontSize="sm" color="gray.300">
                            {truncateMiddle(materialpassport.author_id)}
                          </Text>
                        </Box>
                      </Td>
                      <Td>
                        <Box>
                          <Text fontSize="sm" color="gray.300">
                            {materialpassport.created}
                          </Text>
                        </Box>
                      </Td>
                      {isWideVersion && (
                        <Td>
                          <Checkbox
                            size="lg"
                            iconColor="#D6BCFA"
                            isChecked={materialpassport.completed}
                            isDisabled={true}
                            isFocusable={false}
                          ></Checkbox>
                        </Td>
                      )}
                      {isWideVersion && (
                        <Td>
                          <Button
                            size="sm"
                            fontSize="sm"
                            colorScheme="purple"
                            _hover={{ cursor: 'pointer' }}
                            leftIcon={<Icon as={RxComponent1} fontSize="16" />}
                            onClick={onOpenComponents}
                            onMouseEnter={() => handlePrefetchComponents(materialpassport.id)}
                          >
                            {isWideVersion && 'Components'}
                          </Button>
                        </Td>
                      )}
                    </Tr>
                  ))} */}
                </Tbody>
              </Table>

              {/* <Components
                materialpassport={materialpassportEdit}
                materialpassportId={materialpassportId}
                isOpen={isOpenComponents}
                onClose={onCloseComponents}
              /> */}
            </>
          )}

          {/* <Pagination totalCountOfRegisters={totalCountMP} currentPage={page} onPageChange={setPage} /> */}
        </Box>
      </SimpleGrid>
    </>
  )
}

export default Dashboard
