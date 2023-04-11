import { graphql } from 'relay-runtime';

export const getAllPersonalComponents = graphql`
  query getAllPersonalComponentsQuery($first: Int!, $after: String) {
    viewer {
      id
      componentList(first: $first, after: $after) @connection(key: "getAllPersonalComponents_componentList") {
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
  }
`
