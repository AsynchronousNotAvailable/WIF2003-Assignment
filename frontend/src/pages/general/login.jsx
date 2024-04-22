// Login.jsx
import React, { useContext, useState } from "react";
import { GlobalContext } from "../../context";
import { useNavigate } from "react-router-dom";
import CustomInput from "./CustomInput";
import CustomButton from "./CustomButton";
import styled from "styled-components";

const StyledLogo = styled.img`
    width: 269px;
    height: 77px;
    margin-bottom: 20px;
`

const TagLine = styled.h1`
    font-size: 36px;
    font-weight: bold;
    color: #7450DF;
`

const SmallText = styled.p`
    font-size: 18px;
    // font inter, with 60% opacitym, black in color
    font-family: Inter;
    font-weight: 300;
    opacity: 0.6;
`

function Login() {
    const [emailAddress, setEmailAddress] = useState("");
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
            navigation("/customer");
        } else {
            alert("Invalid username");
        }
    };
    const handleSignUp = () => {
        navigation("/signup");
    };

    const LoginForm = () => {
        return (
            <div>
                <CustomInput title="Email Address" type="text" value={emailAddress} onChange={(e) => setEmailAddress(e.target.value)} placeholder="Enter your email address" size="35%"/>
                <CustomInput title="Password" type="text" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" size="35%" />
                <CustomButton text="Login" backgroundColor="#7450DF" borderColor="#7450DF" textColor="white" width="10%" onClick={handleLogin} />
                <CustomButton text="Sign Up" backgroundColor="white" borderColor="#7450DF" textColor="#7450DF" width="10%" onClick={handleSignUp} />
            </div>
        );
    }

    return (
        <div>
            <StyledLogo src="/SyopiLogo.png" alt="logo" />
            <TagLine>Empowering Campus Commerce: <br/> Connect, Sell, Shop, Thrive! </TagLine>
            <SmallText>Welcome back! Please login to your account.</SmallText>
            <LoginForm />
        </div>
    );
}

export default Login;
