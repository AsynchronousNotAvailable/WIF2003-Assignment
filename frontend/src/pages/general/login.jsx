// Login.jsx
import React, { useContext, useState, useEffect } from "react";
import { GlobalContext } from "../../context";
import { useNavigate } from "react-router-dom";
import CustomInput from "./CustomInput";
import CustomButton from "./CustomButton";
import styled from "styled-components";
import GLogin from "./GoogleLogin";
import axios from "axios";

const Container = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: stretch;
    padding: 0;
    margin: 0;
    overflow: hidden;
    height: 100vh;
`;

const Content = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    margin-left: 7%;
    margin-top: 8%;
    background-color: white;
`;
const GraphicContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    width: 50%;
    height: 100%;
    background-color: #e5e5e5;
`;

const Graphic = styled.img`
    max-width: 80%;
    max-height: 80%;
`;

const StyledLogo = styled.img`
    width: 269px;
    height: 77px;
    margin-bottom: 20px;
`;

const TagLine = styled.h1`
    font-size: 36px;
    font-weight: bold;
    color: #5489fc;
    margin-bottom: 15px;
`;

const SmallText = styled.p`
    font-size: 18px;
    font-family: Inter;
    font-weight: 300;
    opacity: 0.6;
    margin: 10px 0;
    opacity: ${({ withOpacity }) => (withOpacity ? "0.6" : "1.0")};
`;

const SocialLink = styled.a`
    color: #5489fc;
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
    const [password, setPassword] = useState("");
    const {
        
        setIsSeller,
        userDetails,
        setUserDetails,
        customer,
        setCustomer,
        seller,
        setSeller,
    } = useContext(GlobalContext);
    const [redirectToMarketplace, setRedirectToMarketplace] = useState(false);
    const navigation = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        const loginData = {
            emailAddress: emailAddress,
            password: password,
        };

        let response;
        
        //change port number for functions below 

        if (loginData.emailAddress.includes("seller")) {
            response = await axios.post(
                `http://localhost:5000/api/sellers/login`,
                loginData
            );
        }
        else {
            response = await axios.post(
                `http://localhost:5000/api/customers/login`,
                loginData
            );
        }

        console.log(response.data);

        if (response.status === 200) {
            if (response.data.customer) {
                setCustomer(response.data.customer);
                navigation(`/marketplace`);
            } else {
                setSeller(response.data.seller);
                navigation("/product_management");
            }
        }

        
    };

    const handleGLogin = (profileObj) => {
        const firstName = profileObj.givenName;
        const lastName = profileObj.familyName;
        const Gpassword = profileObj.googleId;
        const GemailAddress = profileObj.email;
        setUserDetails({ firstName, lastName, GemailAddress, Gpassword });
        setRedirectToMarketplace(true);
        console.log("im triggered");
    };

    useEffect(() => {
        if (redirectToMarketplace) {
            navigation("/marketplace");
        }
    }, [redirectToMarketplace, navigation]);

    const handleSignUp = () => {
        navigation("/signup");
    };
    const handleForgotPassword = () => {
        navigation("/forgot-password");
    };

    return (
        <Container>
            <Content>
                <StyledLogo src="/SyopiLogo.png" alt="logo" />
                <TagLine>
                    Empowering Campus Commerce: <br /> Connect, Sell, Shop,
                    Thrive!{" "}
                </TagLine>
                <SmallText withOpacity>
                    Welcome back! Please login to your account.
                </SmallText>
                <form onSubmit={handleLogin} style={{ width: "80%" }}>
                    <CustomInput
                        title="Email Address"
                        type="email"
                        value={emailAddress}
                        setValue={setEmailAddress}
                        placeholder="Enter your email address"
                        size="100%"
                    />
                    <CustomInput
                        title="Password"
                        type="password"
                        value={password}
                        setValue={setPassword}
                        placeholder="Enter your password"
                        size="100%"
                    />
                    <div style={{ textAlign: "right" }}>
                        <SmallText
                            withOpacity
                            onClick={handleForgotPassword}
                            style={{
                                display: "inline-block",
                                marginLeft: "auto",
                                cursor: "pointer",
                            }}
                        >
                            Forgot Password?
                        </SmallText>
                    </div>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            width: "60%",
                            marginBottom: "30px",
                        }}
                    >
                        <CustomButton
                            text="Login"
                            backgroundColor="#5489FC"
                            borderColor="#5489FC"
                            textColor="white"
                            width="45%"
                            type="submit"
                        />
                        <CustomButton
                            text="Sign Up"
                            backgroundColor="white"
                            borderColor="#5489FC"
                            textColor="#5489FC"
                            width="45%"
                            func={handleSignUp}
                        />
                    </div>
                </form>
                <div>
                    <SmallText
                        style={{ display: "flex", alignItems: "center" }}
                    >
                        Or login with
                        {/* <SocialLink>Facebook</SocialLink> */}
                        <div style={{ marginLeft: "20px" }}>
                            <GLogin func={handleGLogin} />
                        </div>
                    </SmallText>
                </div>
            </Content>
            <GraphicContainer>
                <Graphic src="/SyopiGraphic.png" alt="graphic" />
            </GraphicContainer>
        </Container>
    );
}

export default Login;
