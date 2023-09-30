import React from 'react';
import styled from 'styled-components';

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

function Sobre() {
  return (
    <SobreContainer>
      <Titulo>Sobre o EazyAccess</Titulo>
      <Texto>
        O EazyAccess é uma plataforma dedicada à acessibilidade e inclusão. Nosso propósito é fornecer informações precisas e detalhadas sobre locais e estabelecimentos que possuem estrutura adequada para atender às necessidades das pessoas com deficiência. Isso inclui restaurantes com rampas de acesso, academias com equipamentos adaptados, bancos com funcionários capacitados em libras e muito mais.
      </Texto>
      <Texto>
        Acreditamos que a acessibilidade é um direito fundamental e que todas as pessoas merecem participar plenamente da vida social e realizar suas atividades cotidianas com facilidade. Além disso, a conscientização sobre a importância da acessibilidade é essencial, e nosso site também contribui para sensibilizar estabelecimentos e locais públicos sobre essa questão vital.
      </Texto>
    </SobreContainer>
  );
}

export default Sobre;
