import { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { ConcreteRequest } from 'relay-runtime';

import loadSerializableQuery, { SerializablePreloadedQuery } from '@/relay/loadSerializableQuery';

import getAllMaterialpassportsNode, {
    getAllMaterialpassportsQuery
} from '../../__generated__/relay/getAllMaterialpassportsQuery.graphql';
import Header from './header';

const Materialpassport: NextPage = () => {
  const [preloadedQuery, setPreloadedQuery] = useState<SerializablePreloadedQuery<ConcreteRequest, getAllMaterialpassportsQuery> | null>(null)

  console.log('Materialpassport index.tsx')

  useEffect(() => {
    const fetchQuery = async () => {
      const query = await loadSerializableQuery<typeof getAllMaterialpassportsNode, getAllMaterialpassportsQuery>(
        getAllMaterialpassportsNode.params,
        {
          first: 100,
          after: null,
        }
      )

      setPreloadedQuery(() => query)
    }
    fetchQuery()
  }, [])

  return preloadedQuery ? <Header preloadedQuery={preloadedQuery} /> : null
}

export default Materialpassport

export const revalidate = 0
