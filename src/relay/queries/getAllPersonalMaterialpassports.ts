import { graphql } from 'relay-runtime';

export const getAllPersonalMaterialpassports = graphql`
  query getAllPersonalMaterialpassportsQuery($first: Int!, $after: String) {
    viewer {
      id
      materialpassportList(first: $first, after: $after) @connection(key: "getAllPersonalMaterialpassports_materialpassportList") {
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
  }
`
