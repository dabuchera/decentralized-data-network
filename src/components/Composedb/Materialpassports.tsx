// import React from 'react';
// import { usePaginationFragment, graphql } from 'react-relay';
// import useCustomPagination from './useCustomPagination';

// const materialpassportFragment = graphql`
//   fragment Materialpassports_materialpassport on Materialpassport {
//     id
//     name
//     completed
//   }
// `;

// export const materialpassportIndexFragment = graphql`
//   fragment Materialpassports_materialpassportIndex on MaterialpassportConnection
//   {
//     edges {
//       node {
//         ...Materialpassports_materialpassport
//       }
//     }
//     pageInfo {
//       hasNextPage
//       endCursor
//     }
//   }
// `;

// const materialpassportQuery = graphql`
//   query MaterialpassportsPaginationQuery($count: Int!, $cursor: String) {
//     materialpassportIndex(first: $count, after: $cursor) {
//       ...Materialpassports_materialpassportIndex
//     }
//   }
// `;

// export default function Materialpassports(props) {
//     console.log('materialpassportIndexFragment')
//     console.log(materialpassportIndexFragment)

//     console.log('props.materialpassportIndex')
//     console.log(props.materialpassportIndex)

//     console.log('materialpassportQuery')
//     console.log(materialpassportQuery)

//     const { data, hasNext, loadNext } = useCustomPagination(
//       materialpassportIndexFragment,
//       props.materialpassportIndex,
//       materialpassportQuery,
//       10
//     );
  
//     return (
//       <div>
//         <ul>
//           {data.edges.map(({ node }) => (
//             <li key={node.id}>
//               <h2>{node.name}</h2>
//               <p>Completed: {node.completed ? 'Yes' : 'No'}</p>
//             </li>
//           ))}
//         </ul>
//         {hasNext && (
//           <button onClick={() => loadNext()}>
//             Load More
//           </button>
//         )}
//       </div>
//     );
//   }
