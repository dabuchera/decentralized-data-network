// import React, { useState } from 'react';
// import { useLazyLoadQuery, graphql } from 'react-relay';

// const MaterialpassportFragment = graphql`
//   fragment MaterialpassportsPaginator_materialpassport on Materialpassport {
//     id
//     name
//     completed
//   }
// `;

// const MaterialpassportsPaginatorQuery = graphql`
//   query MaterialpassportsPaginatorQuery($first: Int!, $after: String) {
//     materialpassportIndex(first: $first, after: $after) @connection(key: "Materialpassports_materialpassportIndex") {
//       pageInfo {
//         endCursor
//         hasNextPage
//       }
//       edges {
//         node {
//           ...MaterialpassportsPaginator_materialpassport
//         }
//       }
//     }
//   }
// `;

// function Materialpassports() {
//   const [first, setFirst] = useState(10); // number of items to fetch per page
//   const [after, setAfter] = useState(null); // cursor for pagination

//   const { materialpassportIndex } = useLazyLoadQuery(MaterialpassportsPaginatorQuery, { first, after });

//   const handleLoadMore = () => {
//     const { endCursor } = materialpassportIndex.pageInfo;
//     setAfter(endCursor);
//     setFirst(first + 10); // increase the number of items to fetch by 10
//   };

// //   const test = () => {
// //     console.log(first)
// //   };


//   return (
//     <>
//       <ul>
//         {materialpassportIndex.edges.map(({ node }) => (
//           <li key={node.id}>
//             <h2>{node.name}</h2>
//             <p>Completed: {node.completed ? 'Yes' : 'No'}</p>
//           </li>
//         ))}
//       </ul>
//       {materialpassportIndex.pageInfo.hasNextPage && (
//         <button onClick={handleLoadMore}>Load More</button>
//       )}
//       <button onClick={test}>test</button>
//     </>
//   );
// }

// export default Materialpassports;