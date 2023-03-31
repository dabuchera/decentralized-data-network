import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { SubmitHandler, useForm } from 'react-hook-form';
import { graphql, useMutation } from 'react-relay';
import * as yup from 'yup';

import {
    Actor, ComponentFormData, FunctionalLayer, KeyValue, LCP, MaterialpassportFormData
} from '@/types';
import { Box, Button, Divider, Flex, Heading, HStack, SimpleGrid, VStack } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';

import { Input } from '../../components/Form/Input';
import { Header } from '../../components/Header';
import { Sidebar } from '../../components/Sidebar';
import { api } from '../../services/api';
import { queryClient } from '../../services/queryClient';

const createComponentMutation = graphql`
  mutation createComponentMutation($input: CreateComponentInput!) {
    createComponent(input: $input) {
      document {
        id
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

const CreateComponent = () => {
  const router = useRouter()

  const { register, handleSubmit, formState } = useForm<MaterialpassportFormData>({
    resolver: yupResolver(createMaterialpassportFormSchema),
  })

  const { errors } = formState

  const [commit, isInFlight] = useMutation(createComponentMutation)

  function createComponentCeramic(
    newName: string,
    mpID: string,
    functionalLayer: FunctionalLayer,
    actor: Actor,
    lifecyclephase: LCP,
    attributes: KeyValue[]
  ) {
    commit({
      variables: {
        input: {
          mpID: mpID,
          name: newName,
          functionalLayer: functionalLayer,
          actor: actor,
          lifecyclephase: lifecyclephase,
          // "[{\"key\":\"key1\",\"value\":\"value1\"},{\"key\":\"key2\",\"value\":\"value2\"}]",
          attributes: JSON.stringify(attributes),
        },
      },
      optimisticResponse: {
        createMaterialpassport: {
          document: {
            id: 'temp-id', // Temporary ID, it will be replaced with the actual ID from the server response
          },
        },
      },
    })
  }

  const handleCreateMaterialpassport: SubmitHandler<ComponentFormData> = async (data) => {
    console.log(data)
    createComponentCeramic(data.name)
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
              <Input type="email" label="E-mail" error={errors.email} {...register('email')} />
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

export default CreateComponent
