import React from 'react';
import styled from "styled-components";
import { useState, useEffect } from 'react';
import backgroundImage from '../images/locais.jpg'
import { useLocation } from 'react-router-dom';


const Container = styled.div`
  display: flex;
  justify-content: center; /* Centralizar horizontalmente */
  margin-bottom: 20px;
  gap: 5px;

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
  font-size: 26px;
  margin-bottom: 8px;
`;

const Rating = styled.p`
  color: #007bff;
  font-size: 18px;
  margin: 0;
`;

const Address = styled.p`
  color: #666;
  font-size: 18px;
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
  font-size: 18px;
  margin: 0;
  white-space: ${({ expanded }) => (expanded ? 'normal' : '45px')};
`;

const VerMaisButton = styled.button`
  background: none;
  border: none;
  color: #0074d9;
  cursor: pointer;
`;

const SearchInput = styled.input`
  padding: 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
  outline: none;
`;

const StyledHeading = styled.h2`
  text-align: center;
`;

const Locais = () => {
  const [expanded, setExpanded] = useState(false);
  const [result, setResult] = useState([]);
  const [nameFilter, setNameFilter] = useState('');
  const [addressFilter, setAddressFilter] = useState('');
  const [accessibilityFilter, setAccessibilityFilter] = useState('');
  const location = useLocation();
  const results = location.state?.results || [];

  const toggleText = () => {
      setExpanded(!expanded);
  };

  const fetchData = () => {
    let url = `http://localhost:3002/`;

    const params = new URLSearchParams();
    if (nameFilter) params.append('name', nameFilter);
    if (addressFilter) params.append('endereco', addressFilter);
    if (accessibilityFilter) params.append('accessibility', accessibilityFilter);

    if (params.toString()) {
        url += `?${params.toString()}`;
        console.log(url)
    }

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setResult(data);
        console.log(result)
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
      <div>
        <div>
        <StyledHeading> Pesquise com Filtros </StyledHeading>
          <Container>
              <SearchInput
                  type="text" 
                  placeholder="Nome do Estabelecimento" 
                  value={nameFilter}
                  onChange={(e) => setNameFilter(e.target.value)}
              />
              <SearchInput 
                  type="text" 
                  placeholder="Endereço" 
                  value={addressFilter}
                  onChange={(e) => setAddressFilter(e.target.value)}
              />
              <SearchInput 
                  type="text" 
                  placeholder="Acessibilidade Disponível" 
                  value={accessibilityFilter}
                  onChange={(e) => setAccessibilityFilter(e.target.value)}
              />
              {/* <select value={accessibilityFilter} onChange={(e) => setAccessibilityFilter(e.target.value)}>
                  <option value="">Todas Acessibilidades</option>
                  <option value="Acessível">Acessível</option>
                  <option value="Não Acessível">Não Acessível</option>
              </select> */}
              <button onClick={fetchData}>Filtrar</button>
              </Container>
          </div>
        <Container>
          {result.map((item, index) => (
            <CardContainer key={index}>
                <Content>
                    <Title>{item.EstabelecimentoName}</Title>
                    <Address>{item.Endereco}</Address>
                    <Imagem src={backgroundImage} alt="Imagem de uma feijoada bem suculenta" />
                    <Title>Acessibilidade Disponível</Title>
                    <Texto>{item.Acessibilidade}</Texto>
                    <Title>Telefone</Title>
                    <Texto>{item.Telefone}</Texto>
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
             ))}        
           </Container>
           <Container>
          {results.map((item, index) => (
            <CardContainer key={index}>
                <Content>
                    <Title>{item.EstabelecimentoName}</Title>
                    <Address>{item.Endereco}</Address>
                    <Imagem src={backgroundImage} alt="Imagem de uma feijoada bem suculenta" />
                    <Title>Acessibilidade Disponível</Title>
                    <Texto>{item.Acessibilidade}</Texto>
                    <Title>Telefone</Title>
                    <Texto>{item.Telefone}</Texto>
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
             ))}        
           </Container>
      </div>
    );
}

export default Locais;