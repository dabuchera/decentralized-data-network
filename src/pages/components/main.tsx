import { NextPage } from 'next';
import Head from 'next/head';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { AiOutlineReload } from 'react-icons/ai';
import { RiAddLine, RiPencilLine } from 'react-icons/ri';
import { RxComponent1 } from 'react-icons/rx';
import { PreloadedQuery, usePreloadedQuery } from 'react-relay';

import { Pagination } from '@/components/Pagination';
import { processComponents } from '@/lib/dataHandling';
import { truncateMiddle } from '@/lib/utils';
import { ComponentFormData } from '@/types';
import {
    Box, Button, Flex, Heading, Icon, Link, SimpleGrid, Spinner, Table, Tbody, Td, Text, Th, Thead,
    Tr, useBreakpointValue, useDisclosure, useToast
} from '@chakra-ui/react';

import getAllComponentsQueryNode, {
    getAllComponentsQuery
} from '../../__generated__/relay/getAllComponentsQuery.graphql';
import Attributes from './attributes';
import EditComponent from './edit';

export default function Main(props: { queryRef: PreloadedQuery<getAllComponentsQuery> }) {
  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  })
  const toast = useToast()

  const [page, setPage] = useState(1)
  const router = useRouter()

  const [isFetching, setIsFetching] = useState(true)

  const { isOpen, onOpen, onClose } = useDisclosure()
  const { isOpen: isOpenComponents, onOpen: onOpenAttributes, onClose: onCloseAttributes } = useDisclosure()

  const [componentEdit, setComponentEdit] = useState<ComponentFormData>()
  const [componentId, setComponentId] = useState('')

  const data = usePreloadedQuery(getAllComponentsQueryNode, props.queryRef)
  const { components, totalCountCP } = processComponents(data, page)

  useEffect(() => {
    setTimeout(() => {
      setIsFetching(false)
    }, 2000)
  }, [isFetching])

  const handlePrefetch = (componentId: string) => {
    setComponentEdit(components.find((item) => item.id === componentId))
    setComponentId(componentId)
  }

  return (
    <>
      <Head>
        <title>Components | Circ</title>
      </Head>

      <SimpleGrid flex="1" gap="4" minChildWidth="320px" alignItems="flex-start">
        <Box minW="70vw" flex="1" borderRadius={8} bg="gray.800" p={['4', '4', '8']}>
          <Flex mb="8" justify="space-between" align="center">
            <Heading size="lg" fontWeight="normal">
              Components
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
                  router.push('/components')
                }}
              >
                Update
              </Button>

              <NextLink href="/components/create" passHref>
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
            /*  error ? (
            <Flex justify="center">
              <Text>Failure to obtain user data.</Text>
            </Flex>
          ) :  */
            <>
              <Table colorScheme="whiteAlpha" size={'sm'}>
                <Thead>
                  <Tr>
                    <Th>Name</Th>
                    <Th>Created</Th>
                    <Th>MP ID</Th>
                    {isWideVersion && (
                      <Th>
                        <Link color="purple.400">
                          <Text fontWeight="bold">TO BE DEFINED</Text>
                        </Link>
                      </Th>
                    )}
                    <Th>Attributes</Th>
                    <Th w="8"></Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {components?.map((component) => (
                    <Tr key={component.id}>
                      <Td>
                        <Link color="purple.400">
                          <Text fontWeight="bold">{component.name}</Text>
                        </Link>
                        <Box>
                          <Text fontSize="sm" color="gray.300">
                            {truncateMiddle(component.author_id)}
                          </Text>
                        </Box>
                      </Td>
                      <Td>
                        <Box>
                          <Text fontSize="sm" color="gray.300">
                            {component.created}
                          </Text>
                        </Box>
                      </Td>
                      <Td>
                        <Box>
                          <Text fontSize="sm" color="gray.300">
                            {truncateMiddle(component.mpID)}
                          </Text>
                        </Box>
                      </Td>
                      {isWideVersion && (
                        <Td>
                          <Flex justifyContent={'flex-start'}>
                            <Box>
                              <Text fontWeight="bold" color="gray.300" mr="2" mb="2">
                                FUNCTIONAL LAYER:{' '}
                              </Text>
                            </Box>
                            <Box>
                              <Text fontSize="sm" color="gray.300">
                                {component.functionalLayer}
                              </Text>
                            </Box>
                          </Flex>
                          <Flex justifyContent={'flex-start'}>
                            <Box>
                              <Text fontWeight="bold" color="gray.300" mr="2" mb="2">
                                ACTOR:{' '}
                              </Text>
                            </Box>
                            <Box>
                              <Text fontSize="sm" color="gray.300">
                                {component.actor}
                              </Text>
                            </Box>
                          </Flex>
                          <Flex justifyContent={'flex-start'}>
                            <Box>
                              <Text fontWeight="bold" color="gray.300" mr="2">
                                LIFECYCLE PHASE:{' '}
                              </Text>
                            </Box>
                            <Box>
                              <Text fontSize="sm" color="gray.300">
                                {component.lifecyclephase}
                              </Text>
                            </Box>
                          </Flex>
                        </Td>
                      )}
                      <Td>
                        <Button
                          size="sm"
                          fontSize="sm"
                          colorScheme="purple"
                          _hover={{ cursor: 'pointer' }}
                          leftIcon={<Icon as={RxComponent1} fontSize="16" />}
                          onClick={onOpenAttributes}
                          onMouseEnter={() => handlePrefetch(component.id)}
                        >
                          {isWideVersion && `Attributes (${component?.attributes?.length})`}
                        </Button>
                      </Td>

                      <Td>
                        <Button
                          size="sm"
                          fontSize="sm"
                          colorScheme="purple"
                          _hover={{ cursor: 'pointer' }}
                          leftIcon={<Icon as={RiPencilLine} fontSize="16" />}
                          onClick={onOpen}
                          onMouseEnter={() => handlePrefetch(component.id)}
                        >
                          {isWideVersion && 'Edit'}
                        </Button>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>

              <EditComponent component={componentEdit} componentId={componentId} components={components} isOpen={isOpen} onClose={onClose} />

              <Attributes attributes={componentEdit?.attributes} isOpen={isOpenComponents} onClose={onCloseAttributes} />
            </>
          )}
          <Pagination totalCountOfRegisters={totalCountCP} currentPage={page} onPageChange={setPage} />
        </Box>
      </SimpleGrid>
    </>
  )
}
