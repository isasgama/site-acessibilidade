import React from 'react';
import styled from 'styled-components';

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 2rem;
`;

const WelcomeMessage = styled.h2`
  font-size: 24px;
  margin: 1rem 0;
`;

const HomeUser = ({ user }) => {
  return (
    <HomeContainer>
      <WelcomeMessage>Bem-vindo, {user.name}!</WelcomeMessage>
      {/* Outros conteúdos da página inicial aqui */}
    </HomeContainer>
  );
};

export default HomeUser;
