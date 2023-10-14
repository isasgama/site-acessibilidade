import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { createGlobalStyle } from 'styled-components'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Fragment } from "react";
import useAuth from "../src/Hooks/useAuth";
import Header from './components/Header'
import Home from './Pages/Home';
import Sobre from './Pages/Sobre';
import Login from './Pages/Login';
import ForgotPassword from './Pages/EsqueciSenha';
import Cadastro from './Pages/Cadastro';
import CadastroEstabelecimento from './Pages/CadastroEstabelecimento'
import HomeUser from './Pages/HomeUsuario';
import { AuthProvider } from './Contexts/auth';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
      monospace;
  }

  li {
    list-style: none;    
  }
`

const Private = ({ Item }) => {
  const { signed } = useAuth();

  return signed > 0 ? <Item /> : <Login />;
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
    <GlobalStyle />
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route exact path="/home" element={<Private Item={HomeUser} />} />
        <Route path="/sobre" element={<Sobre />} />
        <Route path="/login" element={<Login />} />
        <Route path="/esqueci-senha" element={<ForgotPassword />} />
        <Route path='/cadastre-se' element={<Cadastro />} />
        <Route path='/cadastro-estabelecimento' element={<CadastroEstabelecimento />} />
      </Routes>
    </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
