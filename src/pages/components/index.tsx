import { NextPage } from 'next';
import Head from 'next/head';
import NextLink from 'next/link';
import { useState } from 'react';
import { AiOutlineReload } from 'react-icons/ai';
import { RiAddLine } from 'react-icons/ri';
import { RxComponent1 } from 'react-icons/rx';

import { truncateMiddle } from '@/lib/utils';
import { useAuth } from '@/services/hook/useAuth';
import { useStorage } from '@/services/hook/useStorage';
import { ComponentFormData } from '@/types';
import {
    Box, Button, Checkbox, Flex, Heading, Icon, Link, SimpleGrid, Spinner, Table, Tbody, Td, Text,
    Th, Thead, Tr, useBreakpointValue, useDisclosure
} from '@chakra-ui/react';

import Attributes from './attributes';

// When usePaginationFragment the structure could be done better
const Components: NextPage = () => {
  // (/*{ users, totalCount }*/) => {
  console.log('Component Components')

  const [page, setPage] = useState(1)
  const [reloadCount, setReloadCount] = useState(0)

  const { components, isFetching, error } = useStorage(page, reloadCount)
  console.log(components)

  const [componentEdit, setComponentEdit] = useState<ComponentFormData>()
  const [componentId, setComponentId] = useState('')

  const { isOpen, onOpen, onClose } = useDisclosure()
  const { isOpen: isOpenComponents, onOpen: onOpenComponents, onClose: onCloseComponents } = useDisclosure()

  const { userSession, setUserData, authenticate, userData } = useAuth()

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  })

  const handlePrefetch = (componentId: string) => {
    console.log('handlePrefetch')
    setComponentEdit(components.find((item) => item.id === componentId))
    setComponentId(componentId)
  }

  return (
    <>
      <Head>
        <title>Components | Circ</title>
      </Head>

      <SimpleGrid flex="1" gap="4" minChildWidth="320px" alignItems="flex-start">
        <Box flex="1" borderRadius={8} bg="gray.800" p={['4', '4', '8']}>
          <Flex mb="8" justify="space-between" align="center">
            <Heading size="lg" fontWeight="normal">
              Components
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
                    {isWideVersion && <Th>Attributes</Th>}
                    <Th w="8"></Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {components?.map((component) => (
                    <Tr key={component.id}>
                      <Td>
                        <Box>
                          <Link color="purple.400">
                            <Text fontWeight="bold">{component.name}</Text>
                          </Link>
                          <Text fontSize="sm" color="gray.300">
                            {truncateMiddle(component.author_id)}
                          </Text>
                        </Box>
                      </Td>
                      <Td>
                        {/* <Checkbox
                          size="lg"
                          colorScheme="purple"
                          iconColor="#D6BCFA"
                          isChecked={component.completed}
                          isDisabled={true}
                          isFocusable={false}
                        ></Checkbox> */}
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
                            onMouseEnter={() => handlePrefetch(component.id)}
                          >
                            {isWideVersion && `Attributes (${component?.properties?.length})`}
                          </Button>
                        </Td>
                      )}
                      <Td>
                        {/* <Button
                          size="sm"
                          fontSize="sm"
                          colorScheme="purple"
                          _hover={{ cursor: 'pointer' }}
                          leftIcon={<Icon as={RiPencilLine} fontSize="16" />}
                          onClick={onOpen}
                          onMouseEnter={() => handlePrefetch(component.id)}
                        >
                          {isWideVersion && 'Edit'}
                        </Button> */}
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>

              {/* <EditUser component={componentEdit} componentId={componentId} isOpen={isOpen} onClose={onClose} /> */}
              <Attributes attributes={componentEdit?.properties} isOpen={isOpenComponents} onClose={onCloseComponents} />

              {/* <Pagination totalCountOfRegisters={100} currentPage={page} onPageChange={setPage} /> */}
            </>
          )}
        </Box>
      </SimpleGrid>
    </>
  )
}

export default Components
