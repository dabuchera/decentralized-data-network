import Link from 'next/link';
import { useRef } from 'react';
import { RiPencilLine } from 'react-icons/ri';
import { RxComponent1 } from 'react-icons/rx';
import { graphql, useMutation } from 'react-relay';

import {
    Box, Button, Checkbox, Divider, Icon, Modal, ModalBody, ModalCloseButton, ModalContent,
    ModalFooter, ModalHeader, ModalOverlay, Table, Tbody, Td, Th, Thead, Tr, VStack
} from '@chakra-ui/react';

import { Input } from '../../components/Form/Input';
import { api } from '../../services/api';
import { queryClient } from '../../services/queryClient';
import { MaterialpassportFormData } from '../../types';

// const MaterialpassportFragment = graphql`
//   fragment useAllMaterialpassports_materialpassport on Materialpassport {
//     id
//     author {
//       id
//     }
//     name
//     completed
//     version
//   }
// `

// const useAllMaterialpassportsPaginatorQuery = graphql`
//   query useAllMaterialpassportsPaginatorQuery($first: Int!, $after: String) {
//     materialpassportIndex(first: $first, after: $after) @connection(key: "useMaterialpassports_materialpassportIndex") {
//       pageInfo {
//         endCursor
//         hasNextPage
//       }
//       edges {
//         node {
//           id
//           author {
//             id
//           }
//           name
//           completed
//           version
//           ...useAllMaterialpassports_materialpassport
//         }
//       }
//     }
//   }
// `
  
  type EditUserProps = {
    materialpassport?: Pick<MaterialpassportFormData, 'name' | 'completed'>
    materialpassportId: string
    isOpen: boolean
    onClose: () => void
  }
  
  
  
  const Components = ({ materialpassport, materialpassportId, isOpen, onClose }: EditUserProps) => {
    const initialRef = useRef(null)
    
    // const [commit, isInFlight] = useMutation(editUpdateMaterialpassportMutation)
  
    // async function updateMaterialpassportName(existingId: string, newName: string | undefined) {
    //   console.log(existingId, newName)
    //   commit({
    //     variables: {
    //       id: existingId,
    //       name: newName,
    //     },
    //     optimisticResponse: {
    //       updateMaterialpassport: {
    //         document: {
    //           id: existingId,
    //           name: newName,
    //           completed: 'temp-completed',
    //           author: {
    //             id: 'temp-author-id', // Temporary author ID, replace it with an actual value if available
    //           },
    //           version: 'temp-version', // Temporary version, replace it with an actual value if available
    //         },
    //       },
    //     },
    //   })
    // }
  
    // const handleCreateUser: SubmitHandler<MaterialpassportFormData> = async (data) => {
    //   console.log(data)
    //   updateMaterialpassportName(materialpassportId, data.name)
    //   onClose()
    //   reset()
    // }
  
    return (
      <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose} size={'xl'}>
        <ModalOverlay />
        <ModalContent borderRadius={8} bg="gray.800">
          <ModalHeader fontWeight="normal">Components</ModalHeader>
  
          <ModalCloseButton />
  
          <Table colorScheme="whiteAlpha">
                  <Thead>
                    <Tr>
                      <Th>Name</Th>
                      <Th>Completed</Th>
                      {/* {isWideVersion && <Th>Components</Th>} */}
                      {/* <Th w="8"></Th> */}
                    </Tr>
                  </Thead>
                  <Tbody>
                    {/* {data?.map((materialpassport) => ( */}
                    <Tr>
                      {/* <Tr key={materialpassport.id}> */}
                        {/* <Td>
                          <Box>
                            <Link color="purple.400">
                              <Text fontWeight="bold">{materialpassport.name}</Text>
                            </Link>
                            <Text fontSize="sm" color="gray.300">
                            </Text>
                          </Box>
                        </Td> */}
                        <Td>
                        asdasda
                        </Td>
                        {/* {isWideVersion && (
                          <Td>
                            
                          </Td>
                        )} */}
                        <Td>
                        asdasda
                        </Td>
                      </Tr>
                    {/* ))} */}
                  </Tbody>
                </Table>
  
            <ModalFooter pb={6}>  
              <Link href="/materialpassports" passHref>
                <Button as="a" size="sm" fontSize="sm" ml="4" colorScheme="purple" _hover={{ cursor: 'pointer' }} onClick={onClose}>
                  Thanks
                </Button>
              </Link>
            </ModalFooter>
        </ModalContent>
      </Modal>
    )
  }
  
  export default Components
  