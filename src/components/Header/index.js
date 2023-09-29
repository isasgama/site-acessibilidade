import styled from 'styled-components'
import OpcoesHeader from '../OpcoesHeader'

const HeaderContainer = styled.header`
    background-color: #FFF;
    display: flex;
    justify-content: center;
`

function Header() {
    return (
        <HeaderContainer>
            <OpcoesHeader/>
        </HeaderContainer>
    )
}

export default Header