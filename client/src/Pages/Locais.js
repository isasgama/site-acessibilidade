import React from 'react';
import styled from "styled-components";
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import App from '../components/GoogleMaps';


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
  padding: 20px;
  text-align: center;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);
  max-width: 400px;
  margin: 2px;

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

const Address = styled.p`
  color: #666;
  font-size: 22px;
  margin: 0;
`;

const Texto = styled.p`
  color: #333;
  font-size: 22px;
  margin: 0;
  white-space: ${({ expanded }) => (expanded ? 'normal' : '45px')};
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
  const [result, setResult] = useState([]);
  const [nameFilter, setNameFilter] = useState('');
  const [addressFilter, setAddressFilter] = useState('');
  const [accessibilityFilter, setAccessibilityFilter] = useState('');
  const [selectedLocation, setSelectedLocation] = useState(null);

  const location = useLocation();
  const results = location.state?.results || [];

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

        // Se houver resultados, armazene as coordenadas do primeiro resultado
        if (data.length > 0) {
            setSelectedLocation({
                lat: parseFloat(data[0].Latitude),
                lng: parseFloat(data[0].Longitude),
            });
            console.log(selectedLocation)
        }
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
              <button onClick={fetchData}>Filtrar</button>
              </Container>
          </div>
        <Container>
          {result.map((item, index) => (
            <CardContainer key={index}>
                <Content>
                    <Title>{item.EstabelecimentoName}</Title>
                    <Address>{item.Endereco}</Address>
                    <App selectedLocation={{ lat: parseFloat(item.Latitude), lng: parseFloat(item.Longitude) }} />
                    <Title>Acessibilidade Disponível</Title>
                    <Texto>{item.Acessibilidade}</Texto>
                    <Title>Telefone</Title>
                    <Texto>{item.Telefone}</Texto>
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
                    <App selectedLocation={{ lat: parseFloat(item.Latitude), lng: parseFloat(item.Longitude) }} />
                    <Title>Acessibilidade Disponível</Title>
                    <Texto>{item.Acessibilidade}</Texto>
                    <Title>Telefone</Title>
                    <Texto>{item.Telefone}</Texto>
                </Content>
            </CardContainer>
             ))}        
           </Container>
      </div>
    );
}

export default Locais;