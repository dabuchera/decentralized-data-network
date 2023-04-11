import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { AiOutlineReload } from 'react-icons/ai';
import { RiAddLine, RiPencilLine } from 'react-icons/ri';
import { RxComponent1 } from 'react-icons/rx';
import { PreloadedQuery, usePreloadedQuery } from 'react-relay';

import { Pagination } from '@/components/Pagination';
import {
    processComponents, processMaterialpassports, processMaterialpassportsForComponents
} from '@/lib/dataHandling';
import { truncateMiddle } from '@/lib/utils';
import { useAppContext } from '@/services/providers/AppStateProvider';
import { ComponentFormData, Materialpassport, MaterialpassportFormData } from '@/types';
import {
    Box, Button, Checkbox, Flex, Heading, Icon, Link, SimpleGrid, Spinner, Switch, Table, Tbody, Td,
    Text, Th, Thead, Tr, useBreakpointValue, useDisclosure, useToast
} from '@chakra-ui/react';

import getAllComponentsQueryNode, {
    getAllComponentsQuery
} from '../../__generated__/relay/getAllComponentsQuery.graphql';
import getAllMaterialpassportsQueryNode, {
    getAllMaterialpassportsQuery
} from '../../__generated__/relay/getAllMaterialpassportsQuery.graphql';
import Components from '../components';
import Attributes from './attributes';
import ComponentsModal from './components';

export default function Main(props: {
  queryRefComponents: PreloadedQuery<getAllComponentsQuery>
  queryRefMaterialpassports: PreloadedQuery<getAllMaterialpassportsQuery>
}) {
  const [pageMaterialpassports, setPageMaterialpassports] = useState(1)
  const [pageComponents, setPageComponents] = useState(1)

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  })
  const toast = useToast()
  const router = useRouter()

  const { setAppstate, appState } = useAppContext()

  const [isChecked, setIsChecked] = useState(false)
  const [isFetching, setIsFetching] = useState(true)

  const handleToggle = () => {
    setIsChecked(!isChecked)
  }

  const { isOpen: isOpenAttributes, onOpen: onOpenAttributes, onClose: onCloseAttributes } = useDisclosure()
  const { isOpen: isOpenComponents, onOpen: onOpenComponents, onClose: onCloseComponents } = useDisclosure()

  const [componentEdit, setComponentEdit] = useState<ComponentFormData>()
  const [componentId, setComponentId] = useState('')

  const [materialpassportEdit, setMaterialpassportEdit] = useState<MaterialpassportFormData>()
  const [materialpassportId, setMaterialpassportId] = useState('')

  const dataComponents = usePreloadedQuery(getAllComponentsQueryNode, props.queryRefComponents)
  const dataMaterialpassport = usePreloadedQuery(getAllMaterialpassportsQueryNode, props.queryRefMaterialpassports)

  const { components, totalCountCP } = processComponents(dataComponents, pageComponents)
  const { materialpassports, totalCountMP } = processMaterialpassports(dataMaterialpassport, pageMaterialpassports)

  useEffect(() => {
    setTimeout(() => {
      setIsFetching(false)
      console.log(materialpassports)
      setAppstate((prevState) => ({
        ...prevState,
        materialpassports: materialpassports,
      }))
    }, 2000)
  }, [isFetching])

  const handlePrefetchComponent = (componentId: string) => {
    setComponentEdit(components.find((item) => item.id === componentId))
    setComponentId(componentId)
  }

  const handlePrefetchMaterialpassport = (materialpassportId: string) => {
    setMaterialpassportEdit(materialpassports.find((item) => item.id === materialpassportId))
    setMaterialpassportId(materialpassportId)
  }

  return (
    <>
      <Head>
        <title>Dashboard | Circ</title>
      </Head>

      <SimpleGrid flex="1" gap="4" minChildWidth="320px" alignItems="flex-start">
        <Box minW="70vw" flex="1" borderRadius={8} bg="gray.800" p={['4', '4', '8']}>
          <Flex mb="8" justify="space-between" align="center">
            
            <Switch ml="4" size="lg" colorScheme="pink" isChecked={isChecked} onChange={handleToggle} />

            <Heading size="lg" fontWeight="normal">
              {!isChecked ? 'Materialpassports' : 'Components'}
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
            </Flex>
          </Flex>

          {isFetching ? (
            <Flex w="50vw" justify="center">
              <Spinner size="xl" />
            </Flex>
          ) : (
            <>
              {!isChecked ? (
                // ******************** Materialpassports ********************
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
                                onMouseEnter={() => handlePrefetchMaterialpassport(materialpassport.id)}
                              >
                                {isWideVersion && 'Components'}
                              </Button>
                            </Td>
                          )}
                        </Tr>
                      ))}
                    </Tbody>
                  </Table>

                  <ComponentsModal
                    materialpassport={materialpassportEdit}
                    materialpassportId={materialpassportId}
                    isOpen={isOpenComponents}
                    onClose={onCloseComponents}
                  />
                  <Pagination totalCountOfRegisters={totalCountMP} currentPage={pageMaterialpassports} onPageChange={setPageMaterialpassports} />
                </>
              ) : (
                // ******************** Components ********************
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
                              onMouseEnter={() => handlePrefetchComponent(component.id)}
                              isDisabled={component?.attributes?.length === 0}
                            >
                              {isWideVersion && `Attributes (${component?.attributes?.length})`}
                            </Button>
                          </Td>
                        </Tr>
                      ))}
                    </Tbody>
                  </Table>

                  <Attributes attributes={componentEdit?.attributes} isOpen={isOpenAttributes} onClose={onCloseAttributes} />
                  <Pagination totalCountOfRegisters={totalCountCP} currentPage={pageComponents} onPageChange={setPageComponents} />
                </>
              )}
            </>
          )}
        </Box>
      </SimpleGrid>
    </>
  )
}
