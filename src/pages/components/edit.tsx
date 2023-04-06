import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { graphql, useMutation } from 'react-relay';
import * as yup from 'yup';

import { truncateMiddle } from '@/lib/utils';
import { composeClient } from '@/relay/environment';
import {
    Box, Button, Divider, Flex, Heading, HStack, Modal, ModalBody, ModalCloseButton, ModalContent,
    ModalFooter, ModalHeader, ModalOverlay, Select, SimpleGrid, VStack
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';

import { Input } from '../../components/Form/Input';
import { api } from '../../services/api';
import { queryClient } from '../../services/queryClient';
import { Actor, ComponentFormData, FunctionalLayer, KeyValue, LCP } from '../../types';
import attributes from './attributes';

const editComponentMutation = graphql`
  mutation editComponentMutation(
    $id: ID!
    $mpID: CeramicStreamID!
    $name: String!
    $functionalLayer: ComponentFunctionalLayer!
    $actor: ComponentActor!
    $lifecyclephase: ComponentLcp!
    $attributes: String!
  ) {
    updateComponent(
      input: {
        id: $id
        content: {
          mpID: $mpID
          name: $name
          functionalLayer: $functionalLayer
          actor: $actor
          lifecyclephase: $lifecyclephase
          attributes: $attributes
        }
      }
    ) {
      document {
        id
      }
    }
  }
`

type EditUserProps = {
  component?: Pick<ComponentFormData, 'mpID' | 'name' | 'functionalLayer' | 'actor' | 'lifecyclephase' | 'attributes'>
  componentId: string
  isOpen: boolean
  onClose: () => void
}

const editUserFormSchema = yup.object().shape({
  name: yup.string().required('Name required'),
  functionalLayer: yup.string().required('Functional Layer required'),
  actor: yup.string().required('Actor required'),
  lifecyclephase: yup.string().required('Lifecyclephase required'),
  attributes: yup.array().of(
    yup.object().shape({
      key: yup.string().required('Attribute key required'),
      value: yup.string().required('Attribute value required'),
    })
  ),
})

const EditComponent = ({ component, componentId, isOpen, onClose }: EditUserProps) => {
  const initialRef = useRef(null)

  const { register, handleSubmit, formState, reset, setValue } = useForm<ComponentFormData>({
    resolver: yupResolver(editUserFormSchema),
  })

  const [attributes, setAttributes] = useState<KeyValue[]>([])

  useEffect(() => {
    if (component?.attributes) {
      setAttributes(component.attributes)
    }
  }, [])

  const onAddAttribute = () => {
    setAttributes([...attributes, { key: '', value: '' }])
  }

  const onRemoveAttribute = (index: number) => {
    setAttributes(attributes.filter((_, i) => i !== index))
  }

  const onAttributeChange = (index: number, keyOrValue: 'key' | 'value', value: string) => {
    setAttributes(attributes.map((attr, i) => (i === index ? { ...attr, [keyOrValue]: value } : attr)))
  }

  useEffect(() => {
    if (component) {
      setValue('mpID', component.mpID)
      setValue('name', component.name)
      setValue('functionalLayer', component.functionalLayer)
      setValue('actor', component.actor)
      setValue('lifecyclephase', component.lifecyclephase)
      //   setValue('attributes', component.attributes)
    }
  }, [component, setValue])

  const { errors } = formState

  const [commit, isInFlight] = useMutation(editComponentMutation)

  async function updateMaterialpassportName(existingId: string, newName: string | undefined) {
    console.log(existingId, newName)
    commit({
      variables: {
        id: existingId,
        mpID: 'mpID',
        name: 'name',
        functionalLayer: 'functionalLayer',
        actor: 'actor',
        lifecyclephase: 'lifecyclephase',
        attributes: 'attributes',
      },
      optimisticResponse: {
        updateMaterialpassport: {
          document: {
            id: existingId,
          },
        },
      },
    })
  }

  const handleEditComponent: SubmitHandler<ComponentFormData> = async (data) => {
    console.log(data)
    // updateMaterialpassportName(componentId, data.name)
    // onClose()
    // reset()
  }

  return (
    <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose} size={'xl'}>
      <ModalOverlay />
      <ModalContent borderRadius={8} bg="gray.800">
        <ModalHeader fontWeight="normal">Edit Component</ModalHeader>

        <ModalCloseButton />

        <Box as="form" onSubmit={handleSubmit(handleEditComponent)}>
          <ModalBody>
            <Divider mb={6} borderColor="gray.700" />

            <VStack spacing={['6', '8']} alignItems="flex-start">
              <SimpleGrid minChildWidth="240px" spacing={['6', '8']} w="100%" alignItems="flex-end">
                <Input label="Name" error={errors.name} {...register('name')} />
                <Select
                  {...register('functionalLayer')}
                  placeholder="Select Functional Layer"
                  variant="filled"
                  focusBorderColor="pink.500"
                  bgColor="gray.900"
                  _hover={{
                    bgColor: 'gray.900',
                  }}
                >
                  {Object.keys(FunctionalLayer).map((key) => (
                    <option key={key} value={FunctionalLayer[key as keyof typeof FunctionalLayer]}>
                      {FunctionalLayer[key as keyof typeof FunctionalLayer]}
                    </option>
                  ))}
                </Select>
                <Select
                  {...register('actor')}
                  placeholder="Select Actor"
                  variant="filled"
                  focusBorderColor="pink.500"
                  bgColor="gray.900"
                  _hover={{
                    bgColor: 'gray.900',
                  }}
                >
                  {Object.keys(Actor).map((key) => (
                    <option key={key} value={Actor[key as keyof typeof Actor]}>
                      {Actor[key as keyof typeof Actor]}
                    </option>
                  ))}
                </Select>
                <Select
                  {...register('lifecyclephase')}
                  placeholder="Select Lifecycle Phase"
                  variant="filled"
                  focusBorderColor="pink.500"
                  bgColor="gray.900"
                  _hover={{
                    bgColor: 'gray.900',
                  }}
                >
                  {Object.keys(LCP).map((key) => (
                    <option key={key} value={LCP[key as keyof typeof LCP]}>
                      {LCP[key as keyof typeof LCP]}
                    </option>
                  ))}
                </Select>
                <Input name="Created" label="Created" value={new Date().toISOString().slice(0, 10)} isDisabled={true} />
                <Input w="100%" name="Owner" label="Owner" value={truncateMiddle(composeClient.id?.toString())} isDisabled={true} />
              </SimpleGrid>

              <Divider my="6" borderColor="gray.700" />

              <SimpleGrid minChildWidth="240px" spacing={['6', '8']} w="100%" alignItems="flex-end">
                <Heading size="md" fontWeight="normal">
                  Attributes
                </Heading>
              </SimpleGrid>

               <SimpleGrid maxW="50vw" columns={3} spacing={['6', '8']} w="100%" alignItems="flex-end">
              {attributes.map((attr, i) => (
                <React.Fragment key={i}>
                  <Input
                    {...register(`attributes.${i}.key`)}
                    label={`Key ${i}`}
                    value={attr.key}
                    onChange={(e) => onAttributeChange(i, 'key', e.target.value)}
                    placeholder="Attribute key"
                  />
                  <Input
                    {...register(`attributes.${i}.value`)}
                    label={`Value ${i}`}
                    value={attr.value}
                    onChange={(e) => onAttributeChange(i, 'value', e.target.value)}
                    placeholder="Attribute value"
                  />
                  <Button w="75%" size="md" variant="outline" colorScheme="pink" onClick={() => onRemoveAttribute(i)}>
                    Remove
                  </Button>
                </React.Fragment>
              ))}
            </SimpleGrid>
            </VStack>

            <Flex mt={['6', '8']} justify="flex-end">
              <HStack spacing="4">
                <Button size="sm" colorScheme="pink" onClick={onAddAttribute}>
                Add Attribute
              </Button>
              </HStack>
            </Flex>
          </ModalBody>

          <ModalFooter pb={6}>
            <Button type="submit" size="sm" fontSize="sm" colorScheme="pink" _hover={{ cursor: 'pointer' }} isLoading={formState.isSubmitting}>
              Save
            </Button>

            <Link href="/components" passHref>
              <Button as="div" size="sm" fontSize="sm" ml="4" colorScheme="purple" _hover={{ cursor: 'pointer' }} onClick={onClose}>
                Cancel
              </Button>
            </Link>
          </ModalFooter>
        </Box>
      </ModalContent>
    </Modal>
  )
}

export default EditComponent
