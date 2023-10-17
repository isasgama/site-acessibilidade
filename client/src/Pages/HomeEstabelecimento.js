import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import styled from "styled-components";
import useAuth from '../Hooks/useAuth';
import ButtonLogin from '../components/Button';
import EnderecosCadastrados from "./EnderecosCadastrados";

// export const Container = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   flex-direction: column;
//   height: 100vh;
//   gap: 20px;
// `;

export const Title = styled.h2``;

function HomeEstabelecimento() {
  // Guarda as informações do formulário para enviar ao backend.
  const [result, setResult] = useState([]);
  const [dataToInsert, setDataToInsert] = useState({
    EstabelecimentoName: "",
    Endereco: "",
    Acessibilidade: "",
    Telefone: "",
  });
  const [redirected, setRedirected] = useState(false);

  const navigate = useNavigate();

  //   Faz a solicitação das informações no backend quando a página é carregada.
  useEffect(() => {
    fetch("http://localhost:3002")
      .then((res) => res.json())
      .then((data) => {
        setResult(data);
        console.log(data)

        // Procura o item com o mesmo EstabelecimentoID que o pathname.
        const foundItem = data.find(
          (item) => window.location.pathname === `/modify/${item.EstabelecimentoID}`
        );

        if (foundItem) {
          setDataToInsert((prevState) => ({
            ...prevState,
            ...foundItem,
          }));
        } else {
          // Se não encontrar o item, redireciona para a página principal.
          if (!redirected) {
            setRedirected(true);
            navigate("/estabelecimento");
          }
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  // Envia as informações para o backend quando o botão de enviar é clicado.
  const handleSubmit = (e) => {
    const foundItem = result.find(
      (item) => window.location.pathname === `/modify/${item.EstabelecimentoID}`
    );
    if (foundItem) {
      fetch("http://localhost:3002", {
        method: "PUT",
        body: JSON.stringify(dataToInsert),
        headers: { "Content-Type": "application/json" },
      });
      navigate("/");
    } else {
      fetch("http://localhost:3002", {
        method: "POST",
        body: JSON.stringify(dataToInsert),
        headers: { "Content-Type": "application/json" },
      });
    }
  };
  // Armazena as informações no estado conforme são digitados.
  const handleChange = (e) => {
    setDataToInsert({
      ...dataToInsert,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="form_div">
      <form onSubmit={handleSubmit} className="form">
        <input
          className="form_input"
          type="text"
          value={dataToInsert.EstabelecimentoName}
          name="EstabelecimentoName"
          onChange={handleChange}
          placeholder="Estabelecimento Name"
          required
          autoComplete="none"
        />
        <input
          className="form_input"
          type="text"
          value={dataToInsert.Endereco}
          name="Endereco"
          onChange={handleChange}
          placeholder="Endereco"
          required
          autoComplete="none"
        />
        <input
          className="form_input"
          type="text"
          value={dataToInsert.Acessibilidade}
          name="Acessibilidade"
          onChange={handleChange}
          placeholder="Acessibilidade"
          required
          autoComplete="none"
        />
        <input
          className="form_input"
          type="text"
          value={dataToInsert.Telefone}
          name="Telefone"
          onChange={handleChange}
          placeholder="Telefone"
          required
          autoComplete="none"
        />
        <button className="form_button">Save</button>
      </form>
      <EnderecosCadastrados/>
    </div>
  );
}

export default HomeEstabelecimento;


{/* <Container>
<Title>Home Estabelecimento</Title>
<ButtonLogin Text="Sair" onClick={() => [signout(), navigate("/estabelecimento")]}>
  Sair
</ButtonLogin>
</Container> */}