import Link from 'next/link';
import { useRef } from 'react';

import {
    Button, Modal, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Table,
    Tbody, Td, Th, Thead, Tr
} from '@chakra-ui/react';

import { MaterialpassportFormData } from '../../types';

type EditUserProps = {
  materialpassport?: Pick<MaterialpassportFormData, 'name' | 'completed'>
  materialpassportId: string
  isOpen: boolean
  onClose: () => void
}

const Components = ({ isOpen, onClose }: EditUserProps) => {
  const initialRef = useRef(null)

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
              <Td>asdasda</Td>
              {/* {isWideVersion && (
                          <Td>
                            
                          </Td>
                        )} */}
              <Td>asdasda</Td>
            </Tr>
            {/* ))} */}
          </Tbody>
        </Table>

        <ModalFooter pb={6}>
          <Link href="/materialpassports" passHref>
            <Button as="div" size="sm" fontSize="sm" ml="4" colorScheme="purple" _hover={{ cursor: 'pointer' }} onClick={onClose}>
              Close
            </Button>
          </Link>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default Components
