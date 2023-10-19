import styled from 'styled-components';
import OpcoesHeader from '../OpcoesHeader';
import SearchBar from '../SearchBar';
import Logo from '../Logo';

const HeaderContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 40px;
    background-color: #f5f5f5;

    @media (max-width: 768px) {
        flex-direction: column; /* Altera a direção para coluna em telas menores */
        align-items: center; /* Centraliza os elementos na vertical */
        text-align: center; /* Centraliza o texto */
        padding: 20px 10px; /* Ajusta o preenchimento */
    }
`;

function Header() {
    return (
        <HeaderContainer>
            <Logo />
            <SearchBar />
            <OpcoesHeader />
        </HeaderContainer>
    );
}

export default Header;
