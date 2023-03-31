import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { graphql, useMutation } from 'react-relay';
import * as yup from 'yup';

import {
    Box, Button, Checkbox, Divider, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter,
    ModalHeader, ModalOverlay, Stack, VStack
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';

import { Input } from '../../components/Form/Input';
import { MaterialpassportFormData } from '../../types';

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
  isOpen: boolean
  onClose: () => void
}

const editUserFormSchema = yup.object().shape({
  name: yup.string().required('Name required'),
  completed: yup.boolean().required('Completed required'),
})

const EditMaterialpassport = ({ materialpassport, materialpassportId, isOpen, onClose }: EditUserProps) => {
  const initialRef = useRef(null)

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

  async function updateMaterialpassport(existingId: string, newName: string, newCompleted: boolean) {
    console.log(existingId, newName)
    commit({
      variables: {
        id: existingId,
        name: newName,
        completed: newCompleted,
      },
      optimisticResponse: {
        updateMaterialpassport: {
          document: {
            id: existingId,
            name: newName,
            completed: newCompleted,
          },
        },
      },
      onCompleted: (data, errors) => {
        console.log('*********************** updateMaterialpassportName ***********************')
        console.log(data)
        console.log(errors)
      },
    })
  }

  const handleCreateUser: SubmitHandler<MaterialpassportFormData> = async (data) => {
    // console.log(data)
    updateMaterialpassport(materialpassportId, data.name, data.completed)
    onClose()
    reset()
  }

  return (
    <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose} size={'xl'}>
      <ModalOverlay />
      <ModalContent borderRadius={8} bg="gray.800">
        <ModalHeader fontWeight="normal">Edit Materialpassport Data</ModalHeader>

        <ModalCloseButton />

        <Box as="form" onSubmit={handleSubmit(handleCreateUser)}>
          <ModalBody>
            <Divider mb={6} borderColor="gray.700" />

            <VStack>
              <Input label="Name" mb={2} error={errors.name} {...register('name')} />
              <Stack spacing={5} direction="row" alignItems="">
                <Checkbox colorScheme="green" {...register('completed')}>
                  Completed
                </Checkbox>
              </Stack>
              {/* <Input
                type="password"
                label="Senha"
                mb={2}
                error={errors.password}
                {...register('password')}
              />
              <Input
                type="password"
                label="Confirmar senha"
                error={errors.password_confirmation}
                {...register('password_confirmation')}
              /> */}
            </VStack>
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
