import { MouseEventHandler } from 'react';
import { graphql, useLazyLoadQuery, useMutation, usePaginationFragment } from 'react-relay';

import { MPListQuery } from '@/__generated__/relay/MPListQuery.graphql';
import { Button } from '@chakra-ui/react';

// import { AddListItem } from './AddListItem'
import { MPItem } from './MPItem';

// import { TodoItem } from './TodoItem'

const mockMPData = [
  {
    node: {},
  },
]

export const MPList = () => {
  //   const data = useLazyLoadQuery<any>(
  //     graphql`
  //       query MPListQuery {
  //         viewer {
  //           id
  //           materialpassportList(first: 1) @connection(key: "MPList_materialpassportList") {
  //             edges {
  //               node {
  //                 id
  //                 ...MPItem_materialpassport
  //               }
  //             }
  //           }
  //         }
  //       }
  //     `,
  //     {}
  //   );
  //   console.log('data')
  //   console.log(data)

  //*************************************************************************************************************
  // https://medium.com/@morrys/welcome-to-relay-hooks-4b4c52516030
  //*************************************************************************************************************


  //*************************************************************************************************************
  //// This one working  ////
  //*************************************************************************************************************
  // const queryData = useLazyLoadQuery<any>(
  //   graphql`
  //     query MPListQuery {
  //       materialpassportIndex(first: 10) @connection(key: "MPList_materialpassportIndex") {
  //         edges {
  //           node {
  //             id
  //             author {
  //               id
  //             }
  //             name
  //             completed
  //             version
  //             # ...MPItem_materialpassport
  //           }
  //         }
  //       }
  //     }
  //   `,
  //   {}
  // );
  // console.log(data)

  
  // const queryData = useLazyLoadQuery<any>(
  //   graphql`
  //     query MPListQuery {
  //       ...TagsView_tags
  //     }
  //   `
  // );
  
// const {
//   data,
//   loadNext,
//   hasNext,
// } = usePaginationFragment(
//   graphql`
//     fragment TagsView_tags on Query
//     @argumentDefinitions(
//       first: { type: "PositiveInt", defaultValue: 10 }
//       after: { type: "String", defaultValue: "" }
//     )
//     @refetchable(queryName: "TagsPaginationQuery") {
//       tags (
//         first: $first
//         after: $after
//       ) @connection(key: "Query_tags") {
//         totalCount
//         edges  {
//           node {
//             id
//             name
//           }
//         }
//         pageInfo {
//           endCursor
//           hasNextPage
//         }
//       }
//     }
//   `,
//   queryData
// );

//   const data1 = useLazyLoadQuery<any>(
//   graphql`
//     query MPListQuery {
//       materialpassportIndex(first: 100) @connection(key: "MPList_materialpassportIndex"){
//       # node(id: $id) {
//         ... on Materialpassport {
//           id
//             author {
//               id
//             }
//             name
//             completed
//             version
//         }
//       }
//     }
//   `,
//   {}
//   // { id: postId as string }
// );

  return (
    <>
      {/* {data.materialpassportIndex?.edges?.map((edge) => (
        <MPItem key={edge?.node?.id} materialpassport={edge!.node!} />
      ))} */}
    </>
  )
}
