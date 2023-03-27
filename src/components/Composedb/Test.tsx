import { graphql, useLazyLoadQuery, usePaginationFragment } from "react-relay"

export default function Test() {

    // https://medium.com/dooboolab/relay-experimental-cursor-pagination-6a9e448d3146


    // https://github.com/sibelius/relay-workshop/blob/main/solutions/04-usePaginationFragment/src/Feed.tsx
  // const queryData = useLazyLoadQuery<any>(
  //   graphql`
  //     query TestListQuery {
  //       materialpassportIndex(first: 10) @connection(key: "Test_materialpassportIndex") {
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
  // )

  // console.log(queryData)

  // const {
  //   data,
  //   loadNext,
  //   loadPrevious,
  //   hasNext,
  //   hasPrevious,
  //   isLoadingNext,
  //   isLoadingPrevious,
  //   refetch, // For refetching connection
  // } = usePaginationFragment<any, any>(
  //   graphql`
  //     fragment Test_materialpassport on Query @refetchable(queryName: "MaterialpassportsIndexPaginationQuery") {
  //       materialpassportIndex(first: $count, after: $cursor) @connection(key: "Test_materialpassportIndex") {
  //         edges {
  //           node {
  //             id
  //             completed
  //             author {
  //               id
  //             }
  //             version
  //           }
  //         }
  //       }
  //     }
  //   `,
  //   {}
  // )

  // console.log(data)
}
