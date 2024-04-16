import React from "react";
import { useNavigate } from "react-router-dom";
function Landing() {
    const navigation = useNavigate(); // useNavigate should be called outside the event handler
    const toLogin = () => {
        navigation("/login"); // Call navigation directly with the path
    };
    return (
        <div>
            This is a landing page
            <br/>
            <button onClick={toLogin}>Login</button>
        </div>
    );
}
export default Landing;
