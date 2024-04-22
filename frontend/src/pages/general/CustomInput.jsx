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
    width: 35%;
    margin-bottom: 10px;
`

const CustomInput = ({ title, type, value, onChange, placeholder }) => {  
    return (
        <CustomInputContainer>
            <StyledLabel>{title}</StyledLabel>
            <StyledInput
                style={{ border: "1px solid black" }}
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
            />
        </CustomInputContainer>
    );
}

export default CustomInput;