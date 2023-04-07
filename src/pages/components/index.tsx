import { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { ConcreteRequest } from 'relay-runtime';

import loadSerializableQuery, { SerializablePreloadedQuery } from '@/relay/loadSerializableQuery';

import getAllComponentsNode, {
    getAllComponentsQuery
} from '../../__generated__/relay/getAllComponentsQuery.graphql';
import Header from './header';

const Components: NextPage = () => {
  const [preloadedQuery, setPreloadedQuery] = useState<SerializablePreloadedQuery<ConcreteRequest, getAllComponentsQuery> | null>(null)
  // console.log(Components)
  // console.log(preloadedQuery)
  useEffect(() => {
    const fetchQuery = async () => {
      const query = await loadSerializableQuery<typeof getAllComponentsNode, getAllComponentsQuery>(
        getAllComponentsNode.params,
        {
          first: 100,
          after: null,
        }
      )

      setPreloadedQuery(() => query)
    }
    fetchQuery()
  }, [])

  console.log(preloadedQuery?.response.data.componentIndex.edges.length)

  return preloadedQuery ? <Header preloadedQuery={preloadedQuery} /> : null
}

export default Components

export const revalidate = 0
