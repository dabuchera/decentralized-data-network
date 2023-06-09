import { DIDSession } from 'did-session';
import {
    CacheConfig, Environment, GraphQLResponse, Network, QueryResponseCache, RecordSource,
    RequestParameters, Store, Variables
} from 'relay-runtime';

import { ComposeClient } from '@composedb/client';
import { getAccountIdByNetwork, StacksWebAuth } from '@didtools/pkh-stacks';
import { getStacksProvider, UserData } from '@stacks/connect';

import runtimeComposite from '../../ceramic/definitions/runtime-merged-composite.json';

export const composeClient = new ComposeClient({
  ceramic: 'http://localhost:7007',
  definition: runtimeComposite as any,
})

const HTTP_ENDPOINT = "http://localhost:5005/graphql";
const IS_SERVER = typeof window === typeof undefined;
const CACHE_TTL = 5 * 1000; // 5 seconds, to resolve preloaded results

export async function networkFetch(
  request: RequestParameters,
  variables: Variables
): Promise<GraphQLResponse> {
  // const token = process.env.NEXT_PUBLIC_REACT_APP_GITHUB_AUTH_TOKEN;
  // if (token == null || token === "") {
  //   throw new Error(
  //     "This app requires a GitHub authentication token to be configured. See readme.md for setup details."
  //   );
  // }

  const resp = await fetch(HTTP_ENDPOINT, {
    method: "POST",
    headers: {
      Accept: "application/json",
      // Authorization: `bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: request.text,
      variables,
    }),
  });
  const json = await resp.json();

  // GraphQL returns exceptions (for example, a missing required variable) in the "errors"
  // property of the response. If any exceptions occurred when processing the request,
  // throw an error to indicate to the developer what went wrong.
  if (Array.isArray(json.errors)) {
    console.error(json.errors);
    throw new Error(
      `Error fetching GraphQL query '${
        request.name
      }' with variables '${JSON.stringify(variables)}': ${JSON.stringify(
        json.errors
      )}`
    );
  }

  return json;
}

export const responseCache: QueryResponseCache | null = IS_SERVER
  ? null
  : new QueryResponseCache({
      size: 100,
      ttl: CACHE_TTL,
    });

// function createNetwork() {
//   async function fetchResponse(
//     params: RequestParameters,
//     variables: Variables,
//     cacheConfig: CacheConfig
//   ) {
//     const isQuery = params.operationKind === "query";
//     const cacheKey = params.id ?? params.cacheID;
//     const forceFetch = cacheConfig && cacheConfig.force;
//     if (responseCache != null && isQuery && !forceFetch) {
//       const fromCache = responseCache.get(cacheKey, variables);
//       if (fromCache != null) {
//         return Promise.resolve(fromCache);
//       }
//     }

//     return networkFetch(params, variables);
//   }

//   const network = Network.create(fetchResponse);
//   return network;
// }

const network = Network.create(async (request, variables) => {
  return (await composeClient.executeQuery(request.text!, variables)) as any;
});

function createEnvironment() {
  // console.log('network')
  // console.log(network)
  return new Environment({
    network: network,
    // store: new Store(RecordSource.create()),
    store: new Store(new RecordSource()),
    // isServer: IS_SERVER,
  });
}

// export const environment = createEnvironment();

export const environment = new Environment({
  network,
  store: new Store(new RecordSource()),
})


export function getCurrentEnvironment() {
  // if (IS_SERVER) {
  //   return createEnvironment();
  // }

  return environment;
}

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