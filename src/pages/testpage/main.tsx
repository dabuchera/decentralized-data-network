// import { Suspense, useEffect, useState } from 'react';
// import { PreloadedQuery, usePreloadedQuery } from 'react-relay';
// import { graphql } from 'relay-runtime';

// import { Spinner } from '@chakra-ui/react';

// import mainMaterialpassportsQueryNode, {
//     mainMaterialpassportsQuery
// } from '../../__generated__/relay/mainMaterialpassportsQuery.graphql';

// const MaterialpassportFragment = graphql`
//   fragment main_materialpassport on Materialpassport {
//     id
//     author {
//       id
//     }
//     version
//     name
//     created
//     completed
//   }
// `

// const mainMaterialpassportsQuery1 = graphql`
//   query mainMaterialpassportsQuery($first: Int!, $after: String) {
//     materialpassportIndex(first: $first, after: $after) @connection(key: "main_materialpassportIndex") {
//       pageInfo {
//         endCursor
//         hasNextPage
//       }
//       edges {
//         node {
//           id
//           author {
//             id
//           }
//           version
//           name
//           created
//           completed
//           ...main_materialpassport
//         }
//       }
//     }
//   }
// `

// export default function Main(props: { queryRef: PreloadedQuery<mainMaterialpassportsQuery> }) {
//   const [isFetching, setIsFetching] = useState(true)
//   const data = usePreloadedQuery(mainMaterialpassportsQuery1, props.queryRef)

//   console.log('props')
//   console.log(props)

//   useEffect(() => {
//     setTimeout(() => {
//       setIsFetching(false)
//     }, 2000)
//   }, [])

//   if (isFetching) {
//     return <Spinner size="lg" color="gray.500" />
//   }


//   return (
//     <Suspense fallback={<Spinner size="sm" color="gray.500" ml="4" />}>
//       {isFetching ? <Spinner size="sm" color="gray.500" ml="4" /> : <h1>{data?.materialpassportIndex?.edges[0]?.node?.author.id}</h1>}
//     </Suspense>
//   )
// }
