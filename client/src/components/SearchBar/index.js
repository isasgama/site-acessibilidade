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

function SearchBar() {
  const [result, setResult] = useState([]);
  const [nameFilter, setNameFilter] = useState('');
  const navigate = useNavigate();

  const fetchData = (event) => {
    event.preventDefault(); 
    let url = `http://localhost:3002/`;

    const params = new URLSearchParams();
    if (nameFilter) params.append('name', nameFilter);

    if (params.toString()) {
        url += `?${params.toString()}`;
        console.log(url)
    }

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setResult(data);
        if (data.length > 0) {
          navigate("/locais", { state: { results: data } });
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };


  return (
    <SearchContainer aria-label="Pesquisar Locais">
      <SearchInput
        type="text"
        placeholder="Pesquisar Locais..."
        value={nameFilter}
        onChange={(e) => setNameFilter(e.target.value)}
      />
      <SearchButton onClick={fetchData}>Buscar</SearchButton>
    </SearchContainer>
  );
}

export default SearchBar;
