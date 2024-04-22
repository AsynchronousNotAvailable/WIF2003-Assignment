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
`

const SmallText = styled.p`
    font-size: 18px;
    font-family: Inter;
    font-weight: 300;
    opacity: 0.6;
    margin: 10px 0;
    opacity: ${({ withOpacity }) => withOpacity ? '0.6' : '1.0'};
`

function SignUp() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigation = useNavigate();
  const handleForgotPassword = () => {
    navigation("/forgot-password");
  }

  const handleLogin = () => { 
    navigation("/login");
  }

  const handleSignUp = () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match");
    }
    else {
      // API call to create a new user
    }
  }

    const LoginForm = () => {
      return (
        <div style={{ width: "80%" }}>
            <div style={{ display: "flex"}}>
                <CustomInput title="First Name" type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="Enter your first name" size="80%" />
                <CustomInput title="Last Name" type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Enter your last name" size="80%" />
            </div>
            <CustomInput title="Email Address" type="text" value={emailAddress} onChange={(e) => setEmailAddress(e.target.value)} placeholder="Enter your email address" size="100%" />
            <div style={{ display: "flex"}}>
                <CustomInput title="Password" type="text" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" size="100%" />
                <CustomInput title="Confirm Password" type="text" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm your password" size="100%" />
            </div>
            <div style={{ textAlign: "right" }}>
                <SmallText withOpacity onClick={handleForgotPassword} style={{ display: "inline-block", marginLeft: "auto", cursor: "pointer" }}>Forgot Password?</SmallText>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", width: "60%", marginBottom: "30px" }}>
                <CustomButton text="Login" backgroundColor="#7450DF" borderColor="#7450DF" textColor="white" width="45%" onClick={handleLogin} />
                <CustomButton text="Sign Up" backgroundColor="white" borderColor="#7450DF" textColor="#7450DF" width="45%" onClick={handleSignUp} />
            </div>
        </div>
    );
    }

    return (
      <Container>
        <TagLineContent>
          <StyledLogo src="./SyopiLogo2.png"></StyledLogo>
          <TagLine>Empowering Campus Commerce:</TagLine>
          <TagLine>Connect, Sell, Shop, Thrive! </TagLine>
        </TagLineContent>
        <FormContainer>
          <LoginForm/>
        </FormContainer>
      </Container>
    )
}

export default SignUp
