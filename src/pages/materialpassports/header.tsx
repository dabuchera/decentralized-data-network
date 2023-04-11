import { useRelayEnvironment } from 'react-relay';

import { SerializablePreloadedQuery } from '@/relay/loadSerializableQuery';
import useSerializablePreloadedQuery from '@/relay/useSerializablePreloadedQuery';

import getAllPersonalMaterialpassportsQueryNode, {
    getAllPersonalMaterialpassportsQuery
} from '../../__generated__/relay/getAllPersonalMaterialpassportsQuery.graphql';
import Main from './main';

export default function Header(props: {
  preloadedQueryMaterialpassports: SerializablePreloadedQuery<typeof getAllPersonalMaterialpassportsQueryNode, getAllPersonalMaterialpassportsQuery>
}) {

  const queryRefMaterialpassports = useSerializablePreloadedQuery(useRelayEnvironment(), props.preloadedQueryMaterialpassports)
  // console.log('Materialpassports header.tsx')
  return <Main queryRefMaterialpassports={queryRefMaterialpassports} />
}
