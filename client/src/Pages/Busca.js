// // App.js
// import React, { useState } from 'react';

// function Busca() {
//   const [data, setData] = useState([]);
//   const [name, setName] = useState('');
//   const [accessibility, setAccessibility] = useState('');

//   const fetchData = () => {
//     // Se nenhum filtro for fornecido, retorne sem buscar dados
//     if (!name && !accessibility) {
//         alert("Por favor, forneça pelo menos um filtro.");
//         return;
//     }

//     let url = `http://localhost:3002/`;

//     const params = new URLSearchParams();
//     if (name) params.append('name', name);
//     if (accessibility) params.append('accessibility', accessibility);

//     if (params.toString()) {
//       url += `?${params.toString()}`;
//     }

//     fetch(url)
//       .then((response) => response.json())
//       .then((data) => {
//         setData(data)
//       })
//       .catch((err) => {
//         console.error(err);
//       });
// };

//   return (
//     <div className="App">
//       <h1>Easy Access - Estabelecimentos</h1>

//       <div>
//         <input
//           type="text"
//           placeholder="Nome do Estabelecimento"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//         />

//         <select value={accessibility} onChange={(e) => setAccessibility(e.target.value)}>
//           <option value="">Todas Acessibilidades</option>
//           <option value="Acessível">Acessível</option>
//           <option value="Não Acessível">Não Acessível</option>
//           {/* Adicione mais opções conforme necessário */}
//         </select>

//         <button onClick={fetchData}>Filtrar</button>
//       </div>

//       <ul>
//         {data.map((item) => (
//           <li key={item.EstabelecimentoID}>
//             <strong>{item.EstabelecimentoName}</strong><br />
//             Endereço: {item.Endereco}<br />
//             Acessibilidade: {item.Acessibilidade}<br />
//             Telefone: {item.Telefone}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default Busca;
