// import { NextPage } from 'next';
// import { useEffect, useState } from 'react';
// import { ConcreteRequest } from 'relay-runtime';

// import loadSerializableQuery, { SerializablePreloadedQuery } from '@/relay/loadSerializableQuery';

// import mainMaterialpassportsQueryNode, {
//     mainMaterialpassportsQuery
// } from '../../__generated__/relay/mainMaterialpassportsQuery.graphql';
// import Header from './header';

// const Testpage: NextPage = () => {
//   // console.log('preloadedQuery')
//   const [preloadedQuery, setPreloadedQuery] = useState<SerializablePreloadedQuery<ConcreteRequest, mainMaterialpassportsQuery> | null>(null)

//   useEffect(() => {
//     const fetchQuery = async () => {
//       const query = await loadSerializableQuery<typeof mainMaterialpassportsQueryNode, mainMaterialpassportsQuery>(
//         mainMaterialpassportsQueryNode.params,
//         {
//           first: 100,
//           after: null,
//         }
//       )

//       setPreloadedQuery(() => query)
//     }
//     fetchQuery()
//   }, [])

//   return preloadedQuery ? <Header preloadedQuery={preloadedQuery} /> : null
// }

// export default Testpage

// export const revalidate = 0
