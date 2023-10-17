import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function EnderecosCadastrados() {
  // Guarda e atualiza as informações recebidas do backend.
  const [result, setResult] = useState([]);

  // Faz a solicitação das informações no backend quando a página é carrgada.
  useEffect(() => {
    fetch("http://localhost:3002")
      .then((res) => res.json())
      .then((data) => {
        setResult(data);
        console.log(data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

//   const handleDelete = (e) => {
//     console.log(e.target.name);
//     if (typeof window !== 'undefined' && window.confirm) {
//         if (window.confirm("Tem certeza que deseja excluir estas informações?")) {
//       // Se confirmar a pergunta anterior, envia as informações para o backend.
//       console.log("Informação excluída")};
//       fetch("http://localhost:3001", {
//         method: "DELETE",
//         body: JSON.stringify({
//           ["EstabelecimentoID"]: e.target.name,
//         }),
//         headers: { "Content-Type": "application/json" },
//       });
//       // Atualiza a página para atualizar os dados do bd.
//       window.location.reload();
//     } else {
//       console.log("Pedido de exclusão cancelado.");
//     }
//   };

  return (
    <div className="results">
      <h1 className="title_results">Endereços</h1>
      <section className="section_all_results">
        {result.map((item, index) => (
          <section key={index} className="section_individual_result">
            <article>
              <p className="p_results">Nome</p>
              <p className="product_result">{item.EstabelecimentoName}</p>
              <p className="p_results">Endereço</p>
              <p className="product_result">{item.Endereco}</p>
              <p className="p_results">Acessibilidade</p>
              <p className="product_result">{item.Acessibilidade}</p>
              <p className="p_results">Telefone</p>
              <p className="product_result">{item.Telefone}</p>
            </article>
            <div className="div_buttons_results">
              <Link to={`/modify/${item.EstabelecimentoID}`}>
                <button className="modify_results">Alterar Local</button>
              </Link>
              {/* <button
                name={item.EstabelecimentoID}
                onClick={handleDelete}
                className="delete_results"
              >
                Excluir
              </button> */}
            </div>
          </section>
        ))}
      </section>
    </div>
  );
}

export default EnderecosCadastrados;