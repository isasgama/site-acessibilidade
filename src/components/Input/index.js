import React from "react";
import styled from "styled-components";

const Input = styled.input`
  outline: none;
  padding: 16px 20px;
  width: 90%;
  border-radius: 5px;
  font-size: 16px;

  background-color: #f0f2f5;
  border: none;
`;

const InputLogin = ({ type, placeholder, value, onChange }) => {
  return (
    <Input
      value={value}
      onChange={onChange}
      type={type}
      placeholder={placeholder}
    />
  );
};

export default InputLogin;