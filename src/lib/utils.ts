import { RPCClient } from '@stacks/rpc-client'
import { StacksMainnet, StacksTestnet } from '@stacks/network'

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

export const truncateMiddle = (fullString: string | undefined) => {
  if (fullString === undefined) {
    return 'undefined'
  } else {
    const targetLength = 11
    const separator = '...'

    const sepLen = separator.length
    const charsToShow = targetLength - sepLen
    const frontChars = Math.ceil(charsToShow / 2)
    const backChars = Math.floor(charsToShow / 2)

    return fullString.substring(0, frontChars) + separator + fullString.substring(fullString.length - backChars)
  }
}
