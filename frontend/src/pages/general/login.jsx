// Login.jsx
import React, { useContext, useState } from "react";
import { GlobalContext } from "../../context";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const TagLine = styled.h1`
    font-size: 36px;
    font-weight: bold;
    color: #7450DF;
`

function Login() {
    const [username, setUsername] = useState("");
    const { setIsAuth, setIsSeller } = useContext(GlobalContext);
    const navigation = useNavigate();
    const handleLogin = () => {
        if (username === "seller") {
            setIsSeller(true);
            setIsAuth(true);
            navigation("/seller")

        } else if (username === "customer") {
            setIsAuth(true);
            navigation("/customer");
        } else {
            alert("Invalid username");
        }
    };

    const LoginForm = () => {
        return (
            <div>
                <input
                    style={{ border: "1px solid black" }}
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <button onClick={handleLogin}>Login</button>
            </div>
        );
    }

    return (
        <div>
            <img src="/SyopiLogo.png" alt="logo" />
            <TagLine>Empowering Campus Commerce: <br/> Connect, Sell, Shop, Thrive! </TagLine>
            <LoginForm />
            <input
                style={{ border: "1px solid black" }}
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <button onClick={handleLogin}>Login</button>
        </div>
    );
}

export default Login;
