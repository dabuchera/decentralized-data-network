import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { graphql, useMutation } from 'react-relay';
import * as yup from 'yup';

import { truncateMiddle } from '@/lib/utils';
import { composeClient } from '@/relay/environment';
import { Actor, ComponentFormData, FunctionalLayer, KeyValue, LCP } from '@/types';
import {
    Box, Button, Divider, Flex, Heading, HStack, Select, SimpleGrid, Text, useBreakpointValue,
    VStack
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';

import { CreateComponentInput } from '../../__generated__/relay/createComponentMutation.graphql';
import { Input } from '../../components/Form/Input';

const createComponentMutation = graphql`
  mutation createComponentMutation($input: CreateComponentInput!) {
    createComponent(input: $input) {
      # Define here what should be the response below
      document {
        id
      }
    }
  }
`

const createComponentFormSchema = yup.object().shape({
  name: yup.string().required('Name required'),
  functionalLayer: yup.string().required('Functional Layer required'),
  actor: yup.string().required('Actor required'),
  lifecyclephase: yup.string().required('Lifecyclephase required'),
  attributes: yup.array().of(
    yup.object().shape({
      key: yup.string().required('Attribute key required'),
      value: yup.string().required('Attribute value required'),
    })
  )
})

const CreateComponent = () => {
  const isWideVersion = useBreakpointValue({
    base: false,
    md: false,
    lg: true,
  })

  const router = useRouter()
  const [attributes, setAttributes] = useState<KeyValue[]>([])

  const { register, handleSubmit, formState, control } = useForm<ComponentFormData>({
    resolver: yupResolver(createComponentFormSchema),
  })

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

  function createComponentCeramic(data: ComponentFormData) {
    const date = new Date()
    const formattedDate = date.toISOString().slice(0, 10)
    commit({
      variables: {
        input: {
          content: {
            mpID: 'kjzl6kcym7w8y7kqkhxmunpmpdlyy5e15oj76sixf1xzs78rcbdy9vfsz4t8o4j',
            name: data.name,
            functionalLayer: data.functionalLayer,
            actor: data.actor,
            lifecyclephase: data.lifecyclephase,
            // "[{\"key\":\"key1\",\"value\":\"value1\"},{\"key\":\"key2\",\"value\":\"value2\"}]",
            attributes: JSON.stringify(data.attributes),
            created: formattedDate
          },
        },
      },
      optimisticResponse: {
        createComponent: {
          document: {
            id: 'temp-id', // Temporary ID, it will be replaced with the actual ID from the server response
          },
        },
      },
      onCompleted: (data, errors) => {
        console.log('*********************** createComponentCeramic ***********************')
        console.log(data)
        console.log(errors)
        router.push('/components')
      },
    })
  }

  const handleCreateComponentCeramic: SubmitHandler<ComponentFormData> = async (data) => {
    console.log(data)
    console.log(JSON.stringify(data.attributes))
    createComponentCeramic(data)
  }

  return (
    <>
      <Head>
        <title>Create Component | Circ</title>
      </Head>

      <SimpleGrid flex="1" gap="4" w="75vw" minChildWidth="320px" alignItems="flex-start">
        <Box as="form" flex="1" borderRadius={8} bg="gray.800" p={['6', '8']} onSubmit={handleSubmit(handleCreateComponentCeramic)}>
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
            <SimpleGrid maxW="50vw" columns={isWideVersion ? 3 : 1} spacing={['6', '8']} w="100%" alignItems="flex-end">
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
            </HStack>
          </Flex>
        </Box>
      </SimpleGrid>
    </>
  )
}

export default CreateComponent
