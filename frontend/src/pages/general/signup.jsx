import React, { useContext, useState } from "react";
import { GlobalContext } from "../../context";
import { useNavigate } from "react-router-dom";
import CustomInput from "./CustomInput";
import CustomButton from "./CustomButton";
import styled from "styled-components";

const Container = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: stretch;
    padding: 0;
    margin: 0;
    overflow: hidden;
    height: 100vh;
`

const StyledLogo = styled.img`
    width: 439px;
    height: 391px;
    margin-bottom: 20px;
`

const TagLine = styled.h1`
    font-size: 36px;
    font-weight: bold;
    color: #7450DF;
    margin-bottom: 15px;
`

const TagLineContent = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-end;
    margin-right: 7%;
    margin-top: 8%;
    background-color: white;
`
const FormContainer  = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    width: 50%;
    height: 100%;
    background-color: #E5E5E5;
`

function SignUp() {
  return (
    <Container>
      <TagLineContent>
        <StyledLogo src="./SyopiLogo2.png"></StyledLogo>
        <TagLine>Empowering Campus Commerce: <br/> Connect, Sell, Shop, Thrive! </TagLine>
      </TagLineContent>
      <FormContainer>
        <CustomInput type="text" placeholder="Full Name" />
        <CustomInput type="email" placeholder="Email" />
        <CustomInput type="password" placeholder="Password" />
        <CustomButton text="Sign Up" />
      </FormContainer>
    </Container>
  )
}

export default SignUp
