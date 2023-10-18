import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import useAuth from '../../Hooks/useAuth';

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
  white-space: pre; /* Impede a quebra de linha */
  margin-right: 10px; /* Adiciona margem direita de 10px */

  &:hover {
    background-color: #f5f5f5;
    transform: scale(0.90);
    text-decoration: none;
  }

  &:last-child {
    margin-right: 0; /* Remove a margem direita da última opção */
  }
`;

const OpcoesNav = styled.nav`
  display: flex;
  list-style-type: none;
  padding: 0;
  flex-wrap: wrap; /* Permite que os itens do cabeçalho quebrem em várias linhas */
`;

const textoOpcoes = [
  { texto: 'Início', descricao: 'Página inicial'},
  { texto: 'Sobre', descricao: 'Sobre nós' },
  { texto: 'Restaurantes', descricao: 'Nossos restaurantes' },
  { texto: 'Locais', descricao: 'Nossos locais' },
  { texto: 'Lazer', descricao: 'Atividades de lazer' },
  { texto: 'Login', descricao: 'Entrar na sua conta' },
  { texto: 'Home', descricao: 'Página do usuário'}
];

function OpcoesHeader( ) {
  const { signed, establishment } = useAuth();
  
  return (
    <OpcoesNav>
      {textoOpcoes.map(({ texto, descricao }) => (
        <NavLink
          to={texto.toLowerCase() === 'início' ? '/' : `/${texto.toLowerCase()}`}
          key={texto}
          style={{ textDecoration: 'none', flex: '1 1 auto' }}
          aria-label={descricao}
          activeClassName="link-ativo"
        >
          {texto.toLowerCase() === 'login' && signed ? null : (
            <Opcao>
              {texto === 'Home' && !signed ? null : (
                <>
                  {texto === 'Home' ? (
                    <Opcao>
                      {establishment ? ( // Verifica se o usuário é estabelecimento
                        <NavLink to="/estabelecimento"
                        style={{ textDecoration: 'none', color: '#666' }}
                        >
                          Minha Conta</NavLink> // Redireciona para a página /estabelecimento
                      ) : (
                        "Minha Conta"
                      )}
                    </Opcao>
                  ) : (
                    texto
                  )}
                </>
              )}
            </Opcao>
          )}
        </NavLink>
      ))}
    </OpcoesNav>
  );
}

export default OpcoesHeader;
