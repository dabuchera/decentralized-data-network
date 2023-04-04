import { useRelayEnvironment } from 'react-relay';

import { SerializablePreloadedQuery } from '@/relay/loadSerializableQuery';
import useSerializablePreloadedQuery from '@/relay/useSerializablePreloadedQuery';

import getAllMaterialpassportsQueryNode, {
    getAllMaterialpassportsQuery
} from '../../__generated__/relay/getAllMaterialpassportsQuery.graphql';
import Main from './main';

export default function Header(props: {
  preloadedQuery: SerializablePreloadedQuery<typeof getAllMaterialpassportsQueryNode, getAllMaterialpassportsQuery>
}) {
  // console.log('Materialpassports header.tsx')
  // console.log(props.preloadedQuery.response.data.materialpassportIndex.edges)
  let queryRef = useSerializablePreloadedQuery(useRelayEnvironment(), props.preloadedQuery)

  return <Main queryRef={queryRef} />
}
