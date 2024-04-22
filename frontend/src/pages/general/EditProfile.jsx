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
    border-left: 30px solid #C8B6FF;
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

function EditProfile() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [shippingAddress, setShippingAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const navigation = useNavigate();

    const EditProfileForm = () => {
      return (
        <div style={{ width: "100%" }}>
            <div style={{ display: "flex"}}>
                <CustomInput title="First Name" type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="Enter your first name" size="80%" />
                <CustomInput title="Last Name" type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Enter your last name" size="80%" />
            </div>
            <CustomInput title="Email Address" type="text" value={emailAddress} onChange={(e) => setEmailAddress(e.target.value)} placeholder="Enter your email address" size="100%" />
            <CustomInput title="Contact Number" type="text" value={contactNumber} onChange={(e) => setEmailAddress(e.target.value)} placeholder="Enter your contact number" size="100%" />
            <CustomInput title="Shipping Address" type="text" value={shippingAddress} onChange={(e) => setEmailAddress(e.target.value)} placeholder="Enter your shipping address" size="100%" />
            <div style={{ display: "flex"}}>
                <CustomInput title="City" type="text" value={city} onChange={(e) => setCity(e.target.value)} placeholder="Enter your city" size="100%" />
                <CustomInput title="State" type="text" value={state} onChange={(e) => setState(e.target.value)} placeholder="Confirm your state" size="100%" />
            </div>
            <CustomInput title="Password" type="text" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" size="100%" />
        </div>
    );
    }

    return (
      <Container>
          <FormWrapper>
            <SmallText style={{ fontSize: "32px", fontWeight: "medium" }}>Edit profile</SmallText>
            <EditProfileForm/>
          </FormWrapper>
      </Container>
    )
}

export default EditProfile;
