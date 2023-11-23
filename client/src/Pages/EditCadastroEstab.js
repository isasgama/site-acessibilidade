// Importando as bibliotecas necessárias
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import useAuth from "../Hooks/useAuth";

// Estilizando os componentes com styled-components
const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  margin-bottom: 8px;
`;

const Input = styled.input`
  padding: 8px;
  margin-bottom: 16px;
`;

const Button = styled.button`
  padding: 16px 20px;
  outline: none;
  border: none;
  border-radius: 5px;
  width: 20%;
  cursor: pointer;
  background-color: #046ee5;
  color: white;
  font-weight: 600;
  font-size: 16px;
  max-width: 350px;
`;

const EditarCadastro = () => {
  const { updateEstablishment, getEstablishmentData} = useAuth();

  const [usuario, setUsuario] = useState({
    enderecoEstabelecimento: "",
    nomeEstabelecimento: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUsuario((prevUsuario) => ({
      ...prevUsuario,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const dadosAtuais = getEstablishmentData();

    // Chama a função de atualização do estabelecimento
    updateEstablishment(
      dadosAtuais.email,
      null, // Se não precisar atualizar a senha, passe null ou omita
      usuario.nomeEstabelecimento || dadosAtuais.nomeEstabelecimento,
      usuario.enderecoEstabelecimento || dadosAtuais.enderecoEstabelecimento
    );

    alert("Cadastro atualizado com sucesso!");
  };

  return (
    <Container>
      <h2>Dados Cadastrais:</h2>
      
      {/* Exibir os dados atuais acima do formulário */}
      <div>
        <p>Email: {getEstablishmentData().email}</p>
        <p>Endereço: {getEstablishmentData().enderecoEstabelecimento}</p>
        <p>Nome do Estabelecimento: {getEstablishmentData().nomeEstabelecimento}</p>
      </div>
      <h2>Editar Cadastro:</h2>
      <Form onSubmit={handleSubmit}>
        <Label htmlFor="email">Email:</Label>
        <Input
          type="email"
          id="email"
          name="email"
          value={usuario.email}
          onChange={handleChange}
          disabled // Impede que o campo de e-mail seja editável, já que não estamos permitindo alteração do e-mail
        />
        <Label htmlFor="enderecoEstabelecimento">Endereço:</Label>
        <Input
          type="enderecoEstabelecimento"
          id="enderecoEstabelecimento"
          name="enderecoEstabelecimento"
          value={usuario.enderecoEstabelecimento}
          onChange={handleChange}
        />
        <Label htmlFor="nomeEstabelecimento">Nome do Estabelecimento:</Label>
        <Input
          type="nomeEstabelecimento"
          id="nomeEstabelecimento"
          name="nomeEstabelecimento"
          value={usuario.nomeEstabelecimento}
          onChange={handleChange}
        />
        <Button type="submit">Salvar</Button>
      </Form>
    </Container>
  );
};

export default EditarCadastro;
