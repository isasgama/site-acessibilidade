import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Opcao = styled.li`
  font-size: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  height: 100%;
  padding: 0 10px;
  cursor: pointer;
  min-width: 120px;
  background-color: transparent; /* Fundo transparente por padrão */
  transition: background-color 0.3s ease, transform 0.2s ease, color 0.3s ease; /* Efeito de transição suave */

  color: #666; /* Cor da fonte em cinza */

  &:hover {
    background-color: #f5f5f5; /* Cinza quase branco ao passar o mouse */
    transform: scale(0.90); /* Reduz o tamanho ao passar o mouse */
    text-decoration: none; /* Remove o sublinhado do texto ao passar o mouse */
  }
`;

const Opcoes = styled.ul`
  display: flex;
  list-style-type: none;
  padding: 0;
`;

const textoOpcoes = ['Início', 'Sobre', 'Restaurantes', 'Locais', 'Lazer', 'Mais'];

function OpcoesHeader() {
  return (
    <Opcoes>
      {textoOpcoes.map((texto) => (
        <Link to={`/${texto.toLowerCase()}`} key={texto} style={{ textDecoration: 'none' }}>
          <Opcao><p>{texto}</p></Opcao>
        </Link>
      ))}
    </Opcoes>
  );
}

export default OpcoesHeader;
