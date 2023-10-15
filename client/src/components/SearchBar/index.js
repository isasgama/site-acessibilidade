import React, { useState } from 'react';
import styled from 'styled-components';

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

function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault(); // Evita a recarga da página ao pressionar "Enter"
    onSearch(searchTerm);
  };

  return (
    <SearchContainer onSubmit={handleSearch} aria-label="Pesquisar Locais">
      <SearchInput
        type="text"
        placeholder="Pesquisar Locais..."
        value={searchTerm}
        onChange={handleChange}
      />
      <SearchButton type="submit">Buscar</SearchButton>
      <SearchResults aria-live="polite"> {/* Indique que os resultados são dinâmicos */}
        {/* Renderize os resultados aqui */}
      </SearchResults>
    </SearchContainer>
  );
}

export default SearchBar;
