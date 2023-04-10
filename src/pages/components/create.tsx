import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { get, SubmitHandler, useForm } from 'react-hook-form';
import { graphql, useMutation } from 'react-relay';
import * as yup from 'yup';

import { truncateMiddle } from '@/lib/utils';
import { composeClient } from '@/relay/environment';
import { useAppContext } from '@/services/providers/AppStateProvider';
import { useAuthContext } from '@/services/providers/StacksAuthProvider';
import {
    Actor, ComponentFormData, FunctionalLayer, KeyValue, LCP, Materialpassport
} from '@/types';
import {
    Box, Button, Divider, Flex, FormLabel, Heading, HStack, Menu, MenuButton, MenuItem, MenuList,
    Select, SimpleGrid, Spinner, Text, useBreakpointValue, useToast, VStack
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
  mpID: yup.string().required('Materialpassport required'),
  attributes: yup.array().of(
    yup.object().shape({
      key: yup.string().required('Attribute key required'),
      value: yup.string().required('Attribute value required'),
    })
  ),
})

const CreateComponent = () => {
  console.log('CreateComponent')
  const isWideVersion = useBreakpointValue({
    base: false,
    md: false,
    lg: true,
  })
  const toast = useToast()

  const router = useRouter()

  // only used for re-rendering
  const [attributes, setAttributes] = useState<KeyValue[]>([])

  const { register, handleSubmit, formState, setValue, getValues, setError } = useForm<ComponentFormData>({
    resolver: yupResolver(createComponentFormSchema),
  })

  const { errors } = formState

  const [commit, isInFlight] = useMutation(createComponentMutation)

  function createComponentCeramic(data: ComponentFormData) {
    console.log('createComponentCeramic')
    console.log(data)

    let localAttributes
    if (!data.attributes) {
      localAttributes = ''
    } else {
      localAttributes = JSON.stringify(data.attributes)
    }
    const date = new Date()
    const formattedDate = date.toISOString().slice(0, 10)
    console.log(data)
    console.log(localAttributes)
    commit({
      variables: {
        input: {
          content: {
            mpID: data.mpID,
            name: data.name,
            functionalLayer: data.functionalLayer,
            actor: data.actor,
            lifecyclephase: data.lifecyclephase,
            // "[{\"key\":\"key1\",\"value\":\"value1\"},{\"key\":\"key2\",\"value\":\"value2\"}]",
            attributes: localAttributes,
            created: formattedDate,
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
    createComponentCeramic(data)
    // console.log(getValues())
    // console.log(JSON.stringify(data.attributes))
    // console.log(getValues())
    // setValue('attributes', attributes)
    // console.log(getValues().attributes)
    // console.log(formState.isValid)
    // createComponentCeramic(data)
  }

  const [pageMP, setPageMP] = useState(0)

  const { appState } = useAppContext()

  const itemsPerPage = 10 // Number of items to display per page

  const pageCount = Math.ceil(appState?.materialpassports?.length / itemsPerPage)
  const startIndex = pageMP * itemsPerPage
  const endIndex = (pageMP + 1) * itemsPerPage

  const onMPPageChange = (newPage: number) => {
    setPageMP(newPage)
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

          {isInFlight ? (
            <Flex justify="center">
              <Spinner size="xl" />
            </Flex>
          ) : (
            <>
              <VStack spacing={['6', '8']} alignItems="flex-start">
                <SimpleGrid minChildWidth="240px" spacing={['6', '8']} w="100%" alignItems="flex-end">
                  <Input label="Name" error={errors.name} {...register('name')} />
                  <Box>
                    <FormLabel htmlFor="functionalLayer">Functional Layer</FormLabel>
                    <Select
                      id="functionalLayer"
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
                  </Box>
                  <Box>
                    <FormLabel htmlFor="actor">Actor</FormLabel>
                    <Select
                      id="actor"
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
                  </Box>
                  <Box>
                    <FormLabel htmlFor="lifecyclephase">Lifecycle Phase</FormLabel>
                    <Select
                      id="lifecyclephase"
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
                  </Box>

                  <Box>
                    <FormLabel htmlFor="mpID">Materialpassport</FormLabel>
                    <Box display="flex" flexDirection="row" alignItems="center">
                      <Select
                      id="mpID"
                      {...register('mpID')}
                      placeholder="Select Materialpassport"
                      variant="filled"
                      focusBorderColor="pink.500"
                      bgColor="gray.900"
                      _hover={{
                        bgColor: 'gray.900',
                      }}>
                        {appState?.materialpassports?.slice(startIndex, endIndex).map((item) => (
                          <option key={item.id} value={item.id}>
                            {item.name}
                          </option>
                        ))}
                      </Select>
                      <Menu>
                        <MenuButton
                          as={Button}
                          // size="md"
                          // position="reltiv"
                          top="0"
                          right="0"
                          // borderRadius="0"
                          // borderWidth="0"
                          _hover={{ bg: 'transparent' }}
                        >
                          <Text fontSize="xs">
                            {pageMP + 1}/{pageCount}
                          </Text>
                        </MenuButton>
                        <MenuList>
                          {[...Array(pageCount)].map((_, i) => (
                            <MenuItem key={i} onClick={() => onMPPageChange(i)}>
                              {i + 1}
                            </MenuItem>
                          ))}
                        </MenuList>
                      </Menu>
                    </Box>
                  </Box>

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
                  {getValues('attributes')?.map((attr, i) => (
                    <React.Fragment key={i}>
                      <Input
                        // name={`Key ${i}`}
                        {...register(`attributes.${i}.key`)}
                        label={`Key ${i}`}
                        error={errors.attributes?.[i]?.key} // access the error message for the key
                        // value={attr.key}
                        // onChange={(e) => onAttributeChange(i, 'key', e.target.value)}
                        placeholder="Attribute key"
                      />
                      <Input
                        // name={`Value ${i}`}
                        {...register(`attributes.${i}.value`)}
                        label={`Value ${i}`}
                        error={errors.attributes?.[i]?.value} // access the error message for the value
                        // value={attr.value}
                        // onChange={(e) => onAttributeChange(i, 'value', e.target.value)}
                        // onChange={(e) => console.log(getValues('name'))}
                        placeholder="Attribute value"
                      />
                      {/* <Button w="75%" size="md" variant="outline" colorScheme="pink" onClick={() => onRemoveAttribute(i)}> */}
                      <Button
                        w="75%"
                        size="md"
                        variant="outline"
                        colorScheme="pink"
                        onClick={() => {
                          setValue(
                            'attributes',
                            getValues('attributes').filter((_, index) => index !== i)
                          )
                          setAttributes(attributes.filter((_, iindex) => iindex !== i))
                        }}
                      >
                        Remove
                      </Button>
                    </React.Fragment>
                  ))}
                </SimpleGrid>
              </VStack>

              <Flex mt={['6', '8']} justify="flex-end">
                <HStack spacing="4">
                  {/* <Button size="sm" colorScheme="pink" onClick={onAddAttribute}> */}
                  <Button
                    size="sm"
                    colorScheme="pink"
                    onClick={() => {
                      let oldArray = getValues('attributes')
                      if (!oldArray) {
                        oldArray = []
                      }
                      const newArray = [...oldArray, { key: '', value: '' }]
                      setValue('attributes', newArray)
                      setAttributes(newArray)
                    }}
                  >
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
            </>
          )}
        </Box>
      </SimpleGrid>
    </>
  )
}

export default CreateComponent
