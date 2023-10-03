import React, { useState } from 'react';
import styled from 'styled-components';

const ForgotPasswordPage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const GraySquare = styled.div`
  background-color: #f5f5f5;
  border-radius: 10px;
  padding: 50px;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.5);
  text-align: center;
`;

const PageTitle = styled.h2`
  font-size: 32px;
  margin-bottom: 20px;
  color: #007bff;
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

function ForgotPassword() {
  const [email, setEmail] = useState('');

  const handleResetPassword = () => {
    // Implemente a lógica para redefinir a senha aqui
  };

  return (
    <ForgotPasswordPage>
      <GraySquare>
        <PageTitle>Recuperar Senha</PageTitle>
        <InputField>
          <InputLabel htmlFor="email">E-mail</InputLabel>
          <Input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-label="E-mail"
          />
        </InputField>
        <Button onClick={handleResetPassword}>Redefinir Senha</Button>
        <p>
          <a href="/login/sign in" style={{ color: '#007bff' }}>
            Voltar ao Login
          </a>
        </p>
      </GraySquare>
    </ForgotPasswordPage>
  );
}

export default ForgotPassword;
