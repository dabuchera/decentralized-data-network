import { NextPage } from 'next';
import Head from 'next/head';
import { Suspense, useEffect, useState } from 'react';
import {
    graphql, loadQuery, PreloadedQuery, usePreloadedQuery, useQueryLoader, useRelayEnvironment
} from 'react-relay';

import { environment } from '@/lib/relay';
import { Box, SimpleGrid, Text } from '@chakra-ui/react';

const MaterialpassportFragment = graphql`
  fragment testpage_materialpassport on Materialpassport {
    id
    author {
      id
    }
    version
    name
    created
    completed
  }
`

const testpageMaterialpassportsQuery = graphql`
  query testpageMaterialpassportsQuery($first: Int!, $after: String) {
    materialpassportIndex(first: $first, after: $after) @connection(key: "testpage_materialpassportIndex") {
      pageInfo {
        endCursor
        hasNextPage
      }
      edges {
        node {
          id
          author {
            id
          }
          version
          name
          created
          completed
          ...testpage_materialpassport
        }
      }
    }
  }
`

type Props = {
  appQueryRef: PreloadedQuery<any>
}

function Header({ appQueryRef }: Props) {
  const data = usePreloadedQuery(testpageMaterialpassportsQuery, appQueryRef)

  return <h1>{data}</h1>
}

const appQueryRef = loadQuery(
  environment,
  testpageMaterialpassportsQuery,
  {
    first: 100,
    //   after: (page - 1) * 10,
    after: null,
  },
  {
    fetchPolicy: 'network-only', // Choose the appropriate fetch policy
  }
)

const Testpage: NextPage<{ appQueryRef: any }> = ({ appQueryRef }) => {
  // const [appQueryRef, loadQuery] = useQueryLoader(testpageMaterialpassportsQuery)

  // useEffect(() => {
  //   loadQuery
  // }, [])

  return (
    <Suspense fallback={<p>loading</p>}>
      <Header appQueryRef={appQueryRef}></Header>
    </Suspense>
    // <>
    //   <Head>
    //     <title>Testpage | Circ</title>
    //   </Head>
    //   <React.Suspense fallback="Loading...">
    //   <SimpleGrid flex="1" gap="4" w="75vw" minChildWidth="320px" alignItems="flex-start">
    //     <Box p={['6', '8']} bg="gray.800" borderRadius={8} pb="4">
    //       <Text align="center" colorScheme="pink" size="lg">
    //         Testpage
    //       </Text>
    //     </Box>
    //   </SimpleGrid>
    //   <Box p={['6', '8']} bg="gray.800" borderRadius={8} pb="4">
    //     <div>
    //       <h1>Material Passports</h1>
    //       <ul>
    //         {data?.materialpassportIndex?.edges.map((edge) => (
    //           <li key={edge.node.id}>
    //             <MaterialPassport materialpassport={edge.node} />
    //           </li>
    //         ))}
    //       </ul>
    //     </div>
    //   </Box>
    //   </React.Suspense>
    // </>
  )
}

export default Testpage
