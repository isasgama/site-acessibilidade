import React from 'react';
import styled from 'styled-components';

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const LogoText = styled.div`
  font-size: 24px;
  font-weight: bold;
  color: #007bff; /* Azul */
`;

function Logo() {
  return (
    <LogoContainer>
      <LogoText>EasyAccess</LogoText>
    </LogoContainer>
  );
}

export default Logo;
