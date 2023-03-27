// import React from 'react'
// import { useLazyLoadQuery, graphql } from 'react-relay'

// const MaterialpassportFragment = graphql`
//   fragment Materialpassports_materialpassport on Materialpassport {
//     id
//     name
//     completed
//   }
// `;

// const MaterialpassportsQuery = graphql`
//   query MaterialpassportsQuery {
//     materialpassportIndex(first : 10) @connection(key: "Materialpassports_materialpassportIndex") {
//       edges {
//         node {
//           ...Materialpassports_materialpassport
//         }
//       }
//     }
//   }
// `

// function Materialpassports() {
//   // @ts-ignore
//   const { materialpassportIndex } = useLazyLoadQuery(MaterialpassportsQuery, {})

//   console.log(materialpassportIndex)

//   return (
//     <ul>
//       {materialpassportIndex ? (
//         <>
//           {materialpassportIndex.edges.map(({ node }) => (
//             <li key={node.id}>
//               <h2>{node.name}</h2>
//               <p>Completed: {node.completed ? 'Yes' : 'No'}</p>
//             </li>
//           ))}
//         </>
//       ) : (
//         <></>
//       )}
//     </ul>
//   )
// }

// export default Materialpassports
