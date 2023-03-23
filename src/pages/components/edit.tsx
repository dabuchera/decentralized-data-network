import {
  Box,
  Button,
  Divider,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  VStack,
} from '@chakra-ui/react';
import * as yup from 'yup';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { useMutation } from 'react-query';
import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';

import { api } from '../../services/api';
import { Input } from '../../components/Form/Input';
import { queryClient } from '../../services/queryClient';
import { UserFormData } from '../../types';

type EditUserProps = {
  user: Pick<UserFormData, 'name' | 'email'>;
  userId: string;
  isOpen: boolean;
  onClose: () => void;
};

const editUserFormSchema = yup.object().shape({
  name: yup.string().required('Nome obrigatório'),
  email: yup.string().required('E-mail obrigatório').email('E-mail inválido'),
  password: yup
    .string()
    .required('Senha obrigatória')
    .min(6, 'No mínimo 6 caracteres'),
  password_confirmation: yup
    .string()
    .oneOf([null, yup.ref('password')], 'As senhas devem ser iguais'),
});

export default function EditUser({
  user,
  userId,
  isOpen,
  onClose,
}: EditUserProps) {
  const initialRef = useRef();

  const { register, handleSubmit, formState, reset, setValue } =
    useForm<UserFormData>({
      resolver: yupResolver(editUserFormSchema),
    });

  useEffect(() => {
    setValue('name', user?.name);
    setValue('email', user?.email);
  }, [user, setValue]);

  const { errors } = formState;

  const editUser = useMutation(
    async (user: UserFormData) => {
      const response = await api.put(`users/${userId}`, {
        user: {
          ...user,
          created_at: new Date(),
        },
      });

      return response.data.user;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('users');

        onClose();
      },
    }
  );

  const handleCreateUser: SubmitHandler<UserFormData> = async (data) => {
    await editUser.mutateAsync(data);

    reset();
  };

  return (
    <Modal
      initialFocusRef={initialRef}
      isOpen={isOpen}
      onClose={onClose}
      size={'xl'}
    >
      <ModalOverlay />
      <ModalContent borderRadius={8} bg="gray.800">
        <ModalHeader fontWeight="normal">Edit user data</ModalHeader>

        <ModalCloseButton />

        <Box as="form" onSubmit={handleSubmit(handleCreateUser)}>
          <ModalBody>
            <Divider mb={6} borderColor="gray.700" />

            <VStack>
              <Input
                label="Nome completo"
                mb={2}
                error={errors.name}
                {...register('name')}
              />
              <Input
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
              />
            </VStack>
          </ModalBody>

          <ModalFooter pb={6}>
            <Button
              type="submit"
              size="sm"
              fontSize="sm"
              colorScheme="pink"
              _hover={{ cursor: 'pointer' }}
              isLoading={formState.isSubmitting}
            >
              Salvar
            </Button>

            <Link href="/users" passHref>
              <Button
                as="a"
                size="sm"
                fontSize="sm"
                ml="4"
                colorScheme="purple"
                _hover={{ cursor: 'pointer' }}
                onClick={onClose}
              >
                Cancelar
              </Button>
            </Link>
          </ModalFooter>
        </Box>
      </ModalContent>
    </Modal>
  );
}
