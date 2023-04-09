import Head from 'next/head';
import NextLink from 'next/link';
import { Router, useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { AiOutlineReload } from 'react-icons/ai';
import { RiAddLine, RiPencilLine } from 'react-icons/ri';
import { RxComponent1 } from 'react-icons/rx';
import { PreloadedQuery, usePreloadedQuery } from 'react-relay';

import { processMaterialpassports } from '@/lib/dataHandling';
import { truncateMiddle } from '@/lib/utils';
import { Materialpassport, MaterialpassportFormData } from '@/types';
import {
    Box, Button, Checkbox, Flex, Heading, Icon, Link, SimpleGrid, Spinner, Table, Tbody, Td, Text,
    Th, Thead, Tr, useBreakpointValue, useDisclosure, useToast
} from '@chakra-ui/react';

import getAllMaterialpassportsQueryNode, {
    getAllMaterialpassportsQuery
} from '../../__generated__/relay/getAllMaterialpassportsQuery.graphql';
import { Pagination } from '../../components/Pagination';
import Components from './components';
import EditMaterialpassport from './edit';

export default function Main(props: { queryRef: PreloadedQuery<getAllMaterialpassportsQuery> }) {
  // console.log('Materialpassports main.tsx')
  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  })
  const toast = useToast()

  const [page, setPage] = useState(1)
  const router = useRouter()

  const [isFetching, setIsFetching] = useState(true)

  const { isOpen, onOpen, onClose } = useDisclosure()
  const { isOpen: isOpenComponents, onOpen: onOpenComponents, onClose: onCloseComponents } = useDisclosure()

  const [materialpassportEdit, setMaterialpassportEdit] = useState<MaterialpassportFormData>()
  const [materialpassportId, setMaterialpassportId] = useState('')

  const data = usePreloadedQuery(getAllMaterialpassportsQueryNode, props.queryRef)
  const { materialpassports, totalCountMP } = processMaterialpassports(data, page)

  // https://github.com/relayjs/relay-examples/tree/main/issue-tracker-next-v13

  useEffect(() => {
    setTimeout(() => {
      setIsFetching(false)
    }, 2000)
  }, [isFetching])

  const handlePrefetch = (materialpassportId: string) => {
    setMaterialpassportEdit(materialpassports.find((item) => item.id === materialpassportId))
    setMaterialpassportId(materialpassportId)
  }

  const handlePrefetchComponents = (materialpassportId: string) => {
    console.log('handlePrefetchComponents')
  }

  return (
    <>
      <Head>
        <title>Materialpassports | Circ</title>
      </Head>

      <SimpleGrid flex="1" gap="4" minChildWidth="320px" alignItems="flex-start">
        <Box minW="70vw" flex="1" borderRadius={8} bg="gray.800" p={['4', '4', '8']}>
          <Flex mb="8" justify="space-between" align="center">
            <Heading size="lg" fontWeight="normal">
              Materialpassports
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
                  router.push('/materialpassports')
                  setIsFetching(true)
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
            <Flex w="50vw" justify="center">
              <Spinner size="xl" />
            </Flex>
          ) : (
            /* error ? (
            <Flex justify="center">
              <Text>Failure to obtain user data.</Text>
            </Flex>
          ) : */
            <>
              <Table colorScheme="whiteAlpha" size={'sm'}>
                <Thead>
                  <Tr>
                    <Th>Name</Th>
                    <Th>Created</Th>
                    {isWideVersion && <Th>Completed</Th>}
                    {isWideVersion && <Th>Components</Th>}
                    <Th w="8"></Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {materialpassports?.map((materialpassport: Materialpassport) => (
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
                materialpassports={materialpassports}
                isOpen={isOpen}
                onClose={onClose}
              />
              <Components
                materialpassport={materialpassportEdit}
                materialpassportId={materialpassportId}
                isOpen={isOpenComponents}
                onClose={onCloseComponents}
              />
            </>
          )}
          <Pagination totalCountOfRegisters={totalCountMP} currentPage={page} onPageChange={setPage} />
        </Box>
      </SimpleGrid>
    </>
  )
}
