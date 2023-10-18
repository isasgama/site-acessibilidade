import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 10px;
  height: 120vh;

  @media (max-width: 800px) {
    height: 90vh;
  }

  @media (max-width: 480px) {
    height: 130vh;
  }
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  max-width: 400px;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 1px 2px #0008;
`;

const Label = styled.label`
  font-size: 16px;
  font-weight: 600;
  color: #000000;
`;

const CardItem = styled.div`
  margin: 10px 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  border-bottom: 1px solid #ccc;
  padding: 10px 0;
`;

function EnderecosCadastrados() {
  const [result, setResult] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3002")
      .then((res) => res.json())
      .then((data) => {
        setResult(data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <Container className="results">
      <Card>
        <Label className="title_results">Endereços Cadastrados</Label>
        {result.map((item, index) => (
          <CardItem key={index}>
            <Label className="p_results">Nome</Label>
            <p className="product_result">{item.EstabelecimentoName}</p>
            <Label className="p_results">Endereço</Label>
            <p className="product_result">{item.Endereco}</p>
            <Label className="p_results">Acessibilidade</Label>
            <p className="product_result">{item.Acessibilidade}</p>
            <Label className="p_results">Telefone</Label>
            <p className="product_result">{item.Telefone}</p>
            <div className="div_buttons_results">
              <Link to={`/modify/${item.EstabelecimentoID}`}>
                <button className="modify_results">Alterar Local</button>
              </Link>
            </div>
          </CardItem>
        ))}
      </Card>
    </Container>
  );
}

export default EnderecosCadastrados;



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


              {/* <button
                name={item.EstabelecimentoID}
                onClick={handleDelete}
                className="delete_results"
              >
                Excluir
              </button> */}