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
  height: auto;

  @media (max-width: 800px) {
    height: auto;
  }
  
  @media (max-width: 480px) {
    height: auto;
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

const SignupEstabelecimento = () => {
  const [nomeEstabelecimento, setNomeEstabelecimento] = useState("");
  const [enderecoEstabelecimento, setenderecoEstabelecimento] = useState("");
  const [emailEstabelecimento, setEmailEstabelecimento] = useState("");
  const [emailConf, setEmailConf] = useState("");
  const [senha, setSenha] = useState("");
  const [selectedOptionAcessibilidade, setSelectedOptionAcessibilidade] = useState('');
  const [customOption, setCustomOption] = useState('');
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const { signupEstablishment } = useAuth();

  const handleSignup = () => {
    if (!emailEstabelecimento | !emailConf | !senha | !nomeEstabelecimento | !enderecoEstabelecimento) {
      setError("Preencha todos os campos");
      return;
    } else if (emailEstabelecimento !== emailConf) {
      setError("Os e-mails não são iguais");
      return;
    }

    const res = signupEstablishment(emailEstabelecimento, senha);

    if (res) {
      setError(res);
      return;
    }

    alert("Usuário cadatrado com sucesso!");
    navigate("/login-estabelecimento");
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
          placeholder="Digite o Nome do Estabelecimento"
          value={nomeEstabelecimento}
          onChange={(e) => [setNomeEstabelecimento(e.target.value), setError("")]}
        />
        <InputLogin
          type="endereço"
          placeholder="Digite o Endereço do Estabelecimento"
          value={enderecoEstabelecimento}
          onChange={(e) => [setenderecoEstabelecimento(e.target.value), setError("")]}
        />
        {/* <Select value={selectedOptionAcessibilidade} onChange={handleSelectChange}>
          <option value="" disabled>Selecione Acessibilidade Atendida</option>
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
          value={emailEstabelecimento}
          onChange={(e) => [setEmailEstabelecimento(e.target.value), setError("")]}
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
      </Content>
    </Container>
  );
};

export default SignupEstabelecimento;