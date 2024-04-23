import React from 'react';
import styled from 'styled-components';

const RadioContainer = styled.label`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  cursor: pointer;
`;

const RadioInput = styled.input`
  display: none;
`;

const RadioButton = styled.span`
  position: relative;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 2px solid #ccc;
  margin-right: 10px;
`;

const RadioFill = styled.span`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: #0F60FF;
  display: ${({ checked }) => (checked ? 'block' : 'none')};
`;

const BankRadioButton = ({ imageSrc, bankName, onChange, checked }) => {
  return (
    <RadioContainer>
      <RadioInput
        type="radio"
        name="bank"
        value={bankName}
        onChange={onChange}
        checked={checked}
      />
      <RadioButton>
        <RadioFill checked={checked} />
      </RadioButton>
      <img src={imageSrc} alt={bankName} style={{ width: '70px', height: '40px', padding: '0 15px', margin: '10px', borderWidth: '1px' }} />
      {bankName}
    </RadioContainer>
  );
};

export default BankRadioButton;
