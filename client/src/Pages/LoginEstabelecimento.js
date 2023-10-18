import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import styled from "styled-components";
import Input from "../components/Input";
import useAuth from "../Hooks/useAuth";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 10px;
  height: 100vh;
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

const LabelSignup = styled.label`
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

const LoginEstabelecimento = () => {
  const { signinEstablishment } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    if (!email | !senha) {
      setError("Preencha todos os campos");
      return;
    }

    const res = signinEstablishment(email, senha);

    if (res) {
      setError(res);
      return;
    }

    navigate("/estabelecimento");
  };

  return (
    <Container>
      <Label>Olá, seja bem vindo(a)!</Label>
      <Label>Informe abaixo seus dados de acesso</Label>
      <Label>para a conta do Estabelecimento:</Label>
      <Content>
        <Input
          type="email"
          placeholder="Digite seu e-mail"
          value={email}
          onChange={(e) => [setEmail(e.target.value), setError("")]}
        />
        <Input
          type="password"
          placeholder="Digite sua senha"
          value={senha}
          onChange={(e) => [setSenha(e.target.value), setError("")]}
        />
        <labelError>{error}</labelError>
        <Button Text="Entrar" onClick={handleLogin} />
        <LabelSignup>
          Não tem uma conta?
          <Strong>
            <Link to="/cadastro-estabelecimento">&nbsp;Registre-se</Link>
          </Strong>
        </LabelSignup>
      </Content>
    </Container>
  );
};

export default LoginEstabelecimento;