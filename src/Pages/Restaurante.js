import React from 'react';
import styled from "styled-components";
import { useState } from 'react';
import backgroundImage from '../images/feijoada.jpg'


const Container = styled.div`
  display: flex;
  justify-content: center; /* Centralizar horizontalmente */
  margin-bottom: 20px;

  @media (max-width: 600px) {
    align-items: center; /* Centralizar verticalmente em telas menores */
    flex-direction: column; /* Empilhar os cards verticalmente em telas menores */
    max-width: 100%;
    margin: auto;
  }
`;

const CardContainer = styled.div`
  background-color: #f2f2f2;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
  text-align: center;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);
  max-width: 260px;
  margin: 20px;

  @media (max-width: 600px) {
    max-width: 100%;
  }
`;

const Content = styled.div`
  overflow: hidden;
`;

const Title = styled.h1`
  color: #333;
  font-size: 24px;
  margin-bottom: 8px;
`;

const Rating = styled.p`
  color: #007bff;
  font-size: 16px;
  margin: 0;
`;

const Address = styled.p`
  color: #666;
  font-size: 14px;
  margin: 0;
`;

const Imagem = styled.img`
  display: block;
  width: 100%; /* A imagem ocupa toda a largura do contêiner */
  height: auto; /* A altura se ajusta automaticamente */
`;

const TextContainer = styled.div`
  max-height: ${({ expanded }) => (expanded ? 'none' : '50px')};
  overflow: hidden;
`;

const Texto = styled.p`
  color: #333;
  font-size: 14px;
  margin: 0;
  white-space: ${({ expanded }) => (expanded ? 'normal' : '45px')};
`;

const VerMaisButton = styled.button`
  background: none;
  border: none;
  color: #0074d9;
  cursor: pointer;
`;

const Restaurante = () => {
    const [expanded, setExpanded] = useState(false);

    const toggleText = () => {
        setExpanded(!expanded);
    };

    return (
        <Container>
            <CardContainer>
                <Content>
                    <Title>Feijoada da Vovó</Title>
                    <Rating>✰✰✰✰✰ 10 avaliações</Rating>
                    <Address>& Rua das Acácias, 124 - São Paulo, Estado de São Paulo 02478-900 Brasil 91000-000</Address>
                    <Imagem src={backgroundImage} alt="Imagem de uma feijoada bem suculenta" />
                </Content>
            </CardContainer>
            <CardContainer>
                <Content>
                    <Title>Pontuações e Avaliações</Title>
                    <Rating>4,0 ✰✰✰✰✰ 10 avaliações</Rating>
                    <TextContainer expanded={expanded}>
                        <Texto expanded={expanded}>
                            "Eu amei a feijoada da Feijoada da Vovó! O prato estava delicioso e bem servido. O único ponto negativo foi a demora para ser atendido e servido, mas nada que atrapalhasse a minha experiência. Recomendo o restaurante para quem está procurando uma boa feijoada."
                        </Texto>
                    </TextContainer>
                    {!expanded && <VerMaisButton onClick={toggleText}>Ver mais</VerMaisButton>}
                </Content>
            </CardContainer>
            <CardContainer>
                <Content>
                    <Title>Acessibilidade Disponível</Title>
                    <Texto>Vagas Exclusivas
                    Cardápios em braille
                    Rampas de acesso
                    Linguagem de sinais
                    rotan Fiy
                    Localização e contato
                    Feijoada da Vóvó
                    Directions
                    los do mapa 500 m
                    Termos de Uso
                    Rua das Acácias, 124
                    91000-000</Texto>
                </Content>
            </CardContainer>
        </Container>
    );
}

export default Restaurante;