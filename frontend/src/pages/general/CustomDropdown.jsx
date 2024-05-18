import React from "react";
import styled from "styled-components";

const StyledLabel = styled.label`
    font-size: 14px;
    font-weight: Regular;
    color: #666666;
    display: block;
    margin-bottom: 5px;
`;

const StyledSelect = styled.select`
    border-radius: 12px;
    border: 1px solid #666666;
    opacity: 0.35;
    padding: 10px;
    height: 40px; 
    width: 100%;
`;


const CustomDropdownContainer = styled.div`
    width: ${(props) => props.size};
    
    margin-bottom: 10px;
    margin-right: 10px;

    &:last-child {
        margin-right: 0;
    }
`;

const CustomDropdown = ({ title, value, setValue, options, size }) => {
    const handleChange = (e) => {
        if (setValue) {
            setValue(e.target.value);
        }
    };

    return (
        <CustomDropdownContainer size={size}>
            <StyledLabel>{title}</StyledLabel>
            <StyledSelect value={value} onChange={handleChange}>
                {options.map((option, index) => (
                    <option key={index} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </StyledSelect>
        </CustomDropdownContainer>
    );
};

export default CustomDropdown;
