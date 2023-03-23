import * as yup from 'yup'
import Head from 'next/head'
import type { NextPage } from 'next'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Container, Flex, Stack } from '@chakra-ui/react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { AppConfig, authenticate, showConnect, UserData, UserSession } from '@stacks/connect'

import { Input } from '../components/Form/Input'
import Router from 'next/router'
import { useState, useEffect } from 'react'
import { DIDSession } from 'did-session'
import { StacksWebAuth, getAccountIdByNetwork } from '@didtools/pkh-stacks'
import { composeClient, loadDIDSession } from '@/lib/composeDB'
import { useAuth } from '@/services/hook/useAuth'

type SignInFormData = {
  email?: string
  password?: string
}

const signInFormSchema = yup.object().shape({
  email: yup.string().required('E-mail obrigatório').email('E-mail inválido'),
  password: yup.string().required('Senha obrigatória'),
})

const SignIn: NextPage = () => {
  const [user, setUser] = useState<UserData>()

  const { userSession, setUserData, authenticate, userData } = useAuth()


  /**
   * When app load check if user is already logged in
   */
  useEffect(() => {
    console.log('useEffect')
    if (userSession.isUserSignedIn()) {
      const userData = userSession.loadUserData()
      if (userData) {
        loadDIDSession(userData).then((session) => {
          if (session) {
            setUserData(userData)
            Router.push('/dashboard')
          }
        })
      }
    }
  }, [userData])

  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(signInFormSchema),
  })

  const { errors } = formState

  const handleSignIn: SubmitHandler<SignInFormData> = async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 1000))

    Router.push('/dashboard')
  }

  return (
    <>
      <Head>
        <title>SignIn | Circ</title>
      </Head>

      {/* <Container mt={80} mb={80} size="xs">
        {user ? userSession.loadUserData().profile.stxAddress.mainnet : <></>}
        {!user ? <ConnectWallet onConnect={handleConnect} /> : <TodoList />}
        <Button ml="20px" onClick={logout}>
          Logout
        </Button>
      </Container> */}

      <Flex w="100vw" h="100vh" align="center" justify="center">
        <Flex w="100%" maxWidth={360} bg="gray.800" p="8" borderRadius={8} flexDirection="column">
          <Button type="submit" colorScheme="pink" size="lg" onClick={authenticate}>
            Enter
          </Button>
        </Flex>
      </Flex>
    </>
  )
}

export default SignIn
