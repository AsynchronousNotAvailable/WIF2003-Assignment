// Login.jsx
import React, { useContext, useState, useRef, useEffect } from "react";
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

const Content = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    margin-left: 7%;
    margin-top: 8%;
    background-color: white;
`
const GraphicContainer  = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    width: 50%;
    height: 100%;
    background-color: #E5E5E5;
`

const Graphic = styled.img`
    max-width: 80%;
    max-height: 80%;
`

const StyledLogo = styled.img`
    width: 269px;
    height: 77px;
    margin-bottom: 20px;
`

const TagLine = styled.h1`
    font-size: 36px;
    font-weight: bold;
    color: #7450DF;
    margin-bottom: 15px;
`

const SmallText = styled.p`
    font-size: 18px;
    font-family: Inter;
    font-weight: 300;
    opacity: 0.6;
    margin: 10px 0;
    opacity: ${({ withOpacity }) => withOpacity ? '0.6' : '1.0'};
`

const SocialLink = styled.a`
    color: #7450DF;
    text-decoration: none;
    font-weight: bold;
    cursor: pointer;
    margin-right: 30px;

    &:last-child {
        margin-right: 0;
    }

    &:first-child {
        margin-left: 30px;
    }

    &:hover {
        text-decoration: underline;
    }
`;

function Login() {
    const [emailAddress, setEmailAddress] = useState("");
    console.log(emailAddress)
    const [password, setPassword] = useState("");
    const { setIsAuth, setIsSeller } = useContext(GlobalContext);
    const navigation = useNavigate();
   
    const handleLogin = () => {
        if (emailAddress === "seller") {
            setIsSeller(true);
            setIsAuth(true);
            navigation("/seller")

        } else if (emailAddress === "customer") {
            setIsAuth(true);
            navigation("/marketplace");
        } else {
            alert("Invalid username");
        }
    };
    const handleSignUp = () => {
        navigation("/signup");
    };
    const handleForgotPassword = () => {
        navigation("/forgot-password");
    }

    const LoginForm = () => {
        
        return (
            
            <div style={{ width: "80%"}}>
                <CustomInput title="Email Address" type="text" value={emailAddress} onChange = {(e) => {setEmailAddress(e.target.value)}} placeholder="Enter your email address" size="100%"/>
                <CustomInput title="Password" type="text" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" size="100%" />
                <div style={{ textAlign: "right"}}>
                    <SmallText withOpacity onClick={handleForgotPassword} style={{ display: "inline-block", marginLeft: "auto", cursor: "pointer" }}>Forgot Password?</SmallText>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", width: "60%", marginBottom: "30px"}}>
                    <CustomButton text="Login" backgroundColor="#7450DF" borderColor="#7450DF" textColor="white" width="45%" onClick={handleLogin} />
                    <CustomButton text="Sign Up" backgroundColor="white" borderColor="#7450DF" textColor="#7450DF" width="45%" onClick={handleSignUp} />
                </div>
            </div>
        );
    }

    return (
        <Container>
            <Content>
                <StyledLogo src="/SyopiLogo.png" alt="logo" />
                <TagLine>Empowering Campus Commerce: <br/> Connect, Sell, Shop, Thrive! </TagLine>
                <SmallText withOpacity>Welcome back! Please login to your account.</SmallText>
                <LoginForm />
                <div>
                    <SmallText>Or login with <SocialLink>Facebook</SocialLink> <SocialLink>Google</SocialLink> </SmallText>
                </div>
            </Content>
            <GraphicContainer>
                <Graphic src="/SyopiGraphic.png" alt="graphic" />
            </GraphicContainer>
        </Container>
    );
}

export default Login;
