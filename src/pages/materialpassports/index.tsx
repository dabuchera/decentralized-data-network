import { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { ConcreteRequest } from 'relay-runtime';

import loadSerializableQuery, { SerializablePreloadedQuery } from '@/relay/loadSerializableQuery';

import getAllMaterialpassportsNode, {
    getAllMaterialpassportsQuery
} from '../../__generated__/relay/getAllMaterialpassportsQuery.graphql';
import Header from './header';

const Materialpassports: NextPage = () => {
  // console.log('Materialpassports index.tsx')
  const [preloadedQuery, setPreloadedQuery] = useState<SerializablePreloadedQuery<ConcreteRequest, getAllMaterialpassportsQuery> | null>(null)
  useEffect(() => {
    console.log('useEffect')
    const fetchQuery = async () => {
      const query = await loadSerializableQuery<typeof getAllMaterialpassportsNode, getAllMaterialpassportsQuery>(
        getAllMaterialpassportsNode.params,
        {
          first: 100,
          after: null,
        }
      )
      // console.log(query.response.data.materialpassportIndex.edges)

      setPreloadedQuery(() => query)
    }
    fetchQuery()
  }, [])

  // console.log(preloadedQuery?.response.data.materialpassportIndex.edges)

  return preloadedQuery ? <Header preloadedQuery={preloadedQuery} /> : null
}

export default Materialpassports

export const revalidate = 0
