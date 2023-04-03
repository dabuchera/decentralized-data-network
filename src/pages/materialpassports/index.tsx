import { NextPage } from 'next';
import Head from 'next/head';
import NextLink from 'next/link';
import { useState } from 'react';
import { AiOutlineReload } from 'react-icons/ai';
import { RiAddLine, RiPencilLine } from 'react-icons/ri';
import { RxComponent1 } from 'react-icons/rx';

import { truncateMiddle } from '@/lib/utils';
import { useAuth } from '@/services/hook/useAuth';
import { useStorage } from '@/services/hook/useStorage';
import { MaterialpassportFormData } from '@/types';
import {
    Box, Button, Checkbox, Flex, Heading, Icon, Link, SimpleGrid, Spinner, Table, Tbody, Td, Text,
    Th, Thead, Tr, useBreakpointValue, useDisclosure
} from '@chakra-ui/react';

import { Pagination } from '../../components/Pagination';
import Components from './components';
import EditMaterialpassport from './edit';

const Materialpassports: NextPage = () => {
  const [page, setPage] = useState(1)
  const [reloadCount, setReloadCount] = useState(0)

  const { materialpassports, isFetching, error } = useStorage(page, reloadCount)

  console.log(materialpassports)

  const [materialpassportEdit, setMaterialpassportEdit] = useState<MaterialpassportFormData>()
  const [materialpassportId, setMaterialpassportId] = useState('')

  const { isOpen, onOpen, onClose } = useDisclosure()
  const { isOpen: isOpenComponents, onOpen: onOpenComponents, onClose: onCloseComponents } = useDisclosure()

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  })

  const handlePrefetch = (materialpassportId: string) => {
    // console.log('handlePrefetchUser')
    setMaterialpassportEdit(materialpassports.find((item) => item.id === materialpassportId))
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

      <SimpleGrid flex="1" gap="4" w="75vw" minChildWidth="320px" alignItems="flex-start">
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
                  setReloadCount(reloadCount + 1)
                }}
              >
                Update
              </Button>

              <NextLink href="/materialpassports/create" passHref>
                <Button
                  as="div"
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
                    <Th>Created</Th>
                    <Th>Completed</Th>
                    {isWideVersion && <Th>Components</Th>}
                    <Th w="8"></Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {materialpassports?.map((materialpassport) => (
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
                      <Td>
                        <Checkbox
                          size="lg"
                          iconColor="#D6BCFA"
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
                          onMouseEnter={() => handlePrefetch(materialpassport.id)}
                        >
                          {isWideVersion && 'Edit'}
                        </Button>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>

              <EditMaterialpassport
                materialpassport={materialpassportEdit}
                materialpassportId={materialpassportId}
                isOpen={isOpen}
                onClose={onClose}
              />
              <Components
                materialpassport={materialpassportEdit}
                materialpassportId={materialpassportId}
                isOpen={isOpenComponents}
                onClose={onCloseComponents}
              />

              <Pagination totalCountOfRegisters={100} currentPage={page} onPageChange={setPage} />
            </>
          )}
        </Box>
      </SimpleGrid>
    </>
  )
}

export default Materialpassports
