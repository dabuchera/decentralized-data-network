import { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { ConcreteRequest } from 'relay-runtime';

import loadSerializableQuery, { SerializablePreloadedQuery } from '@/relay/loadSerializableQuery';

import getAllPersonalMaterialpassportsNode, {
    getAllPersonalMaterialpassportsQuery
} from '../../__generated__/relay/getAllPersonalMaterialpassportsQuery.graphql';
import Header from './header';

const Materialpassports: NextPage = () => {
  // console.log('Materialpassports index.tsx')
  const [preloadedQueryMaterialpassports, setPreloadedQueryMaterialpassports] = useState<SerializablePreloadedQuery<ConcreteRequest, getAllPersonalMaterialpassportsQuery> | null>(null)
  // console.log(Materialpassports)
  // console.log(preloadedQuery)
  useEffect(() => {
    console.log('useEffect')
    const fetchQuery = async () => {
      const queryMaterialpassport = await loadSerializableQuery<typeof getAllPersonalMaterialpassportsNode, getAllPersonalMaterialpassportsQuery>(
        getAllPersonalMaterialpassportsNode.params,
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

  console.log(preloadedQueryMaterialpassports?.response)
  console.log(preloadedQueryMaterialpassports?.response.data.viewer.materialpassportList.edges.length)

  return preloadedQueryMaterialpassports ? <Header preloadedQueryMaterialpassports={preloadedQueryMaterialpassports} /> : null
}

export default Materialpassports

export const revalidate = 0
