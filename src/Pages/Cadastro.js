import React, { useState } from 'react';
import styled from 'styled-components';

const LoginPage = styled.div`
  justify-content: center;
  align-items: center;
  height: 130vh;
  display: flex;
`;

const Texto = styled.p`
  font-size: 18px;
  line-height: 1.5;

  /* Estilos para telas pequenas (até 600px de largura) */
  @media (max-width: 600px) {
    font-size: 16px;
  }
`;

const GraySquare = styled.div`
  background-color: #f5f5f5; /* Fundo cinza */
  border-radius: 10px;
  padding: 4%; /* Use uma unidade de medida relativa, como porcentagem */
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.5);
  text-align: center;
  width: 80%; /* Use uma largura relativa para manter a adaptabilidade */
  max-width: 600px; /* Defina uma largura máxima para evitar que o conteúdo fique muito largo em telas grandes */
`;

const LoginTitle = styled.h2`
  font-size: 32px;
  margin-bottom: 20px;
  color: #007bff; /* Cor do texto azul */
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
`;

const InputFieldUser = styled.div`
  margin-bottom: 5%;
  text-align: center;
  padding: 5%;
  width: 90%; /* Use uma largura relativa para manter a adaptabilidade */

  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-row-gap: 0.5em;

  @media (max-width: 600px) {
    font-size: 16px;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-row-gap: 0.5em;
  }

`;

const InputField = styled.div`
  margin-bottom: 5px;
  text-align: left;
  padding: 5%;
  width: 95%; /* Use uma largura relativa para manter a adaptabilidade */
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-column-gap: 20px;
  grid-row-gap: 1em;
  grid-auto-rows: auto;

  @media (max-width: 600px) {
    font-size: 16px;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-row-gap: 0.5em;
  }
`;

const InputLabel = styled.label`
  display: block;
  margin-bottom: 5px;
  font-size: 16px;
  text-align: center;
`;

const Input = styled.input`
  padding: 3%;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  width: 100%; /* Use uma largura relativa para manter a adaptabilidade */
`;

const Button = styled.button`
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 18px;
`;

function Cadastro() {
  const [showUserForm, setShowUserForm] = useState(false);
  const [showEstablishmentForm, setShowEstablishmentForm] = useState(false);

  // Estado para campos do usuário
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [userFirstName, setUserFirstName] = useState('');
  const [userLastName, setUserLastName] = useState('');
  const [userPhoneNumber, setUserPhoneNumber] = useState('');
  const [userAddress, setUserAddress] = useState('');

  // Estado para campos do estabelecimento
  const [establishmentFone, setEstablishmentFone] = useState('');
  const [establishmentEmail, setEstablishmentEmail] = useState('');
  const [establishmentName, setEstablishmentName] = useState('');
  const [establishmentStartDate, setEstablishmentStartDate] = useState('');
  const [establishmentAddress, setEstablishmentAddress] = useState('');
  const [establishmentType, setEstablishmentType] = useState('');
  const [accessibilityType, setAccessibilityType] = useState('');
  const [accessibilityTypeOther, setAccessibilityTypeOther] = useState('');

  return (
    <LoginPage>
      <GraySquare>
        <LoginTitle>Cadastro</LoginTitle>
        <Texto>Escolha a opção de cadastro desejada</Texto>

        <button onClick={() => { setShowUserForm(true); setShowEstablishmentForm(false); }}>Usuário</button>
        <button onClick={() => { setShowEstablishmentForm(true); setShowUserForm(false); }}>Estabelecimento</button>

        {showUserForm && (
          <form>
            <InputFieldUser>
              <InputLabel htmlFor="userEmail">E-mail</InputLabel>
              <Input
                type="email"
                id="userEmail"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                aria-label="E-mail"
              />

              <InputLabel htmlFor="userPassword">Senha</InputLabel>
              <Input
                type="password"
                id="userPassword"
                value={userPassword}
                onChange={(e) => setUserPassword(e.target.value)}
                aria-label="Senha"
              />

              <InputLabel htmlFor="userFirstName">Nome</InputLabel>
              <Input
                type="text"
                id="userFirstName"
                value={userFirstName}
                onChange={(e) => setUserFirstName(e.target.value)}
                aria-label="Nome"
              />

              <InputLabel htmlFor="userLastName">Sobrenome</InputLabel>
              <Input
                type="text"
                id="userLastName"
                value={userLastName}
                onChange={(e) => setUserLastName(e.target.value)}
                aria-label="Sobrenome"
              />

              <InputLabel htmlFor="userAddress">Endereço</InputLabel>
              <Input
                type="text"
                id="userAddress"
                value={userAddress}
                onChange={(e) => setUserAddress(e.target.value)}
                aria-label="Endereço"
              />

              <InputLabel htmlFor="userPhoneNumber">Telefone</InputLabel>
              <Input
                type="text"
                id="userPhoneNumber"
                value={userPhoneNumber}
                onChange={(e) => setUserPhoneNumber(e.target.value)}
                aria-label="Telefone"
              />
            </InputFieldUser>
          </form>
        )}

        {showEstablishmentForm && (
          <form>
            <InputField>
              <InputLabel htmlFor="establishmentName">Nome do Estabelecimento</InputLabel>
              <Input
                type="text"
                id="establishmentName"
                value={establishmentName}
                onChange={(e) => setEstablishmentName(e.target.value)}
                aria-label="Nome da Empresa/Estabelecimento"
              />

              <InputLabel htmlFor="establishmentEmail">E-mail</InputLabel>
              <Input
                type="text"
                id="establishmentEmail"
                value={establishmentEmail}
                onChange={(e) => setEstablishmentEmail(e.target.value)}
                aria-label="Email"
              />

              <InputLabel htmlFor="establishmentFone">Telefone</InputLabel>
              <Input
                type="text"
                id="establishmentFone"
                value={establishmentFone}
                onChange={(e) => setEstablishmentFone(e.target.value)}
                aria-label="Telefone"
              />  

              <InputLabel htmlFor="establishmentStartDate">Data de Início</InputLabel>
              <Input
                type="date"
                id="establishmentStartDate"
                value={establishmentStartDate}
                onChange={(e) => setEstablishmentStartDate(e.target.value)}
                aria-label="Data de Início"
              />

              <InputLabel htmlFor="establishmentAddress">Endereço</InputLabel>
              <Input
                type="text"
                id="establishmentAddress"
                value={establishmentAddress}
                onChange={(e) => setEstablishmentAddress(e.target.value)}
                aria-label="Endereço"
              />

              <InputLabel htmlFor="establishmentType">Tipo de Estabelecimento</InputLabel>
              <Input
                type="text"
                id="establishmentType"
                value={establishmentType}
                onChange={(e) => setEstablishmentType(e.target.value)}
                aria-label="Tipo de Estabelecimento"
              />

              <InputLabel htmlFor="accessibilityType">Tipo de Acessibilidade Atendida</InputLabel>
              <Input
                type="text"
                id="accessibilityType"
                value={accessibilityType}
                onChange={(e) => setAccessibilityType(e.target.value)}
                aria-label="Tipo de Acessibilidade Atendida"
              />

              <InputLabel htmlFor="accessibilityTypeOther">Outro Tipo de Acessibilidade Atendida</InputLabel>
              <Input
                type="text"
                id="accessibilityTypeOther"
                value={accessibilityTypeOther}
                onChange={(e) => setAccessibilityTypeOther(e.target.value)}
                aria-label="Outro Tipo de Acessibilidade Atendida"
              />

            </InputField>
          </form>
        )}

        {(showUserForm || showEstablishmentForm) && (
          <Button>Cadastrar</Button>
        )}
      </GraySquare>
    </LoginPage>
  );
}

export default Cadastro;
