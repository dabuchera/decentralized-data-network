import Link from 'next/link';
import { useRef } from 'react';

import { ComponentFormData } from '@/types';
import {
    Button, Modal, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Table,
    Tbody, Td, Th, Thead, Tr
} from '@chakra-ui/react';

type EditComponentProps = {
  attributes?: ComponentFormData['properties']
  isOpen: boolean
  onClose: () => void
}

const Attributes = ({ attributes, isOpen, onClose }: EditComponentProps) => {
  const initialRef = useRef(null)

  return (
    <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose} size={'xl'}>
      <ModalOverlay />
      <ModalContent borderRadius={8} bg="gray.800">
        <ModalHeader fontWeight="normal">Attributes</ModalHeader>

        <ModalCloseButton />

        <Table colorScheme="whiteAlpha">
          <Thead>
            <Tr>
              <Th>Key</Th>
              <Th>Value</Th>
            </Tr>
          </Thead>
          <Tbody>
          {attributes?.map((pair, index) => (
          <Tr key={index}>
            <Td>{pair.key}</Td>
            <Td>{pair.value}</Td>
          </Tr>
        ))}
          </Tbody>
        </Table>

        <ModalFooter pb={6}>
          <Link href="/components" passHref>
            <Button as="div" size="sm" fontSize="sm" ml="4" colorScheme="purple" _hover={{ cursor: 'pointer' }} onClick={onClose}>
              Close
            </Button>
          </Link>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default Attributes
