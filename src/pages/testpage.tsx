// import Test from '@/components/Composedb/Test'
// import { graphql, usePreloadedQuery, PreloadedQuery } from 'react-relay'
// import Materialpassports, { materialpassportIndexFragment } from '../components/Composedb/Materialpassports'

import Materialpassports from '@/components/Composedb/Materialpassports paginator';

// // const testpageQuery = graphql`
// //   query TestpageQuery {
// //     ...Materialpassports_materialpassportIndex
// //   }
// // `

// const testpageQuery = graphql`
//   query testpageQuery {
//     materialpassportIndex(first: 10) @connection(key: "MPList_materialpassportIndex") {
//       edges {
//         node {
//           id
//           author {
//             id
//           }
//           name
//           completed
//           version
//           # ...MPItem_materialpassport
//         }
//       }
//     }
//   }
// `

export default function Testpage(props) {
//   console.log('materialpassportsQuery ')
//   console.log(testpageQuery)
//   await preloadQuery(environment, materialpassportsQuery, {});

//   const data = usePreloadedQuery(testpageQuery, props.relayData)

  return (
    <>
      <h1>Material Passports</h1>
      {/* <Materialpassports/> */}
      {/* <h1>Testpage</h1> */}
    </>
  )
}

// export async function getServerSideProps() {
//   const { environment, relayData } = initEnvironment();
//   await preloadQuery(environment, materialpassportsQuery, {});

//   return {
//     props: {
//       relayData,
//     },
//   };
// }
