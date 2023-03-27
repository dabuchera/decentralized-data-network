import { useEffect, useState } from 'react';
import { graphql, loadQuery, useLazyLoadQuery } from 'react-relay';

import {
    useAllMaterialpassportsPaginatorQuery as MaterialpassportsPaginatorQueryType
} from '../../__generated__/relay/useAllMaterialpassportsPaginatorQuery.graphql';

const MaterialpassportFragment = graphql`
  fragment useAllMaterialpassports_materialpassport on Materialpassport {
    id
    author {
      id
    }
    name
    completed
    version
  }
`

const useAllMaterialpassportsPaginatorQuery = graphql`
  query useAllMaterialpassportsPaginatorQuery($first: Int!, $after: String) {
    materialpassportIndex(first: $first, after: $after) @connection(key: "useMaterialpassports_materialpassportIndex") {
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
          name
          completed
          version
          ...useAllMaterialpassports_materialpassport
        }
      }
    }
  }
`

type Materialpassport = {
  id: string
  author_id: string
  name: string
  completed: boolean
  version: string
}

export const useAllMaterialpassports = (page: number) => {
  console.log('Hook useMaterialpassports')
  const [isFetching, setIsFetching] = useState(true)
  const [error, setError] = useState(null)

  const data = useLazyLoadQuery<MaterialpassportsPaginatorQueryType>(
    useAllMaterialpassportsPaginatorQuery,
    {
      first: 100,
      //   after: (page - 1) * 10,
      after: null,
    },
    {
      fetchPolicy: 'network-only', // Choose the appropriate fetch policy
    }
  )

  useEffect(() => {
    console.log('page changed')
    setIsFetching(true)
    setTimeout(() => {
      setIsFetching(false)
    }, 1000)
  }, [page])

  // Not used yet -> Could be added to Return
  const nativeMaterialpassports = data.materialpassportIndex.edges.map((edge) => edge.node)
  const pageInfo = data.materialpassportIndex.pageInfo

  const startIndex = (page - 1) * 5 // Assuming 10 items per page
  const endIndex = startIndex + 5
  const filteredNativeMaterialpassports = nativeMaterialpassports.slice(startIndex, endIndex)

  const totalCount = nativeMaterialpassports.length
  const materialpassports: Materialpassport[] = filteredNativeMaterialpassports
    .filter((materialpassport) => materialpassport !== null) // Filter out null values
    .map((materialpassport) => {
      return {
        id: materialpassport?.id ?? '',
        author_id: materialpassport?.author?.id ?? '',
        name: materialpassport?.name ?? '',
        completed: materialpassport?.completed ?? false,
        version: materialpassport?.version ?? '',
      }
    })

  return { data: materialpassports, isFetching, error }
}
