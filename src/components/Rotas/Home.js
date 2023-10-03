import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

// Importe a imagem de fundo da pasta de imagens (certifique-se de ajustar o caminho)
import backgroundImage from '../images/home.jpg';

const HeaderTop = styled.div`
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.5), transparent), url(${backgroundImage});
  background-size: cover;
  background-position: center;
  text-align: center;
  color: #fff;
  padding: 98px 0;
  position: relative;
`;

const HeaderOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* Sobreposição de cor preta semitransparente */
  z-index: -1; /* Coloque abaixo do conteúdo de texto */
`;

const HeaderTitle = styled.h1`
  font-size: 36px;
  margin: 10px 0;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.6); /* Adicione um sombreamento de texto */
`;

const HeaderSubtitle = styled.p`
  font-size: 18px;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.6); /* Adicione um sombreamento de texto */
`;

const HomeContainer = styled.div`
  background-color: #ffffff;
`;

const CardsContainer = styled.div`
  display: flex;
  justify-content: space-around;
  width: 80%;
  margin: 20px auto;
`;

const Card = styled.div`
  background-color: #f5f5f5;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.5);
  cursor: pointer;
  color: black; /* Cor azul para a fonte */
  text-align: center; /* Centraliza o texto dentro do card */
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
    <div>
      <HeaderTop>
        <HeaderOverlay /> {/* Sobreposição de cor preta semitransparente */}
        <HeaderTitle>EasyAccess</HeaderTitle>
        <HeaderSubtitle>Um mundo mais acessível e inclusivo começa aqui!</HeaderSubtitle>
      </HeaderTop>
      <HomeContainer>
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
    </div>
  );
}

export default Home;
