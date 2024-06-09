import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomInput from "./CustomInput";
import CustomButton from "./CustomButton";
import styled from "styled-components";

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0;
    margin: 0;
    overflow: hidden;
    height: 100vh;
`

const FormWrapper = styled.div`
    width: 55%;
    height: 80%;
    padding: 30px 70px;
    border-radius: 24px;
    box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.15);
`;

const SmallText = styled.p`
    font-size: 18px;
    font-family: Inter;
    font-weight: 300;
    opacity: 0.6;
    margin: 10px 0;
    opacity: ${({ withOpacity }) => withOpacity ? '0.6' : '1.0'};
`

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

    const handleSave = () => {
        alert("Profile updated successfully");  
        navigation("/customer");
    }

    const handleCancel = () => {
        navigation("/customer");
    }

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
            <div style={{ display: "flex", justifyContent: "center", width: "100%", marginBottom: "30px", marginTop: "30px" }}>
                <CustomButton text="Save" backgroundColor="#7450DF" borderColor="#7450DF" textColor="white" width="20%" onClick={handleSave} />
                <CustomButton text="Cancel" backgroundColor="white" borderColor="#7450DF" textColor="#7450DF" width="20%" onClick={handleCancel} />
            </div>
          </FormWrapper>
      </Container>
    )
}

export default EditProfile;
