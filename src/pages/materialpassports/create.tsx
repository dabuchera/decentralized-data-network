import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { SubmitHandler, useForm } from 'react-hook-form';
import { graphql, useMutation, useRelayEnvironment } from 'react-relay';
import * as yup from 'yup';

import { Box, Button, Divider, Flex, Heading, HStack, SimpleGrid, VStack } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';

import {
    CreateMaterialpassportInput
} from '../../__generated__/relay/createMaterialpassportMutation.graphql';
import { Input } from '../../components/Form/Input';
import { MaterialpassportFormData } from '../../types';

const createMaterialpassportMutation = graphql`
  mutation createMaterialpassportMutation($input: CreateMaterialpassportInput!) {
    createMaterialpassport(input: $input) {
      document {
        id
        name
        completed
        created
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

const CreateMaterialpassport = () => {
  const router = useRouter()

  const { register, handleSubmit, formState } = useForm<MaterialpassportFormData>({
    resolver: yupResolver(createMaterialpassportFormSchema),
  })

  const { errors } = formState

  const [commit, isInFlight] = useMutation(createMaterialpassportMutation)

  function createMaterialpassportCeramic(newName: string) {
    const date = new Date()
    const formattedDate = date.toISOString().slice(0, 10)
    // console.log('*********************** formattedDate ***********************')
    // console.log(typeof formattedDate)
    // console.log(newName)
    const environment = useRelayEnvironment()
    console.log(environment)

    commit({
      variables: {
        input: {
          content: {
            name: newName,
            completed: false,
            created: formattedDate,
          },
        },
      },
      optimisticResponse: {
        createMaterialpassport: {
          document: {
            id: 'temp-id', // Temporary ID, it will be replaced with the actual ID from the server response
            name: newName,
            completed: false,
            created: formattedDate,
          },
        },
      },
      onCompleted: (data, errors) => {
        console.log('*********************** createMaterialpassportCeramic ***********************')
        console.log(data)
        console.log(errors)
      },
    })
  }

  const handleCreateMaterialpassport: SubmitHandler<MaterialpassportFormData> = async (data) => {
    console.log(data)
    createMaterialpassportCeramic(data.name)
    // await createUser.mutateAsync(data);
    router.push('/materialpassports')
  }

  return (
    <>
      <Head>
        <title>Create Materialpassport | Circ</title>
      </Head>

      <SimpleGrid flex="1" gap="4" minChildWidth="320px" alignItems="flex-start">
        <Box as="form" flex="1" borderRadius={8} bg="gray.800" p={['6', '8']} onSubmit={handleSubmit(handleCreateMaterialpassport)}>
          <Heading size="lg" fontWeight="normal">
            Create Materialpassport
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
                <Button as="div" colorScheme="whiteAlpha">
                  Cancel
                </Button>
              </Link>
              <Button type="submit" colorScheme="pink" isLoading={formState.isSubmitting}>
                Save
              </Button>
            </HStack>
          </Flex>
        </Box>
      </SimpleGrid>
    </>
  )
}

export default CreateMaterialpassport
