import React, { useState } from "react";
import InputLogin from "../components/Input";
import ButtonLogin from "../components/Button";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 10px;
  height: 100vh;

  @media (max-width: 800px) {
    height: 100vh;
  }
  
  @media (max-width: 480px) {
    height: 90vh;
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
  font-size: 18px;
  font-weight: 600;
  color: #000000;
`;

const LabelSignin = styled.label`
  font-size: 16px;
  color: #676767;
`;

const labelError = styled.label`
  font-size: 14px;
  color: red;
`;

const Strong = styled.strong`
  cursor: pointer;

  a {
    text-decoration: none;
    color: #676767;
  }
`;

const Select = styled.select`
    outline: none;
    padding: 16px 20px;
    width: 100%;
    border-radius: 5px;
    font-size: 16px;

    background-color: #f0f2f5;
    border: none;
`;

const Signup = () => {
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [enderecoUsuario, setenderecoUsuario] = useState("");
  const [email, setEmail] = useState("");
  const [emailConf, setEmailConf] = useState("");
  const [senha, setSenha] = useState("");
  // const [selectedOptionAcessibilidade, setSelectedOptionAcessibilidade] = useState('');
  const [customOption, setCustomOption] = useState('');
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const { signup } = useAuth();

  const handleSignup = () => {
    if (!email | !emailConf | !senha | !nome | !enderecoUsuario) {
      setError("Preencha todos os campos");
      return;
    } else if (email !== emailConf) {
      setError("Os e-mails não são iguais");
      return;
    }

    const res = signup(email, senha);

    if (res) {
      setError(res);
      return;
    }

    alert("Usuário cadatrado com sucesso!");
    navigate("/");
  };

  // const handleSelectChange = (e) => {
  //   const selectedValue = e.target.value;
  //   if (selectedValue === 'Outra') {
  //     // Se o usuário selecionar "Outra", exibe o campo de texto.
  //     setCustomOption('');
  //   }
  //   setSelectedOptionAcessibilidade(selectedValue);
  // };

  return (
    <Container>
      <Label>CADASTRE-SE</Label>
      <Content>
        <InputLogin
          type="nome"
          placeholder="Digite seu Nome"
          value={nome}
          onChange={(e) => [setNome(e.target.value), setError("")]}
        />
        <InputLogin
          type="endereço"
          placeholder="Digite seu Endereço"
          value={enderecoUsuario}
          onChange={(e) => [setenderecoUsuario(e.target.value), setError("")]}
        />
        <InputLogin
          type="telefone"
          placeholder="Digite seu Telefone"
          value={telefone}
          onChange={(e) => [setTelefone(e.target.value), setError("")]}
        />
        {/* <Select value={selectedOptionAcessibilidade} onChange={handleSelectChange}>
          <option value="" disabled>Selecione o Tipo de Acessibilidade</option>
          <option value="Opção1">Acessibilidade arquitetônica</option>
          <option value="Opção2">Acessibilidade comunicacional</option>
          <option value="Opção3">Acessibilidade atitudinal</option>
          <option value="Outra">Outra</option>
        </Select>
        {selectedOptionAcessibilidade === 'Outra' && (
        <InputLogin
          type="text"
          placeholder="Descreva o Tipo de Acessibilidade"
          value={customOption}
          onChange={(e) => setCustomOption(e.target.value)}
        />)} */}
        <InputLogin
          type="email"
          placeholder="Digite seu E-mail"
          value={email}
          onChange={(e) => [setEmail(e.target.value), setError("")]}
        />
        <InputLogin
          type="email"
          placeholder="Confirme seu E-mail"
          value={emailConf}
          onChange={(e) => [setEmailConf(e.target.value), setError("")]}
        />
        <InputLogin
          type="password"
          placeholder="Digite sua Senha"
          value={senha}
          onChange={(e) => [setSenha(e.target.value), setError("")]}
        />
        <labelError>{error}</labelError>
        <ButtonLogin Text="Inscrever-se" onClick={handleSignup} />
        <LabelSignin>
          Já tem uma conta?
          <Strong>
            <Link to="/login">&nbsp;Entre</Link>
          </Strong>
        </LabelSignin>
        <LabelSignin>
          Cadastrar como estabelecimento?
          <Strong>
            <Link to="/cadastro-estabelecimento">&nbsp;Cadastre-se</Link>
          </Strong>
        </LabelSignin>
      </Content>
    </Container>
  );
};

export default Signup;