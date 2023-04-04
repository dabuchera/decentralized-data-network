import { graphql } from 'relay-runtime';

export const getAllComponents = graphql`
  query getAllComponentsQuery($first: Int!, $after: String) {
    componentIndex(first: $first, after: $after) @connection(key: "getAllComponents_componentIndex") {
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
          mpID
          mp {
            id
            name
          }
          name
          functionalLayer
          actor
          lifecyclephase
          attributes
          created
          version
          ...component
        }
      }
    }
  }
`