import { StacksMainnet, StacksTestnet } from '@stacks/network';
import { RPCClient } from '@stacks/rpc-client';

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
