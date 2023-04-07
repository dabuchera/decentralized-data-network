import { getAllComponentsQuery$data } from '@/__generated__/relay/getAllComponentsQuery.graphql';
import {
    getAllMaterialpassportsQuery$data
} from '@/__generated__/relay/getAllMaterialpassportsQuery.graphql';
import { Actor, Component, FunctionalLayer, LCP, Materialpassport } from '@/types';

export function processMaterialpassports(dataMP: getAllMaterialpassportsQuery$data, page: number) {
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

  const totalCountMP = nativeMaterialpassports?.length || 0
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

  const components: Component[] = new Array()

  return { materialpassports: materialpassports, totalCountMP: totalCountMP, components: components }
}

export function processComponents(dataCP: getAllComponentsQuery$data, page: number) {
  //*********************** Components ***********************//
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
  const totalCountCP = nativeComponents?.length || 0
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

  return { components: components, totalCountCP: totalCountCP }
}

//   //*********************** Components ***********************//
//   // Not used yet -> Could be added to Return
//   const nativeComponents = dataCP.componentIndex?.edges?.map((edge) => edge?.node)
//   const pageInfoCP = dataCP.componentIndex?.pageInfo

//   const startIndexCP = (page - 1) * 5 // Assuming 5 items per page
//   const endIndexCP = startIndexCP + 5

//   /*We add a check for nativeMaterialpassports before calling the slice and filter methods on it.
//    If nativeMaterialpassports is falsy, we set filteredNativeMaterialpassports to an empty array.*/
//   const filteredNativeComponents = nativeComponents
//     ? nativeComponents
//         .slice(startIndexCP, endIndexCP)
//         // Filter out null values
//         .filter((component) => component !== null)
//     : []
//   const totalCount = nativeComponents?.length
//   const components: Component[] = filteredNativeComponents.map((component) => {
//     const functionalLayer = component?.functionalLayer || FunctionalLayer.EMPTY // Set a default value if functionalLayer is empty string
//     const actor = component?.actor || Actor.EMPTY // Set a default value if actor is empty string
//     const lifecyclephase = component?.lifecyclephase || LCP.EMPTY // Set a default value if functionalLayer is empty string

//     return {
//       id: component?.id ?? '',
//       author_id: component?.author?.id ?? '',
//       mpID: component?.mpID ?? '',
//       name: component?.name ?? '',

//       functionalLayer: functionalLayer as FunctionalLayer,
//       actor: actor as Actor,
//       lifecyclephase: lifecyclephase as LCP,

//       attributes: JSON.parse(component?.attributes as string) ?? '',

//       created: component?.created ?? '',
//       version: component?.version ?? '',
//     }
//   })

//   return { materialpassports: materialpassports, components: components, isFetching, error }
