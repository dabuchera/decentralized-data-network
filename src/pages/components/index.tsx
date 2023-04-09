import { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { ConcreteRequest } from 'relay-runtime';

import loadSerializableQuery, { SerializablePreloadedQuery } from '@/relay/loadSerializableQuery';

import getAllComponentsNode, {
    getAllComponentsQuery
} from '../../__generated__/relay/getAllComponentsQuery.graphql';
import getAllMaterialpassportsNode, {
    getAllMaterialpassportsQuery
} from '../../__generated__/relay/getAllMaterialpassportsQuery.graphql';
import Header from './header';

const Components: NextPage = () => {
  const [preloadedQueryComponents, setPreloadedQueryComponents] = useState<SerializablePreloadedQuery<ConcreteRequest, getAllComponentsQuery> | null>(
    null
  )
  const [preloadedQueryMaterialpassports, setPreloadedQueryMaterialpassports] = useState<SerializablePreloadedQuery<
    ConcreteRequest,
    getAllMaterialpassportsQuery
  > | null>(null)

  // console.log(Components)
  // console.log(preloadedQuery)
  useEffect(() => {
    const fetchQuery = async () => {
      const queryComponents = await loadSerializableQuery<typeof getAllComponentsNode, getAllComponentsQuery>(getAllComponentsNode.params, {
        first: 100,
        after: null,
      })

      const queryMaterialpassport = await loadSerializableQuery<typeof getAllMaterialpassportsNode, getAllMaterialpassportsQuery>(
        getAllMaterialpassportsNode.params,
        {
          first: 100,
          after: null,
        }
      )

      setPreloadedQueryComponents(() => queryComponents)
      setPreloadedQueryMaterialpassports(() => queryMaterialpassport)
    }
    fetchQuery()
  }, [])

  console.log(preloadedQueryComponents?.response.data.componentIndex.edges.length)

  return preloadedQueryComponents && preloadedQueryMaterialpassports ? (
    <Header preloadedQueryComponents={preloadedQueryComponents} preloadedQueryMaterialpassports={preloadedQueryMaterialpassports} />
  ) : null
}

export default Components

export const revalidate = 0
