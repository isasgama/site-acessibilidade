import styled from 'styled-components'
import OpcoesHeader from '../OpcoesHeader'
import SearchBar from '../SearchBar'
import Logo from '../Logo'

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #f5f5f5;
`;

function Header() {
    return (
        <HeaderContainer>
            <Logo/>
            <SearchBar/>
            <OpcoesHeader/>
        </HeaderContainer>
    )
}

export default Header