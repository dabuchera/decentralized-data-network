import { useEffect, useState } from 'react';
import { graphql, loadQuery, useLazyLoadQuery } from 'react-relay';

import { Actor, Component, FunctionalLayer, LCP, Materialpassport } from '@/types';

import {
    useStorageComponentsQuery as ComponentsType
} from '../../__generated__/relay/useStorageComponentsQuery.graphql';
import {
    useStorageMaterialpassportsQuery as MaterialpassportsType
} from '../../__generated__/relay/useStorageMaterialpassportsQuery.graphql';

//*********************** Materialpassports ***********************//
const MaterialpassportFragment = graphql`
  fragment useStorage_materialpassport on Materialpassport {
    id
    author {
      id
    }
    version
    name
    created
    completed
  }
`

const useStorageMaterialpassportsQuery = graphql`
  query useStorageMaterialpassportsQuery($first: Int!, $after: String) {
    materialpassportIndex(first: $first, after: $after) @connection(key: "useStorage_materialpassportIndex") {
      pageInfo {
        endCursor
        hasNextPage
      }
      edges {
        node {
          id
          author {
            id
          }
          version
          name
          created
          completed
          ...useStorage_materialpassport
        }
      }
    }
  }
`

//*********************** Components ***********************//
const ComponentFragment = graphql`
  fragment useStorage_component on Component {
    id
    author {
      id
    }
    mpID
    mp {
      id
      name
    }
    name
    functionalLayer
    actor
    lifecyclephase
    attributes
    created
    version
  }
`

const useStorageComponentsQuery = graphql`
  query useStorageComponentsQuery($first: Int!, $after: String) {
    componentIndex(first: $first, after: $after) @connection(key: "useStorage_componentIndex") {
      pageInfo {
        endCursor
        hasNextPage
      }
      edges {
        node {
          id
          author {
            id
          }
          mpID
          mp {
            id
            name
          }
          name
          functionalLayer
          actor
          lifecyclephase
          attributes
          created
          version
          ...useStorage_component
        }
      }
    }
  }
`

export const useStorage = (page: number, reloadCount: number) => {
  console.log('Hook useStorage')
  const [isFetching, setIsFetching] = useState(true)
  const [error, setError] = useState(null)

  const dataMP = useLazyLoadQuery<MaterialpassportsType>(
    useStorageMaterialpassportsQuery,
    {
      first: 100,
      //   after: (page - 1) * 10,
      after: null,
    },
    {
      fetchPolicy: 'network-only', // Choose the appropriate fetch policy
    }
  )

  useEffect(() => {
    // Execute this function when the component is mounted or when `dataCP` changes
    // console.log('Data loaded:', dataCP);
    // console.log('Data loaded:', dataCP);
    if (dataMP && dataCP) {
      setTimeout(() => {
        setIsFetching(false)
      }, 2000)
    }
  }, [dataMP])

  const dataCP = useLazyLoadQuery<ComponentsType>(
    useStorageComponentsQuery,
    {
      first: 100,
      //   after: (page - 1) * 10,
      after: null,
    },
    {
      fetchPolicy: 'network-only', // Choose the appropriate fetch policy
    }
  )

  useEffect(() => {
    // Execute this function when the component is mounted or when `dataCP` changes
    // console.log('Data loaded:', dataCP);
    if (dataMP && dataCP) {
      setTimeout(() => {
        setIsFetching(false)
      }, 2000)
    }
  }, [dataCP])

  // useEffect(() => {
  //   // console.log('page changed')
  //   setIsFetching(true)
  //   setTimeout(() => {
  //     setIsFetching(false)
  //   }, 1000)
  // }, [page])

  //*********************** Materialpassports ***********************//
  // Not used yet -> Could be added to Return
  const nativeMaterialpassports = dataMP.materialpassportIndex?.edges?.map((edge) => edge?.node)
  const pageInfoMP = dataMP.materialpassportIndex?.pageInfo

  const startIndexMP = (page - 1) * 5 // Assuming 5 items per page
  const endIndexMP = startIndexMP + 5
  // const filteredNativeMaterialpassports = nativeMaterialpassports?.slice(startIndexMP, endIndexMP)

  /*We add a check for nativeMaterialpassports before calling the slice and filter methods on it.
   If nativeMaterialpassports is falsy, we set filteredNativeMaterialpassports to an empty array.*/
  const filteredNativeMaterialpassports = nativeMaterialpassports
    ? nativeMaterialpassports
        .slice(startIndexMP, endIndexMP)
        // Filter out null values
        .filter((materialpassport) => materialpassport !== null)
    : []

  const totalCountMP = nativeMaterialpassports?.length
  const materialpassports: Materialpassport[] = filteredNativeMaterialpassports.map((materialpassport) => {
    return {
      id: materialpassport?.id ?? '',
      author_id: materialpassport?.author?.id ?? '',
      name: materialpassport?.name ?? '',
      completed: materialpassport?.completed ?? false,
      created: materialpassport?.created ?? '',
      version: materialpassport?.version ?? '',
    }
  })

  //*********************** Components ***********************//
  // Not used yet -> Could be added to Return
  const nativeComponents = dataCP.componentIndex?.edges?.map((edge) => edge?.node)
  const pageInfoCP = dataCP.componentIndex?.pageInfo

  const startIndexCP = (page - 1) * 5 // Assuming 5 items per page
  const endIndexCP = startIndexCP + 5

  /*We add a check for nativeMaterialpassports before calling the slice and filter methods on it.
   If nativeMaterialpassports is falsy, we set filteredNativeMaterialpassports to an empty array.*/
  const filteredNativeComponents = nativeComponents
    ? nativeComponents
        .slice(startIndexCP, endIndexCP)
        // Filter out null values
        .filter((component) => component !== null)
    : []
  const totalCount = nativeComponents?.length
  const components: Component[] = filteredNativeComponents.map((component) => {
    const functionalLayer = component?.functionalLayer || FunctionalLayer.EMPTY // Set a default value if functionalLayer is empty string
    const actor = component?.actor || Actor.EMPTY // Set a default value if actor is empty string
    const lifecyclephase = component?.lifecyclephase || LCP.EMPTY // Set a default value if functionalLayer is empty string

    return {
      id: component?.id ?? '',
      author_id: component?.author?.id ?? '',
      mpID: component?.mpID ?? '',
      name: component?.name ?? '',

      functionalLayer: functionalLayer as FunctionalLayer,
      actor: actor as Actor,
      lifecyclephase: lifecyclephase as LCP,

      attributes: JSON.parse(component?.attributes as string) ?? '',

      created: component?.created ?? '',
      version: component?.version ?? '',
    }
  })

  return { materialpassports: materialpassports, components: components, isFetching, error }
}
