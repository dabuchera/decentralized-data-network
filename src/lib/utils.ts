import { useAuthContext } from '@/services/providers/StacksAuthProvider';
import { UserData } from '@stacks/auth/src';
import { StacksMainnet, StacksTestnet } from '@stacks/network';
import { RPCClient } from '@stacks/rpc-client';

import { microstacksPerSTX } from './constants';

const env = process.env.REACT_APP_NETWORK_ENV || 'testnet'

// const selectedNetwork = localStorage.getItem('arkadiko-stacks-node');
let coreApiUrl = 'https://stacks-node-api.mainnet.stacks.co'
// if (selectedNetwork) {
//   const network = JSON.parse(selectedNetwork)
//   if (network['url']) {
//     console.log('Arkadiko Stacks Node URL:', network['url'])
//     coreApiUrl = network['url']
//   }
// }
if (env.includes('mocknet')) {
  coreApiUrl = `http://localhost:${process.env.LOCAL_STACKS_API_PORT}`
} else if (env.includes('testnet')) {
  coreApiUrl = 'https://stacks-node-api.testnet.stacks.co'
} else if (env.includes('regtest')) {
  coreApiUrl = 'https://stacks-node-api.regtest.stacks.co'
}

export const stacksNetwork = env === 'mainnet' ? new StacksMainnet({ url: coreApiUrl }) : new StacksTestnet({ url: coreApiUrl })

export const getRPCClient = () => {
  return new RPCClient(coreApiUrl)
}

export const useSTXAddress = (): string | undefined => {
  const { userData } = useAuthContext('useSTXAddress')

  const env = process.env.REACT_APP_NETWORK_ENV
  const isMainnet = env == 'mainnet'

  if (isMainnet) {
    return userData?.profile?.stxAddress?.mainnet as string
  }
  return userData?.profile?.stxAddress?.testnet as string
}

export const resolveSTXAddress = (userData: UserData | null) => {
  const env = process.env.REACT_APP_NETWORK_ENV
  const isMainnet = env == 'mainnet'

  if (isMainnet) {
    return userData?.profile?.stxAddress?.mainnet as string
  }
  return userData?.profile?.stxAddress?.testnet as string
}

export const getBalance = async (address: string) => {
  const client = getRPCClient()
  const url = `${client.url}/extended/v1/address/${address}/balances`

  // console.log(url)
  const response = await fetch(url, { credentials: 'omit' })
  const data = await response.json()

  // console.log(data)
  // const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS

  // // console.log(contractAddress)
  // const dasBalance = data.fungible_tokens[`${contractAddress}.das-token::das-token`]

  return {
    stx: Number(data.stx.balance / microstacksPerSTX),
    // das: dasBalance ? Number(dasBalance.balance) : 0,
    // stx: Number(data.stx.balance) - Number(data.stx.locked),
    // das: Number(dasBalance) ? dasBalance.balance : 0,
  }
}

export const getAccessNFTBalance = async (address: string) => {
  const client = getRPCClient()
  const url = `${client.url}/extended/v1/tokens/nft/holdings?principal=${address}&asset_identifiers=${process.env.REACT_APP_CONTRACT_ADDRESS}.accessNFT::accessNFT`

  // console.log(url)
  const response = await fetch(url, { credentials: 'omit' })
  const data = await response.json()

  const returnArr: string[] = []
  data.results.forEach((element: { value: { repr: string } }) => {
    returnArr.push(element.value.repr.replace('u', ''))
  })

  return returnArr
  // const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS

  // // console.log(contractAddress)
  // const dasBalance = data.fungible_tokens[`${contractAddress}.das-token::das-token`]

  // return {
  //   stx: Number(data.stx.balance / microstacksPerSTX),
  //   das: dasBalance ? Number(dasBalance.balance) : 0,
  //   // stx: Number(data.stx.balance) - Number(data.stx.locked),
  //   // das: Number(dasBalance) ? dasBalance.balance : 0,
  // }
}

export const truncateMiddle = (fullString: string | undefined) => {
  if (fullString === undefined) {
    return 'undefined'
  } else {
    let prefix = ''
    let suffix = ''
    if (fullString.startsWith('did:')) {
      prefix = fullString.slice(0, 21)
      suffix = fullString.slice(-4)
    } else {
      prefix = fullString.slice(0, 4)
      suffix = fullString.slice(-4)
    }

    return `${prefix}....${suffix}`
  }
}
