import { useLazyLoadQuery, useFragment, graphql, GraphQLTaggedNode } from 'react-relay';
import { useCallback, useState } from 'react';

export default function useCustomPagination(fragmentNode, fragmentRef, query, count) {
  const [cursor, setCursor] = useState(null);
  const { hasNextPage, endCursor } = useFragment(fragmentNode, fragmentRef).pageInfo;
  const [hasNext, setHasNext] = useState(hasNextPage);
  
  const loadNext = useCallback(() => {
    if (hasNextPage) {
      setCursor(endCursor);
      setHasNext(false);
    }
  }, [hasNextPage, endCursor]);

  const data = useLazyLoadQuery(
    query,
    {
      cursor,
      count,
    },
    {
      fetchPolicy: 'store-or-network',
    },
  );

  return { data: data.materialpassportIndex, hasNext, loadNext };
}