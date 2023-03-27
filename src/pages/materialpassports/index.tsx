import { NextPage } from 'next';
import Head from 'next/head';
import NextLink from 'next/link';
import { useEffect, useState } from 'react';
import { AiOutlineReload } from 'react-icons/ai';
import { RiAddLine, RiPencilLine } from 'react-icons/ri';
import { RxComponent1 } from 'react-icons/rx';

import { MPList } from '@/components/Composedb/MPList';
import { useAllMaterialpassports } from '@/services/hook/useAllMaterialpassports';
import { useAuth } from '@/services/hook/useAuth';
import {
    Box, Button, Checkbox, Flex, Heading, Icon, Link, Spinner, Table, Tbody, Td, Text, Th, Thead,
    Tr, useBreakpointValue, useDisclosure
} from '@chakra-ui/react';

import { Header } from '../../components/Header';
import { Pagination } from '../../components/Pagination';
import { Sidebar } from '../../components/Sidebar';
import { api } from '../../services/api';
import { useHasMounted } from '../../services/hook/useHasMounted';
import { useUsers } from '../../services/hook/useUsers';
import { queryClient } from '../../services/queryClient';
import { MaterialpassportFormData } from '../../types';
import Components from './components';
import EditUser from './edit';

// When usePaginationFragment the structure could be done better
const Materialpassports : NextPage = () => {
  // (/*{ users, totalCount }*/) => {
  console.log('Component Materialpassports')
  /* The useHasMounted function is typically used in Next.js applications to ensure that certain code,
  such as analytics or other client-side libraries, only runs after the component has mounted on the client side.
  This is because some code may not be compatible with server-side rendering,
  or may not be necessary until the component has been fully mounted. */
  const hasMounted = useHasMounted()

  const [page, setPage] = useState(1)

  const { data, isFetching, error } = useAllMaterialpassports(page)
  // console.log(data)

  const [materialpassportEdit, setMaterialpassportEdit] = useState<MaterialpassportFormData>()
  const [materialpassportId, setMaterialpassportId] = useState('')

  const { isOpen, onOpen, onClose } = useDisclosure()
  const { isOpen: isOpenComponents, onOpen: onOpenComponents, onClose: onCloseComponents } = useDisclosure();

  const { userSession, setUserData, authenticate, userData } = useAuth()
  
  console.log(userData)

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  })

  const handlePrefetchUser = (materialpassportId: string) => {
    // console.log('handlePrefetchUser')
    setMaterialpassportEdit(data.find(item => item.id === materialpassportId))
    setMaterialpassportId(materialpassportId)
  }

  const handlePrefetchComponents = (materialpassportId: string) => {
    console.log('handlePrefetchComponents')
    // await queryClient.prefetchQuery(
    //   ['users', userId],
    //   async () => {
    //     const response = await api.get(`users/${userId}`)

    //     return response.data
    //   },
    //   {
    //     staleTime: 1000 * 60 * 10, // 10 minutes
    //   }
    // )

    // const data = queryClient.getQueryData<UserQueryData>(['users', userId])

    // setUserEdit(data.user)
    // setUserId(userId)
  }

  return (
    <>
      <Head>
        <title>Materialpassports | Circ</title>
      </Head>

      <Box>
        {hasMounted && <Header />}

        <Flex w="100%" my="6" maxWidth={1480} mx="auto" px={['4', '4', '6']}>
          {hasMounted && <Sidebar />}

          <Box flex="1" borderRadius={8} bg="gray.800" p={['4', '4', '8']}>
            <Flex mb="8" justify="space-between" align="center">
              <Heading size="lg" fontWeight="normal">
                Materialpassports
                {isFetching && <Spinner size="sm" color="gray.500" ml="4" />}
              </Heading>

              <Flex>
                <Button
                  size="sm"
                  fontSize="sm"
                  mr="4"
                  colorScheme="purple"
                  _hover={{ cursor: 'pointer' }}
                  leftIcon={<Icon as={AiOutlineReload} fontSize="16" />}
                  // When usePaginationFragment this could be done better
                  onClick={() => {
                    if (page === 1) {
                      setPage(2)
                    } else {
                      setPage(1)
                    }
                  }}
                >
                  Update
                </Button>

                <NextLink href="/materialpassports/create" passHref>
                  <Button
                    as="a"
                    size="sm"
                    fontSize="sm"
                    colorScheme="pink"
                    _hover={{ cursor: 'pointer' }}
                    leftIcon={<Icon as={RiAddLine} fontSize="20" />}
                  >
                    Create New
                  </Button>
                </NextLink>
              </Flex>
            </Flex>

            {isFetching ? (
              <Flex justify="center">
                <Spinner />
              </Flex>
            ) : error ? (
              <Flex justify="center">
                <Text>Failure to obtain user data.</Text>
              </Flex>
            ) : (
              <>
                <Table colorScheme="whiteAlpha">
                  <Thead>
                    <Tr>
                      <Th>Name</Th>
                      <Th>Completed</Th>
                      {isWideVersion && <Th>Components</Th>}
                      <Th w="8"></Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {data?.map((materialpassport) => (
                      <Tr key={materialpassport.id}>
                        <Td>
                          <Box>
                            <Link color="purple.400">
                              <Text fontWeight="bold">{materialpassport.name}</Text>
                            </Link>
                            <Text fontSize="sm" color="gray.300">
                              {materialpassport.author_id}
                            </Text>
                          </Box>
                        </Td>
                        <Td>
                          <Checkbox
                            size="lg"
                            colorScheme="purple"
                            iconColor='#D6BCFA'
                            isChecked={materialpassport.completed}
                            isDisabled={true}
                            isFocusable={false}
                          ></Checkbox>
                        </Td>
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
                        <Td>
                          <Button
                            size="sm"
                            fontSize="sm"
                            colorScheme="purple"
                            _hover={{ cursor: 'pointer' }}
                            leftIcon={<Icon as={RiPencilLine} fontSize="16" />}
                            onClick={onOpen}
                            onMouseEnter={() => handlePrefetchUser(materialpassport.id)}
                          >
                            {isWideVersion && 'Edit'}
                          </Button>
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>

                <EditUser materialpassport={materialpassportEdit} materialpassportId={materialpassportId} isOpen={isOpen} onClose={onClose} />
                <Components materialpassport={materialpassportEdit} materialpassportId={materialpassportId} isOpen={isOpenComponents} onClose={onCloseComponents} />


                <Pagination totalCountOfRegisters={100} currentPage={page} onPageChange={setPage} />
              </>
            )}
          </Box>
        </Flex>
      </Box>
    </>
  )
}

export default Materialpassports

