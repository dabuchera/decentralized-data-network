import { graphql } from 'relay-runtime';

export const getAllMaterialpassports = graphql`
  query getAllMaterialpassportsQuery($first: Int!, $after: String) {
    materialpassportIndex(first: $first, after: $after) @connection(key: "getAllMaterialpassports_materialpassportIndex") {
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
         ...materialpassport
        }
      }
    }
  }
`