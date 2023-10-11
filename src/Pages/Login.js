import React, { useState } from 'react';
import styled from 'styled-components';
import useAuth from '../Hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const LoginPage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const GraySquare = styled.div`
  background-color: #f5f5f5; /* Fundo cinza */
  border-radius: 10px;
  padding: 2%; /* Use uma unidade de medida relativa, como porcentagem */
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.5);
  text-align: center;
  width: 80%; /* Use uma largura relativa para manter a adaptabilidade */
  max-width: 400px; /* Defina uma largura máxima para evitar que o conteúdo fique muito largo em telas grandes */
`;

const LoginTitle = styled.h2`
  font-size: 32px;
  margin-bottom: 20px;
  color: #007bff; /* Cor do texto azul */
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
`;

const InputField = styled.div`
  margin-bottom: 20px;
  text-align: center;
`;

const InputLabel = styled.label`
  display: block;
  margin-bottom: 5px;
  font-size: 16px;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
`;

const Button = styled.button`
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 18px;
`;

const Login = () => {
  const { signin } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    if (!email | !senha) {
      setError("Preencha todos os campos");
      return;
    }

    const res = signin(email, senha);

    if (res) {
      setError(res);
      return;
    }

    navigate("/home");
  };

  return (
    <LoginPage>
      <GraySquare>
        <LoginTitle>Login</LoginTitle>
        <form>
          <InputField>
            <InputLabel htmlFor="username">Usuário ou E-mail</InputLabel>
            <Input
              type="email"
              id="username"
              value={email}
              onChange={(e) => [setEmail(e.target.value), setError("")]}
              aria-label="Usuário ou E-mail"
              placeholder='Seu Email'
            />
          </InputField>
          <InputField>
            <InputLabel htmlFor="password">Senha</InputLabel>
            <Input
              type="password"
              id="password"
              value={senha}
              onChange={(e) => [setSenha(e.target.value), setError("")]}
              aria-label="Senha"
              placeholder='Senha'
            />
          </InputField>
          <Button type="submit" onClick={handleLogin}>Entrar</Button>
        </form>
        <p>
          <a href="/esqueci-senha" style={{ color: '#007bff' }}>
            Esqueci minha senha
          </a>{' '}
          |{' '}
          <a href="/cadastre-se" style={{ color: '#007bff' }}>
            Cadastre-se
          </a>
        </p>
      </GraySquare>
    </LoginPage>
  );
}

export default Login;
