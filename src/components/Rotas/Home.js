import React from 'react';
import styled from 'styled-components';

const HomeContainer = styled.div`
  background-color: #ffffff; /* Cor de fundo para corresponder à cor das opções */
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: #666; /* Mesma cor das opções */
`;

const TitleSmall = styled.p`
  font-size: 24px;
`;

const TitleLarge = styled.h1`
  font-size: 48px;
  margin: 10px 0;
`;

const SubtitleSmall = styled.p`
  font-size: 18px;
`;

function Home() {
  return (
    <HomeContainer>
      <TitleSmall>EazyAccess</TitleSmall>
      <TitleLarge>Indo e Vindo</TitleLarge>
      <SubtitleSmall>Um mundo mais acessível e inclusivo começa aqui</SubtitleSmall>
    </HomeContainer>
  );
}

export default Home;
