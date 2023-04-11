import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';

import { KeyValue } from '@/types';
import {
    Button, Divider, Heading, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter,
    ModalHeader, ModalOverlay, SimpleGrid, VStack
} from '@chakra-ui/react';

import { Input } from '../../components/Form/Input';

type EditComponentProps = {
  attributes: KeyValue[] | undefined
  isOpen: boolean
  onClose: () => void
}

const Attributes = ({ attributes, isOpen, onClose }: EditComponentProps) => {
  const initialRef = useRef(null)

  const [localAttributes, setlocalAttributes] = useState<KeyValue[]>([])

  useEffect(() => {
    if (attributes) {
      setlocalAttributes(attributes)
    }
  }, [attributes])

  // console.log(attributes)

  return (
    <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose} size={'xl'}>
      <ModalOverlay />
      <ModalContent borderRadius={8} bg="gray.800">
        <ModalHeader fontWeight="normal">Attributes</ModalHeader>

        <ModalCloseButton />

        <ModalBody>
          <Divider mb={6} borderColor="gray.700" />

          <VStack spacing={['6', '8']} alignItems="flex-start">
            <SimpleGrid maxW="50vw" columns={2} spacing={['6', '8']} w="100%" alignItems="flex-end">
              {localAttributes.map((attr, i) => (
                <React.Fragment key={i}>
                  <Input isDisabled={true} name={`Key ${i}`} label={`Key ${i}`} value={attr.key} placeholder="Attribute key" />
                  <Input isDisabled={true} name={`Value ${i}`} label={`Value ${i}`} value={attr.value} placeholder="Attribute value" />
                </React.Fragment>
              ))}
            </SimpleGrid>
          </VStack>
        </ModalBody>

        <ModalFooter pb={6}>
          <Link href="/dashboard" passHref>
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
