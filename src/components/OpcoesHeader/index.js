import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

const Opcao = styled.li`
  font-size: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  height: 100%;
  padding: 0 -3px;
  cursor: pointer;
  min-width: 120px;
  background-color: transparent;
  transition: background-color 0.3s ease, transform 0.2s ease, color 0.3s ease;
  color: #666;
  white-space: nowrap; /* Impede a quebra de linha */

  &:hover {
    background-color: #f5f5f5;
    transform: scale(0.90);
    text-decoration: none;
  }
`;

const OpcoesNav = styled.nav`
  display: flex;
  list-style-type: none;
  padding: 0;
  overflow-x: auto; /* Adiciona uma barra de rolagem horizontal em telas pequenas */
`;

const textoOpcoes = [
  { texto: 'Início', descricao: 'Página inicial' },
  { texto: 'Sobre', descricao: 'Sobre nós' },
  { texto: 'Restaurantes', descricao: 'Nossos restaurantes' },
  { texto: 'Locais', descricao: 'Nossos locais' },
  { texto: 'Lazer', descricao: 'Atividades de lazer' },
  { texto: 'Login/Sign in', descricao: 'Entrar na sua conta' },
];

function OpcoesHeader() {
  return (
    <OpcoesNav>
      {textoOpcoes.map(({ texto, descricao }) => (
        <NavLink
          to={texto.toLowerCase() === 'início' ? '/' : `/${texto.toLowerCase()}`}
          key={texto}
          style={{ textDecoration: 'none' }}
          aria-label={descricao}
          activeClassName="link-ativo" // Classe para indicar a página atual
        >
          <Opcao><p>{texto}</p></Opcao>
        </NavLink>
      ))}
    </OpcoesNav>
  );
}

export default OpcoesHeader;
