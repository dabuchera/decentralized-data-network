import { graphql } from 'relay-runtime';

export const ComponentFragment = graphql`
  fragment component on Component {
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
  }
`