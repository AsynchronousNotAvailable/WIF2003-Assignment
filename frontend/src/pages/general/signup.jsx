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
    color: #5489FC;
    margin-bottom: 15px;
`

const TagLineContent = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-end;
    margin-right: 0;
    margin-top: 10%;
    background-color: white;
`
const FormContainer  = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 60%;
`

const FormWrapper = styled.div`
    width: 80%;
    height: 70%;
    padding: 50px;
    border-radius: 24px;
    box-shadow: 0px 15px 25px rgba(0, 0, 0, 0.25);
    border-left: 30px solid #ADC8FC;
`;

const SmallText = styled.p`
    font-size: 18px;
    font-family: Inter;
    font-weight: 300;
    opacity: 0.6;
    margin: 10px 0;
    opacity: ${({ withOpacity }) => withOpacity ? '0.6' : '1.0'};
`

const LoginLink = styled.a`
    text-decoration: underline;
    cursor: pointer;

    &:hover {
        font-weight: bold;
    }
`;

const TogglePassword = styled.input`
`;

const PasswordLabel = styled.label`
    font-size: 14px;
    margin-left: 5px;
`;

function SignUp() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigation = useNavigate();
  const { userDetails, setUserDetails } = useContext(GlobalContext);

  const handleLogin = () => { 
    if (userDetails.emailAddress.includes("seller")) {
      navigation("/product_management");
    }
    else {
      navigation("/marketplace");
    }
    
  }

  const handleSignUp = () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match");
    }
    else {
      // API call to create a new user
      setUserDetails({ firstName, lastName, emailAddress, password });
      console.log(userDetails);
      navigation("/");
    }
  }

  const [showPassword, setShowPassword] = useState(false);
      const handlePasswordToggle = () => {
        setShowPassword(!showPassword);
    };

    return (
      <Container>
        <TagLineContent>
          <StyledLogo src="./SyopiLogo2.png"></StyledLogo>
          <TagLine>Empowering Campus Commerce:</TagLine>
          <TagLine>Connect, Sell, Shop, Thrive! </TagLine>
        </TagLineContent>
        <FormContainer>
          <FormWrapper>
            <SmallText style={{ fontSize: "32px", fontWeight: "medium" }}>Create an account</SmallText>
            <SmallText> Already have an account? <LoginLink onClick={handleLogin}>Log in</LoginLink></SmallText>
            <form style={{ width: "100%" }}>
                <div style={{ display: "flex"}}>
                    <CustomInput title="First Name" type="text" value={firstName} setValue={setFirstName} placeholder="Enter your first name" size="80%" />
                    <CustomInput title="Last Name" type="text" value={lastName} setValue={setLastName} placeholder="Enter your last name" size="80%" />
                </div>
                <CustomInput title="Email Address" type="email" value={emailAddress} setValue={setEmailAddress} placeholder="Enter your email address" size="100%" />
                <div style={{ display: "flex"}}>
                    <CustomInput title="Password" type={showPassword ? "text" : "password"} value={password} setValue={setPassword} placeholder="Enter your password" size="100%" />
                    <CustomInput title="Confirm Password" type={showPassword ? "text" : "password"} value={confirmPassword} setValue={setConfirmPassword} placeholder="Confirm your password" size="100%" />
                </div>
                <SmallText withOpacity style={{ fontSize: "14px" }}>Use 8 or more characters with a mix of letters, numbers & symbols</SmallText>
                <TogglePassword
                    type="checkbox"
                    onClick={handlePasswordToggle}
                />
                <PasswordLabel>Show Password</PasswordLabel>
            </form>
            <div style={{ display: "flex", width: "100%", justifyContent: "space-between", alignItems: "center", marginTop: "40px"}}>
              <LoginLink onClick={handleLogin}>log in instead</LoginLink>
              <CustomButton style={{ Opacity: "35%", marginRight: "auto"}} text="Create an account" backgroundColor="#666666" borderColor="none" textColor="white" width="45%" func={handleSignUp} />
            </div>
          </FormWrapper>
        </FormContainer>
      </Container>
    )
}

export default SignUp
