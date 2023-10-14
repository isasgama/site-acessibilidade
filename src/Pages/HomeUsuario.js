import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from "styled-components";
import useAuth from '../Hooks/useAuth';
import ButtonLogin from '../components/Button';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100vh;
  gap: 20px;
`;

export const Title = styled.h2``;

const HomeUser = () => {
  const { signout } = useAuth();
  const navigate = useNavigate();

  return (
    <Container>
      <Title>Home</Title>
      <ButtonLogin Text="Sair" onClick={() => [signout(), navigate("/")]}>
        Sair
      </ButtonLogin>
    </Container>
  );
};

export default HomeUser;
