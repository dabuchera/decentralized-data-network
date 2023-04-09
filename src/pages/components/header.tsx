import { useRelayEnvironment } from 'react-relay';

import { SerializablePreloadedQuery } from '@/relay/loadSerializableQuery';
import useSerializablePreloadedQuery from '@/relay/useSerializablePreloadedQuery';

import getAllComponentsQueryNode, {
    getAllComponentsQuery
} from '../../__generated__/relay/getAllComponentsQuery.graphql';
import getAllMaterialpassportsQueryNode, {
    getAllMaterialpassportsQuery
} from '../../__generated__/relay/getAllMaterialpassportsQuery.graphql';
import Main from './main';

export default function Header(props: {
  preloadedQueryComponents: SerializablePreloadedQuery<typeof getAllComponentsQueryNode, getAllComponentsQuery>
  preloadedQueryMaterialpassports: SerializablePreloadedQuery<typeof getAllMaterialpassportsQueryNode, getAllMaterialpassportsQuery>
}) {
  const queryRefComponents = useSerializablePreloadedQuery(useRelayEnvironment(), props.preloadedQueryComponents)
  const queryRefMaterialpassports = useSerializablePreloadedQuery(useRelayEnvironment(), props.preloadedQueryMaterialpassports)
  // console.log('Components header.tsx')
  return <Main queryRefComponents={queryRefComponents} queryRefMaterialpassports={queryRefMaterialpassports} />
}
