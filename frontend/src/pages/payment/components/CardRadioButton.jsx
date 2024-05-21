import React from 'react';
import styled from 'styled-components';

const RadioContainer = styled.label`
  display: flex;
  align-items: center;
  margin-bottom: 0px;
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

const CardRadioButton = ({ name, onChange, checked, cardNumber }) => {
  return (
    <RadioContainer>
      <RadioInput
        type="radio"
        name="card"
        value={name}
        onChange={onChange}
        checked={checked}
        cardNumber={cardNumber}
      />
      <RadioButton>
        <RadioFill checked={checked} />
      </RadioButton>
      <img src="/bankLogo/masterLogo.png" alt={name} style={{ width: '70px', height: '40px', padding: '0px', margin: '10px', borderWidth: '1px' }} />
      {name}
    </RadioContainer>
  );
};

export default CardRadioButton;
