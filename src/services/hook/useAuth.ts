import { useAtom, useAtomValue } from 'jotai';
import { useRouter } from 'next/router';

import { loadDIDSession } from '@/lib/composeDB';
import { appDetails, microstacksPerSTX } from '@/lib/constants';
import { getRPCClient } from '@/lib/utils';
import { userDataAtom, userSessionAtom } from '@/store/auth';
import { showConnect, UserData } from '@stacks/connect';

import { useAuthContext } from '../providers/StacksAuthProvider';

export const useAuth = () => {
  console.log('useAuth')
  const { address, userSession, userData, setUserData } = useAuthContext()

  const router = useRouter()

  // const userSession = useAtomValue(userSessionAtom)
  // const [userData, setUserData] = useAtom(userDataAtom)

  // const authenticate = () => {
  //   showConnect({
  //     appDetails,
  //     onFinish: async () => {
  //       const userData = userSession.loadUserData()
  //       await loadDIDSession(userData).then((didsession) => {
  //         setUserData(userData)
  //         // window.location.reload()
  //       })
  //     },
  //     userSession,
  //   })
  // }

  // const logout = () => {
  //   router.push('/')
  //   setTimeout(() => {
  //     userSession.signUserOut()
  //   localStorage.removeItem('didsession')
  //   window.location.reload()
  //   }, 500);
  // }

  

  // const getBalance = async (address: string) => {
  //   const client = getRPCClient()
  //   const url = `${client.url}/extended/v1/address/${address}/balances`

  //   // console.log(url)
  //   const response = await fetch(url, { credentials: 'omit' })
  //   const data = await response.json()

  //   // console.log(data)
  //   // const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS

  //   // // console.log(contractAddress)
  //   // const dasBalance = data.fungible_tokens[`${contractAddress}.das-token::das-token`]

  //   return {
  //     stx: Number(data.stx.balance / microstacksPerSTX),
  //     // das: dasBalance ? Number(dasBalance.balance) : 0,
  //     // stx: Number(data.stx.balance) - Number(data.stx.locked),
  //     // das: Number(dasBalance) ? dasBalance.balance : 0,
  //   }
  // }

  // const getAccessNFTBalance = async (address: string) => {
  //   const client = getRPCClient()
  //   const url = `${client.url}/extended/v1/tokens/nft/holdings?principal=${address}&asset_identifiers=${process.env.REACT_APP_CONTRACT_ADDRESS}.accessNFT::accessNFT`

  //   // console.log(url)
  //   const response = await fetch(url, { credentials: 'omit' })
  //   const data = await response.json()

  //   const returnArr: string[] = []
  //   data.results.forEach((element: { value: { repr: string } }) => {
  //     returnArr.push(element.value.repr.replace('u', ''))
  //   })

  //   return returnArr
  //   // const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS

  //   // // console.log(contractAddress)
  //   // const dasBalance = data.fungible_tokens[`${contractAddress}.das-token::das-token`]

  //   // return {
  //   //   stx: Number(data.stx.balance / microstacksPerSTX),
  //   //   das: dasBalance ? Number(dasBalance.balance) : 0,
  //   //   // stx: Number(data.stx.balance) - Number(data.stx.locked),
  //   //   // das: Number(dasBalance) ? dasBalance.balance : 0,
  //   // }
  // }

  return {
    // authenticate,
    // logout,
    // getBalance,
    // getAccessNFTBalance,
  }
}
