import { useRelayEnvironment } from 'react-relay';

import { SerializablePreloadedQuery } from '@/relay/loadSerializableQuery';
import useSerializablePreloadedQuery from '@/relay/useSerializablePreloadedQuery';

import getAllMaterialpassportsQueryNode, {
    getAllMaterialpassportsQuery
} from '../../__generated__/relay/getAllMaterialpassportsQuery.graphql';
import getAllPersonalComponentsQueryNode, {
    getAllPersonalComponentsQuery
} from '../../__generated__/relay/getAllPersonalComponentsQuery.graphql';
import Main from './main';

export default function Header(props: {
  preloadedQueryComponents: SerializablePreloadedQuery<typeof getAllPersonalComponentsQueryNode, getAllPersonalComponentsQuery>
  preloadedQueryMaterialpassports: SerializablePreloadedQuery<typeof getAllMaterialpassportsQueryNode, getAllMaterialpassportsQuery>
}) {
  const queryRefComponents = useSerializablePreloadedQuery(useRelayEnvironment(), props.preloadedQueryComponents)
  const queryRefMaterialpassports = useSerializablePreloadedQuery(useRelayEnvironment(), props.preloadedQueryMaterialpassports)
  // console.log('Components header.tsx')
  return <Main queryRefComponents={queryRefComponents} queryRefMaterialpassports={queryRefMaterialpassports} />
}
