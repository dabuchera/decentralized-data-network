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
  const [preloadedQueryMaterialpassports, setPreloadedQueryMaterialpassports] = useState<SerializablePreloadedQuery<ConcreteRequest, getAllMaterialpassportsQuery> | null>(null)
  // console.log(Materialpassports)
  // console.log(preloadedQuery)
  useEffect(() => {
    console.log('useEffect')
    const fetchQuery = async () => {
      const queryMaterialpassport = await loadSerializableQuery<typeof getAllMaterialpassportsNode, getAllMaterialpassportsQuery>(
        getAllMaterialpassportsNode.params,
        {
          first: 100,
          after: null,
        }
      )
      // console.log(query.response.data.materialpassportIndex.edges[0].node.name)

      setPreloadedQueryMaterialpassports(() => queryMaterialpassport)
    }
    fetchQuery()
  }, [])

  console.log(preloadedQueryMaterialpassports?.response.data.materialpassportIndex.edges.length)

  return preloadedQueryMaterialpassports ? <Header preloadedQueryMaterialpassports={preloadedQueryMaterialpassports} /> : null
}

export default Materialpassports

export const revalidate = 0
