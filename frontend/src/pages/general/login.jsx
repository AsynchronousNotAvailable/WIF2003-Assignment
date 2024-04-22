// Login.jsx
import React, { useContext, useState } from "react";
import { GlobalContext } from "../../context";
import { useNavigate } from "react-router-dom";
import CustomInput from "./CustomInput";
import styled from "styled-components";

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

    const LoginForm = () => {
        return (
            <div>
                <CustomInput title="Email Address" type="text" value={emailAddress} onChange={(e) => setEmailAddress(e.target.value)} placeholder="Enter your email address" />
                <CustomInput title="Password" type="text" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" />
                <button onClick={handleLogin}>Login</button>
            </div>
        );
    }

    return (
        <div>
            <img src="/SyopiLogo.png" alt="logo" />
            <TagLine>Empowering Campus Commerce: <br/> Connect, Sell, Shop, Thrive! </TagLine>
            <SmallText>Welcome back! Please login to your account.</SmallText>
            <LoginForm />
        </div>
    );
}

export default Login;
