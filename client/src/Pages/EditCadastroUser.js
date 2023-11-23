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

const EditarCadastroUsuario = () => {
  const { updateUser, getUserData} = useAuth();

  const [usuario, setUsuario] = useState({
    email: "",
    enderecoUser: "",
    nome: "",
    telefone: ""
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

    const dadosAtuais = getUserData();

    // Chama a função de atualização do estabelecimento
    updateUser(
      dadosAtuais.email,
      usuario.enderecoUser || dadosAtuais.enderecoUser,
      usuario.telefone || dadosAtuais.telefone,
      usuario.nome || dadosAtuais.nome
    );

    alert("Cadastro atualizado com sucesso!");
  };

  return (
    <Container>
      <h2>Dados Cadastrais:</h2>
      
      {/* Exibir os dados atuais acima do formulário */}
      <div>
        <p>Email: {getUserData().email}</p>
        <p>Endereço: {getUserData().enderecoUser}</p>
        <p>Nome: {getUserData().nome}</p>
        <p>Telefone: {getUserData().telefone}</p>
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
        <Label htmlFor="enderecoUser">Endereço:</Label>
        <Input
          type="enderecoUser"
          id="enderecoUser"
          name="enderecoUser"
          value={usuario.enderecoUser}
          onChange={handleChange}
        />
        <Label htmlFor="telefone">Telefone:</Label>
        <Input
          type="telefone"
          id="telefone"
          name="telefone"
          value={usuario.telefone}
          onChange={handleChange}
        />
        <Label htmlFor="nome">Nome:</Label>
        <Input
          type="nome"
          id="nome"
          name="nome"
          value={usuario.nome}
          onChange={handleChange}
        />
        <Button type="submit">Salvar</Button>
      </Form>
    </Container>
  );
};

export default EditarCadastroUsuario;
