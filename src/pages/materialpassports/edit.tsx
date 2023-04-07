import Link from 'next/link';
import { useRouter } from 'next/router';
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { graphql, useMutation } from 'react-relay';
import * as yup from 'yup';

import {
    Box, Button, Checkbox, Divider, Flex, Modal, ModalBody, ModalCloseButton, ModalContent,
    ModalFooter, ModalHeader, ModalOverlay, Spinner, Stack, useToast, VStack
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';

import { Input } from '../../components/Form/Input';
import { Materialpassport, MaterialpassportFormData } from '../../types';

const editMaterialpassportMutation = graphql`
  mutation editMaterialpassportMutation($id: ID!, $name: String!, $completed: Boolean!) {
    updateMaterialpassport(input: { id: $id, content: { name: $name, completed: $completed } }) {
      document {
        id
        name
        completed
      }
    }
  }
`

type EditUserProps = {
  // materialpassport is loaded only after hover over Edit button
  materialpassport?: Pick<MaterialpassportFormData, 'name' | 'completed'>
  materialpassportId: string
  materialpassports: Materialpassport[]
  // setMaterialpassports: Dispatch<SetStateAction<Materialpassport[]>>
  isOpen: boolean
  onClose: () => void
}

const editUserFormSchema = yup.object().shape({
  name: yup.string().required('Name required'),
  completed: yup.boolean().required('Completed required'),
})

const EditMaterialpassport = ({ materialpassport, materialpassportId, materialpassports, isOpen, onClose }: EditUserProps) => {
  const initialRef = useRef(null)
  const toast = useToast()

  const { register, handleSubmit, formState, reset, setValue } = useForm<MaterialpassportFormData>({
    resolver: yupResolver(editUserFormSchema),
  })

  useEffect(() => {
    if (materialpassport) {
      setValue('name', materialpassport.name)
      setValue('completed', materialpassport.completed)
    }
  }, [materialpassport, setValue])

  const { errors } = formState

  const [commit, isInFlight] = useMutation(editMaterialpassportMutation)

  async function updateMaterialpassport(data: MaterialpassportFormData) {
    commit({
      variables: {
        id: materialpassportId,
        name: data.name,
        completed: data.completed,
      },
      optimisticResponse: {
        updateMaterialpassport: {
          document: {
            id: materialpassportId,
            name: data.name,
            completed: data.completed,
          },
        },
      },
      onCompleted: (data, errors) => {
        console.log('*********************** updateMaterialpassport ***********************')
        console.log(data)
        console.log(errors)

        if (data) {
          // Has to be defined in the query above
          // @ts-ignore
          const res = data.updateMaterialpassport.document
          materialpassports = materialpassports.map((materialpassport) => {
              if (materialpassport.id === materialpassportId) {
                // Has to be defined in the query above
                return { ...materialpassport, name: res.name, completed: res.completed }
              }
              return materialpassport
            })

          onClose()
          reset()
        } else {
          if (errors?.[0].message.includes('Can not verify')) {
            toast({
              title: 'No Access',
              description: 'That is not your dataset',
              status: 'error',
              duration: 10000,
              isClosable: true,
            })
          }
        }
      },
    })
  }

  const handleEditMaterialpassport: SubmitHandler<MaterialpassportFormData> = async (data) => {
    // console.log(data)
    updateMaterialpassport(data)
  }

  return (
    <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose} size={'xl'}>
      <ModalOverlay />
      <ModalContent borderRadius={8} bg="gray.800">
        <ModalHeader fontWeight="normal">Edit Materialpassport</ModalHeader>

        <ModalCloseButton />

        <Box as="form" onSubmit={handleSubmit(handleEditMaterialpassport)}>
          <ModalBody>
            <Divider mb={6} borderColor="gray.700" />

            {isInFlight ? (
              <Flex justify="center">
                <Spinner size="xl" />
              </Flex>
            ) : (
              <VStack>
                <Input label="Name" mb={2} error={errors.name} {...register('name')} />
                <Stack spacing={5} direction="row" alignItems="">
                  <Checkbox colorScheme="green" {...register('completed')}>
                    Completed
                  </Checkbox>
                </Stack>
              </VStack>
            )}
          </ModalBody>

          <ModalFooter pb={6}>
            <Button type="submit" size="sm" fontSize="sm" colorScheme="pink" _hover={{ cursor: 'pointer' }} isLoading={formState.isSubmitting}>
              Save
            </Button>

            <Link href="/materialpassports" passHref>
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

export default EditMaterialpassport
