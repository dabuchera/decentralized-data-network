import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form';
import { graphql, useMutation } from 'react-relay';
import * as yup from 'yup';

import { truncateMiddle } from '@/lib/utils';
import { composeClient } from '@/relay/environment';
import { useAuthContext } from '@/services/providers/StacksAuthProvider';
import {
    Actor, ComponentFormData, FunctionalLayer, KeyValue, LCP, MaterialpassportFormData
} from '@/types';
import {
    Box, Button, Container, Divider, Flex, Heading, HStack, Select, SimpleGrid, Text,
    useBreakpointValue, VStack
} from '@chakra-ui/react';
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
  functionalLayer: yup.string().required('Functional Layer required'),
  actor: yup.string().required('Actor required'),
  lifecyclephase: yup.string().required('Lifecyclephase required'),
  attributes: yup.array().of(
    yup.object().shape({
      key: yup.string().required('Attribute key required'),
      value: yup.string().required('Attribute value required'),
    })
  ),

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
  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });

  useEffect(() => {
    console.log(isWideVersion)
  },[isWideVersion])
  const router = useRouter()
  const [attributes, setAttributes] = useState<KeyValue[]>([])

  const { register, handleSubmit, formState, control, data } = useForm<ComponentFormData>({
    resolver: yupResolver(createMaterialpassportFormSchema),
  })

  // const { fields: attributeFields, append, remove} = useFieldArray({
  //   control,
  //   name: 'attributes',
  // });

  const onAddAttribute = () => {
    // append({ key: '', value: '' })
    setAttributes([...attributes, { key: '', value: '' }])
  }

  const onRemoveAttribute = (index: number) => {
    setAttributes(attributes.filter((_, i) => i !== index))
  }

  const onAttributeChange = (index: number, keyOrValue: 'key' | 'value', value: string) => {

    setAttributes(attributes.map((attr, i) => (i === index ? { ...attr, [keyOrValue]: value } : attr)))
  }

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
    console.log('handleCreateMaterialpassport')
    console.log(attributes)
    console.log(data)
    // createComponentCeramic(data.name)
    // router.push('/components')
  }

  return (
    <>
      <Head>
        <title>Create Component | Circ</title>
      </Head>

      <SimpleGrid flex="1" gap="4" w="75vw" minChildWidth="320px" alignItems="flex-start">
        <Box as="form" flex="1" borderRadius={8} bg="gray.800" p={['6', '8']} onSubmit={handleSubmit(handleCreateMaterialpassport)}>
          <Heading size="lg" fontWeight="normal">
            Create Component
          </Heading>

          <Divider my="6" borderColor="gray.700" />

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
            <SimpleGrid minChildWidth="160px" maxW="50vw" columns={isWideVersion? 3 : 1} spacing={['6', '8']} w="100%" alignItems="flex-end">
              {attributes.map((attr, i) => (
                <React.Fragment key={i}>
                  <Input
                    // name={`Key ${i}`}
                    {...register(`attributes.${i}.key`)}
                    label={`Key ${i}`}
                    value={attr.key}
                    onChange={(e) => onAttributeChange(i, 'key', e.target.value)}
                    placeholder="Attribute key"
                  />
                  <Input
                    // name={`Value ${i}`}
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

          <Flex mt={['6', '8']} justify="flex-end">
            <HStack spacing="4">
              <Link href="/components" passHref>
                <Button as="div" colorScheme="whiteAlpha">
                  Cancel
                </Button>
              </Link>
              <Button type="submit" colorScheme="pink" isLoading={formState.isSubmitting}>
                Save
              </Button>
              <Button
                size="sm"
                colorScheme="pink"
                onClick={() => {
                  console.log(attributes)
                }}
              >
                Show Attribute
              </Button>
              <Button
                size="sm"
                colorScheme="pink"
                onClick={() => {
                  // console.log(attributeFields)
                  console.log(formState)
                }}
              >
                Show attributeFields
              </Button>
            </HStack>
          </Flex>
        </Box>
      </SimpleGrid>
    </>
  )
}

export default CreateComponent
