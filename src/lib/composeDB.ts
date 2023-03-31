import { DIDSession } from 'did-session';

import { ComposeClient } from '@composedb/client';
import { getAccountIdByNetwork, StacksWebAuth } from '@didtools/pkh-stacks';
import { getStacksProvider, UserData } from '@stacks/connect';

import runtimeComposite from '../../ceramic/definitions/runtime-merged-composite.json';
import { appConfig } from './constants';

export const composeClient = new ComposeClient({
  ceramic: 'http://localhost:7007',
  definition: runtimeComposite as any,
})

export const loadDIDSession = async (userData: UserData) => {
  // const stacksProvider = window.StacksProvider
  const stacksProvider = getStacksProvider()

  const address = userData.profile.stxAddress.mainnet
  const accountId = getAccountIdByNetwork('mainnet', address)
  const authMethod = await StacksWebAuth.getAuthMethod(stacksProvider, accountId)

  // Check if user session already in storage
  const sessionStr = localStorage.getItem('didsession')
  let session

  // If session string available, create a new did-session object
  if (sessionStr) {
    session = await DIDSession.fromSession(sessionStr)
  }

  // If no session available, create a new user session and store in local storage
  if (!session || (session.hasSession && session.isExpired)) {
    const session = await DIDSession.authorize(authMethod, {
      resources: ['ceramic://*'],
    })
    localStorage.setItem('didsession', session.serialize())
  }

  if (session) {
    composeClient.setDID(session.did)
  }

  return session
}
