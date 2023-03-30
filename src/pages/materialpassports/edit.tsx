import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { graphql, useMutation } from 'react-relay';
import * as yup from 'yup';

import {
    Box, Button, Divider, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter,
    ModalHeader, ModalOverlay, VStack
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';

import { Input } from '../../components/Form/Input';
import { api } from '../../services/api';
import { queryClient } from '../../services/queryClient';
import { MaterialpassportFormData } from '../../types';

const editUpdateMaterialpassportMutation = graphql`
  mutation editUpdateMaterialpassportMutation($id: ID!, $name: String!) {
    updateMaterialpassport(input: { id: $id, content: { name: $name } }) {
      document {
        id
        author {
          id
        }
        name
        completed
        version
      }
    }
  }
`

type EditUserProps = {
  materialpassport?: Pick<MaterialpassportFormData, 'name' | 'completed'>
  materialpassportId: string
  isOpen: boolean
  onClose: () => void
}

const editUserFormSchema = yup.object().shape({
  name: yup.string().required('Name required'),
  completed: yup.boolean().required('Completed required'),
})

const Edit = ({ materialpassport, materialpassportId, isOpen, onClose }: EditUserProps) => {
  const initialRef = useRef(null)

  const { register, handleSubmit, formState, reset, setValue } = useForm<MaterialpassportFormData>({
    resolver: yupResolver(editUserFormSchema),
  })

  useEffect(() => {
    setValue('name', materialpassport?.name)
    setValue('completed', materialpassport?.completed)
  }, [materialpassport, setValue])

  const { errors } = formState

  const [commit, isInFlight] = useMutation(editUpdateMaterialpassportMutation)

  async function updateMaterialpassportName(existingId: string, newName: string | undefined) {
    console.log(existingId, newName)
    commit({
      variables: {
        id: existingId,
        name: newName,
      },
      optimisticResponse: {
        updateMaterialpassport: {
          document: {
            id: existingId,
            name: newName,
            completed: 'temp-completed',
            author: {
              id: 'temp-author-id', // Temporary author ID, replace it with an actual value if available
            },
            version: 'temp-version', // Temporary version, replace it with an actual value if available
          },
        },
      },
    })
  }

  const handleCreateUser: SubmitHandler<MaterialpassportFormData> = async (data) => {
    console.log(data)
    updateMaterialpassportName(materialpassportId, data.name)
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
              {/* <Input
                type="email"
                label="E-mail"
                mb={2}
                error={errors.email}
                {...register('email')}
              />
              <Input
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
              <Button as="a" size="sm" fontSize="sm" ml="4" colorScheme="purple" _hover={{ cursor: 'pointer' }} onClick={onClose}>
                Cancel
              </Button>
            </Link>
          </ModalFooter>
        </Box>
      </ModalContent>
    </Modal>
  )
}

export default Edit
