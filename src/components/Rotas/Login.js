import React, { useState } from 'react';
import styled from 'styled-components';

const LoginPage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const GraySquare = styled.div`
  background-color: #f5f5f5; /* Fundo cinza */
  border-radius: 10px;
  padding: 50px;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.5);
  text-align: center;
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

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Implemente a lógica de login aqui
  };

  return (
    <LoginPage>
        <GraySquare>
          <LoginTitle>Login</LoginTitle>
          <InputField>
            <InputLabel htmlFor="username">Nome de Usuário ou E-mail</InputLabel>
            <Input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              aria-label="Nome de Usuário ou E-mail"
            />
          </InputField>
          <InputField>
            <InputLabel htmlFor="password">Senha</InputLabel>
            <Input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              aria-label="Senha"
            />
          </InputField>
          <Button onClick={handleLogin}>Entrar</Button>
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
