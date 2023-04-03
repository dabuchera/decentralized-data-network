import { graphql } from 'relay-runtime';

export const MaterialpassportFragment = graphql`
  fragment materialpassport on Materialpassport {
    id
    author {
      id
    }
    version
    name
    created
    completed
  }
`