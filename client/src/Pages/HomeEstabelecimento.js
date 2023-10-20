import React from "react";
import styled from "styled-components";
import backgroundImage from '../images/homeestab.jpg';
import useAuth from "../Hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';

const MenuContainer = styled.div`
  background: url(${backgroundImage});
  background-position: left;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 10px;
  height: 100vh;
  background-color: #f0f0f0; /* Cor de fundo clara */
`;

const Content = styled.div`
  gap: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  box-shadow: 0 1px 2px #0008;
  background-color: white;
  max-width: 350px;
  padding: 20px;
  border-radius: 5px;
`;

const MenuOption = styled.a`
  text-decoration: none;
  font-size: 24px;
  margin: 10px;
  color: black;
  cursor: pointer;
  padding: 10px 20px; /* Adicione preenchimento para as opções do menu */
  border-radius: 5px; /* Adicione bordas arredondadas */
  transition: background-color 0.3s; /* Efeito de transição de cor de fundo */

  &:hover {
    background-color: #0078d4; /* Cor de fundo azul quando hover */
    color: #fff; /* Cor do texto branco quando hover */
  }
`;

const HeaderTitle = styled.h1`
  font-size: 36px;
  margin: 10px 0;
  text-shadow: 3px 2px 4px rgba(0, 0, 0, 1.9); /* Adicione um sombreamento de texto */
  color: white;
  `;

const Button = styled.button`
  padding: 16px 20px;
  outline: none;
  border: none;
  border-radius: 5px;
  width: 20%;
  cursor: pointer;
  background-color: #046ee5;
  color: white;
  font-weight: 600;
  font-size: 16px;
  max-width: 350px;
`;


function MainMenu() {
  const { signout } = useAuth();
  const navigate = useNavigate();

  return (
    <MenuContainer>
      <HeaderTitle>Bem vindo(a) ao EasyAccess!</HeaderTitle>
      <Content>
        <Link to="/cadastrar-enderecos">Cadastre locais acessíveis</Link>
        <MenuOption href="/edite-seu-cadastro">Editar cadastro</MenuOption>
        <MenuOption href="/enderecos">Editar locais acessíveis</MenuOption>
        <Button Text="Sair" onClick={() => [signout(), navigate("/login")]}>
          Sair
        </Button>
      </Content>
    </MenuContainer>
  );
}

export default MainMenu;



{/* <Container>
<Title>Home Estabelecimento</Title>
<ButtonLogin Text="Sair" onClick={() => [signout(), navigate("/estabelecimento")]}>
  Sair
</ButtonLogin>
</Container> */}
