import { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const SearchContainer = styled.form`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const SearchInput = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  outline: none;
`;

const SearchButton = styled.button`
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;
`;

const SearchResults = styled.ul`
  list-style-type: none;
  padding: 0;
  margin-top: 10px; /* Espaço adicional para os resultados */
`;

const SearchResultItem = styled.li`
  background-color: #f5f5f5;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
`;

const MyComponent = () => {
  const navigate = useNavigate();

  return (
    <SearchBar onSearch={navigate} />
  );
};

function SearchBar({ onSearch }) {
  const [data, setData] = useState([]);
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('');
  const [result, setResult] = useState([]);
  const [nameFilter, setNameFilter] = useState('');
  const [addressFilter, setAddressFilter] = useState('');
  const [accessibilityFilter, setAccessibilityFilter] = useState('');

  const handleSearch = () => {
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
        onSearch('/locais');
        console.log(result)
      })
      .catch((err) => {
        console.error(err);
      });
  };


  return (
    <SearchContainer onSubmit={handleSearch} aria-label="Pesquisar Locais">
      <SearchInput
        type="text"
        placeholder="Pesquisar Locais..."
        value={nameFilter}
        onChange={(e) => setNameFilter(e.target.value)}
      />
      <SearchButton type="submit">Buscar</SearchButton>
      <SearchResults aria-live="polite"> {/* Indique que os resultados são dinâmicos */}
        {/* Renderize os resultados aqui */}
      </SearchResults>
    </SearchContainer>
  );
}

export default SearchBar;
