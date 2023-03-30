import {
    graphql, useFragment, useLazyLoadQuery, useMutation, usePaginationFragment
} from 'react-relay';

import { Box, Button, Checkbox, Flex, Link, Td, Tr } from '@chakra-ui/react';

/* ## This is model ->  schema-materialpassport.graphql

  author: DID! @documentAccount
  version: CommitID! @documentVersion
  name: String! @string(minLength: 0, maxLength: 100)
  completed: Boolean! @boolean
  */
export const MPItem = (props: { materialpassport: any }) => {
  

  // const materialpassport = useFragment(
  //   graphql`
  //     fragment MPItem_materialpassport on Materialpassport {
  //       id
  //       author {
  //         id
  //       }
  //       name
  //       completed
  //       version
  //     }
  //   `,
  //   props.materialpassport
  // )

  // const [commit] = useMutation<any>(
  //   graphql`
  //     mutation MaterialpassportItemUpdateMaterialpassportMutation($input: UpdateMaterialpassportInput!) {
  //       updateMaterialpassport(input: $input) {
  //         document {
  //           id
  //           ...MaterialpassportItem_materialpassport
  //         }
  //       }
  //     }
  //   `
  // );

  // Das es läuft delete in app den Server und Query Provider
  return (
    <></>
  )
}
