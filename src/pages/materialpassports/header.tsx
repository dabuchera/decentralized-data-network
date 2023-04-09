import { useRelayEnvironment } from 'react-relay';

import { SerializablePreloadedQuery } from '@/relay/loadSerializableQuery';
import useSerializablePreloadedQuery from '@/relay/useSerializablePreloadedQuery';

import getAllMaterialpassportsQueryNode, {
    getAllMaterialpassportsQuery
} from '../../__generated__/relay/getAllMaterialpassportsQuery.graphql';
import Main from './main';

export default function Header(props: {
  preloadedQueryMaterialpassports: SerializablePreloadedQuery<typeof getAllMaterialpassportsQueryNode, getAllMaterialpassportsQuery>
}) {

  const queryRefMaterialpassports = useSerializablePreloadedQuery(useRelayEnvironment(), props.preloadedQueryMaterialpassports)
  // console.log('Materialpassports header.tsx')
  return <Main queryRefMaterialpassports={queryRefMaterialpassports} />
}
