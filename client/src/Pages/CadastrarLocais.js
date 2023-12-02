import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import styled from "styled-components";
import { Link } from "react-router-dom";


const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 10px;
  height: 90vh;

  @media (max-width: 600px) {
    align-items: center; /* Centralizar verticalmente em telas menores */
    flex-direction: column; /* Empilhar os cards verticalmente em telas menores */
    max-width: 100%;
    margin: auto;
  }
`;

const Content = styled.div`
  gap: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  box-shadow: 0 1px 2px #0008;
  background-color: white;
  max-width: 350px;
  padding: 20px;
  border-radius: 5px;
  `;

const Label = styled.label`
  font-size: 16px;
  font-weight: 600;
  color: #000000;
`;

const Input = styled.input`
  outline: none;
  padding: 16px 20px;
  width: 90%;
  border-radius: 5px;
  font-size: 16px;
  margin: 2px;

  background-color: #f0f2f5;
  border: none;
`;

const Button = styled.button`
  padding: 16px 20px;
  outline: none;
  border: none;
  border-radius: 5px;
  width: 100%;
  cursor: pointer;
  background-color: #046ee5;
  color: white;
  font-weight: 600;
  font-size: 16px;
  max-width: 350px;
  margin: 5px;
`;

export const Title = styled.h2``;

function CadastrarLocais() {
  // Guarda as informações do formulário para enviar ao backend.
  const [result, setResult] = useState([]);
  const [dataToInsert, setDataToInsert] = useState({
    EstabelecimentoName: "",
    Endereco: "",
    Acessibilidade: "",
    Telefone: "",
    Latitude: "",
    Longitude: "", 
  });
  const [redirected, setRedirected] = useState(true);
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
            setRedirected(false);
            navigate("/estabelecimento");
          }
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  // Envia as informações para o backend quando o botão de enviar é clicado.
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("entrou na função");

    // Obter coordenadas do endereço usando a API de Geocodificação
    const address = `${dataToInsert.Endereco}`;
    const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;
    const geocodingUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;

    try {
      const response = await fetch(geocodingUrl);
      const data = await response.json();

      if (data.results.length > 0) {
          const location = data.results[0].geometry.location;
          setDataToInsert((prevState) => ({
              ...prevState,
              Latitude: location.lat,
              Longitude: location.lng,
          }));

          // Verificar se as coordenadas foram atualizadas corretamente
          console.log("Novas coordenadas:", location.lat, location.lng);

          // Aguardar a conclusão da obtenção das coordenadas antes de enviar as informações para o backend
          if (location.lat && location.lng) {
              await createOrUpdateData();
          } else {
              console.error("As coordenadas não foram obtidas corretamente.");
          }
      }
  } catch (error) {
      console.error("Erro ao obter coordenadas:", error);
  }
};

// Função para criar ou atualizar os dados no backend
const createOrUpdateData = async () => {
  const foundItem = result.find(
      (item) => window.location.pathname === `/modify/${item.EstabelecimentoID}`
  );

  if (foundItem) {
      console.log("entrou no if");
      await fetch(`http://localhost:3002/${foundItem.EstabelecimentoID}`, {
          method: "PUT",
          body: JSON.stringify(dataToInsert),
          headers: { "Content-Type": "application/json" },
      });
      navigate("/");
  } else {
      await fetch("http://localhost:3002", {
          method: "POST",
          body: JSON.stringify(dataToInsert),
          headers: { "Content-Type": "application/json" },
      });
      console.log(dataToInsert);
  }
};
  // Armazena as informações no estado conforme são digitados.
  const handleChange = (e) => {
    console.log("handleChange chamado");
    setDataToInsert({
      ...dataToInsert,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Container>
      <Content>
      <Label> CADASTRE SEU LOCAL COM ACESSIBILIDADE </Label>
      <form onSubmit={(e) => handleSubmit(e)} className="form">
        <Input
          className="form_input"
          type="text"
          value={dataToInsert.EstabelecimentoName}
          name="EstabelecimentoName"
          onChange={handleChange}
          placeholder="Nome do Estabelecimento"
          required
          autoComplete="none"
        />
        <Input
          className="form_input"
          type="text"
          value={dataToInsert.Endereco}
          name="Endereco"
          onChange={handleChange}
          placeholder="Endereço"
          required
          autoComplete="none"
        />
        <Input
          className="form_input"
          type="text"
          value={dataToInsert.Acessibilidade}
          name="Acessibilidade"
          onChange={handleChange}
          placeholder="Acessibilidade"
          required
          autoComplete="none"
        />
        <Input
          className="form_input"
          type="text"
          value={dataToInsert.Telefone}
          name="Telefone"
          onChange={handleChange}
          placeholder="Telefone"
          required
          autoComplete="none"
        />
        <Button Text="Save" className="form_button">Save</Button>    
      </form>
      <Link to="/estabelecimento">&nbsp;Voltar</Link>
      </Content>
    </Container>
  );
}

export default CadastrarLocais;