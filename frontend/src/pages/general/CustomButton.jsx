import React from 'react';
import styled from "styled-components";

const StyledButton = styled.button`
    background-color: ${(props) => props.backgroundColor};
    border: 1px solid ${(props) => props.borderColor};
    color: ${(props) => props.textColor};
    padding: 10px;
    width: ${(props) => props.width};
    border-radius: 32px;
    cursor: pointer;
    margin-left: 10px;
`

const CustomButton = ({ text, backgroundColor, borderColor, textColor, width }) => {
    return (
        <StyledButton
            backgroundColor={backgroundColor}
            borderColor={borderColor}
            textColor={textColor}
            width={width}
        >
            {text}
        </StyledButton>
    );
}

export default CustomButton;