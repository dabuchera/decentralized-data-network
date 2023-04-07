import { useRelayEnvironment } from 'react-relay';

import { SerializablePreloadedQuery } from '@/relay/loadSerializableQuery';
import useSerializablePreloadedQuery from '@/relay/useSerializablePreloadedQuery';

import getAllComponentsQueryNode, {
    getAllComponentsQuery
} from '../../__generated__/relay/getAllComponentsQuery.graphql';
import Main from './main';

export default function Header(props: { preloadedQuery: SerializablePreloadedQuery<typeof getAllComponentsQueryNode, getAllComponentsQuery> }) {
  

  const queryRef = useSerializablePreloadedQuery(useRelayEnvironment(), props.preloadedQuery)
// console.log('Components header.tsx')
  return <Main queryRef={queryRef} />
}
