import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

const HomeContainer = styled.div`
  background-color: #ffffff;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: #666;
`;

const TitleLarge = styled.h1`
  font-size: 48px;
  margin: 10px 0;
`;

const SubtitleSmall = styled.p`
  font-size: 18px;
`;

const CardsContainer = styled.div`
  display: flex;
  justify-content: space-around;
  width: 80%;
  margin-top: 20px;
`;

const Card = styled.div`
  background-color: #f5f5f5;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  color: #007bff; /* Cor azul para a fonte */
`;

const CardTitle = styled.h2`
  font-size: 24px;
  margin-bottom: 10px;
`;

const CardDescription = styled.p`
  font-size: 16px;
`;

function Home() {
  return (
    <HomeContainer>
      <TitleLarge>EazyAccess</TitleLarge>
      <SubtitleSmall>Um mundo mais acessível e inclusivo começa aqui!</SubtitleSmall>
      
      <CardsContainer>
        <NavLink to="/locais" style={{ textDecoration: 'none' }}>
          <Card role="link" aria-label="Explore locais acessíveis">
            <CardTitle>Locais</CardTitle>
            <CardDescription>Descubra locais acessíveis</CardDescription>
          </Card>
        </NavLink>
        <NavLink to="/restaurantes" style={{ textDecoration: 'none' }}>
          <Card role="link" aria-label="Explore restaurantes inclusivos">
            <CardTitle>Restaurantes</CardTitle>
            <CardDescription>Explore restaurantes inclusivos</CardDescription>
          </Card>
        </NavLink>
        <NavLink to="/lazer" style={{ textDecoration: 'none' }}>
          <Card role="link" aria-label="Encontre atividades de lazer acessíveis">
            <CardTitle>Lazer</CardTitle>
            <CardDescription>Encontre atividades de lazer acessíveis</CardDescription>
          </Card>
        </NavLink>
      </CardsContainer>
    </HomeContainer>
  );
}

export default Home;
