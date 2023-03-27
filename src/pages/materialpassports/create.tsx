import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { SubmitHandler, useForm } from 'react-hook-form';
import { graphql, useMutation } from 'react-relay';
import * as yup from 'yup';

import { Box, Button, Divider, Flex, Heading, HStack, SimpleGrid, VStack } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';

import { Input } from '../../components/Form/Input';
import { Header } from '../../components/Header';
import { Sidebar } from '../../components/Sidebar';
import { api } from '../../services/api';
import { queryClient } from '../../services/queryClient';
import { MaterialpassportFormData } from '../../types';

const createMaterialpassportMutation = graphql`
  mutation createMaterialpassportMutation($name: String!, $completed: Boolean!) {
    createMaterialpassport(input: { content: { name: $name, completed: $completed } }) {
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

const createMaterialpassportFormSchema = yup.object().shape({
  name: yup.string().required('Name required'),
  // email: yup.string().required('E-mail obrigatório').email('E-mail inválido'),
  // password: yup
  //   .string()
  //   .required('Senha obrigatória')
  //   .min(6, 'No mínimo 6 caracteres'),
  // password_confirmation: yup
  //   .string()
  //   .oneOf([null, yup.ref('password')], 'As senhas devem ser iguais'),
})

const CreateUser = () => {
  const router = useRouter()

  // const createUser = useMutation(
  //   async (user: MaterialpassportFormData) => {
  //     const response = await api.post('users', {
  //       user: {
  //         ...user,
  //         created_at: new Date(),
  //       },
  //     });

  //     return response.data.user;
  //   },
  //   {
  //     onSuccess: () => {
  //       queryClient.invalidateQueries('users');

  //       router.push('/users');
  //     },
  //   }
  // );

  const { register, handleSubmit, formState } = useForm<MaterialpassportFormData>({
    resolver: yupResolver(createMaterialpassportFormSchema),
  })

  const { errors } = formState

  const [commit, isInFlight] = useMutation(createMaterialpassportMutation)

  function createMaterialpassport(newName: string) {
    commit({
      variables: {
        name: newName,
        completed: false,
      },
      optimisticResponse: {
        createMaterialpassport: {
          document: {
            id: 'temp-id', // Temporary ID, it will be replaced with the actual ID from the server response
            name: newName,
            completed: false,
            author: {
              id: 'temp-author-id', // Temporary author ID, replace it with an actual value if available
            },
            version: 'temp-version', // Temporary version, replace it with an actual value if available
          },
        },
      },
    })
  }

  const handleCreateMaterialpassport: SubmitHandler<MaterialpassportFormData> = async (data) => {
    console.log(data)
    createMaterialpassport(data.name)
    // await createUser.mutateAsync(data);
    router.push('/materialpassports')
  }

  return (
    <>
      <Head>
        <title>Create user | Circ</title>
      </Head>
      <Box>
        <Header />

        <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
          <Sidebar />

          <Box as="form" flex="1" borderRadius={8} bg="gray.800" p={['6', '8']} onSubmit={handleSubmit(handleCreateMaterialpassport)}>
            <Heading size="lg" fontWeight="normal">
              Create materialpassport
            </Heading>

            <Divider my="6" borderColor="gray.700" />

            <VStack spacing={['6', '8']}>
              <SimpleGrid minChildWidth="240px" spacing={['6', '8']} w="100%">
                <Input label="Name" error={errors.name} {...register('name')} />
                {/* <Input
                  type="email"
                  label="E-mail"
                  error={errors.email}
                  {...register('email')}
                /> */}
              </SimpleGrid>

              <SimpleGrid minChildWidth="240px" spacing={['6', '8']} w="100%">
                {/* <Input
                  type="password"
                  label="Senha"
                  error={errors.password}
                  {...register('password')}
                />
                <Input
                  type="password"
                  label="Confirmar senha"
                  error={errors.password_confirmation}
                  {...register('password_confirmation')}
                /> */}
              </SimpleGrid>
            </VStack>

            <Flex mt={['6', '8']} justify="flex-end">
              <HStack spacing="4">
                <Link href="/materialpassports" passHref>
                  <Button as="a" colorScheme="whiteAlpha">
                    Cancel
                  </Button>
                </Link>
                <Button type="submit" colorScheme="pink" isLoading={formState.isSubmitting}>
                  Save
                </Button>
              </HStack>
            </Flex>
          </Box>
        </Flex>
      </Box>
    </>
  )
}

export default CreateUser