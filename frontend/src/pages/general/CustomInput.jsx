import React from 'react';
import styled from "styled-components";

const StyledLabel = styled.label`
    font-size: 14px;
    font-weight: Regular;
    color: #666666;
    display: block;
    margin-bottom: 5px;
`
const StyledInput = styled.input`
    border-radius: 5px;
    border: 1px solid #666666;
    opacity: 0.35;
    padding: 10px;
    width: 100%;
`
const CustomInputContainer = styled.div`
    width: ${(props) => props.size};
    margin-bottom: 10px;
`

const CustomInput = ({ title, type, value, onChange, placeholder, size }) => {  
    return (
        <CustomInputContainer
            size={size}>
            <StyledLabel>{title}</StyledLabel>
            <StyledInput
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
            />
        </CustomInputContainer>
    );
}

export default CustomInput;