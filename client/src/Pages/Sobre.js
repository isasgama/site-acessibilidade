import React from 'react';
import styled from 'styled-components';
import backgroundImage from '../images/sobre.jpg';

const SobreContainer = styled.div`
  background-color: #ffffff;
  padding: 20px;
  text-align: left;
  color: #666;

  /* Estilos para telas pequenas (até 600px de largura) */
  @media (max-width: 600px) {
    padding: 10px;
    text-align: center;
  }
`;

const Titulo = styled.h1`
  font-size: 36px;
  margin-bottom: 20px;
  color: #333;

  /* Estilos para telas pequenas (até 600px de largura) */
  @media (max-width: 600px) {
    font-size: 28px;
  }
`;

const Texto = styled.p`
  font-size: 18px;
  line-height: 1.5;

  /* Estilos para telas pequenas (até 600px de largura) */
  @media (max-width: 600px) {
    font-size: 16px;
  }
`;

const Imagem = styled.img`
  display: block;
  width: 100%; /* A imagem ocupa toda a largura do contêiner */
  height: auto; /* A altura se ajusta automaticamente */
`;

const Overlay = styled.div`
  position: relative;
  background-color: rgba(255, 255, 255, 0.7); /* Fundo semitransparente */
  padding: 20px;
  text-align: left;
`;

function Sobre() {
  return (
    <SobreContainer>
      <Overlay>
        <Titulo>Sobre o EasyAccess</Titulo>
        <Texto>
          O EazyAccess é uma plataforma dedicada à acessibilidade e inclusão. Nosso propósito é fornecer informações precisas e detalhadas sobre locais e estabelecimentos que possuem estrutura adequada para atender às necessidades das pessoas com deficiência. Isso inclui restaurantes com rampas de acesso, academias com equipamentos adaptados, bancos com funcionários capacitados em libras e muito mais.
        </Texto>
        <Texto>
          Acreditamos que a acessibilidade é um direito fundamental e que todas as pessoas merecem participar plenamente da vida social e realizar suas atividades cotidianas com facilidade. Além disso, a conscientização sobre a importância da acessibilidade é essencial, e nosso site também contribui para sensibilizar estabelecimentos e locais públicos sobre essa questão vital.
        </Texto>
        <Imagem src={backgroundImage} alt="Imagem de uma mulher deficiente visual sentada em um banco com arvores ao fundo lendo." />
      </Overlay>
      
    </SobreContainer>
  );
}

export default Sobre;
