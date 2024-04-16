// Login.jsx
import React, { useContext, useState } from "react";
import { GlobalContext } from "../../context";
import { useNavigate } from "react-router-dom";

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

    return (
        <div>
            Login Page
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
