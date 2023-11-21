import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  gap: 10px;
  column-count: 5;
  column-width: 150px;
  column-gap: 20px;

  @media (max-width: 800px) {
    height: 90vh;
  }

  @media (max-width: 480px) {
    height: 130vh;
  }
  `;

const Card = styled.div`
  break-inside: avoid;
  page-break-inside: avoid;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  max-width: 400px;
  border-radius: 5px;
  box-shadow: 0 1px 2px #0008;
  width: 90%; /* Limitar a largura máxima */
  padding: 10px;
  margin: 0 0 1em 0;
`;

const Label = styled.label`
  font-size: 18px;
  font-weight: 600;
  color: #000000;
  `;

const CardItem = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  border-bottom: 1px solid #ccc;
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

  const handleDelete = (e) => {
    console.log(e.target.name);
    fetch("http://localhost:3002", {
      method: "DELETE",
      body: JSON.stringify({
        ["EstabelecimentoID"]: e.target.name,
      }),
      headers: { "Content-Type": "application/json" },
    });
    // Atualiza a página para atualizar os dados do bd.
    // window.location.reload();
  };

  return (
    <div>
      <h2 style={{ textAlign: "center" }}>Endereços Cadastrados</h2>
      <Container className="results">
        {result.map((item, index) => (
          <CardItem key={index}>
            <Card>
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
                <button
                  name={item.EstabelecimentoID}
                  onClick={handleDelete}
                  className="delete_results"
                >
                  Excluir
                </button>
              </div>
            </Card>
          </CardItem>
        ))}
      </Container>
    </div>
  );
}



export default EnderecosCadastrados;
