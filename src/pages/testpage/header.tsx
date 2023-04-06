// "use client";
// import { useRelayEnvironment } from 'react-relay';

// import { getCurrentEnvironment } from '@/relay/environment';
// import { SerializablePreloadedQuery } from '@/relay/loadSerializableQuery';
// import useSerializablePreloadedQuery from '@/relay/useSerializablePreloadedQuery';

// import mainMaterialpassportsQueryNode, {
//     mainMaterialpassportsQuery
// } from '../../__generated__/relay/mainMaterialpassportsQuery.graphql';
// import Main from './main';

// export default function Header(props: {
//   preloadedQuery: SerializablePreloadedQuery<typeof mainMaterialpassportsQueryNode, mainMaterialpassportsQuery>
// }) {
//   const environment = useRelayEnvironment()
//   // const environment = getCurrentEnvironment()

//   console.log('environment')
//   console.log(environment)

//   const queryRef = useSerializablePreloadedQuery(environment, props.preloadedQuery)
//   // console.log('queryRef')
//   // console.log(queryRef)
//   setTimeout(() => {
    
//   }, 3000);

//   // return <></>
//   return <Main queryRef={queryRef} />
// }
