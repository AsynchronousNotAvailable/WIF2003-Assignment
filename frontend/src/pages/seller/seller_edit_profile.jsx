import React, { useContext, useState, useEffect, useRef } from "react";
import { GlobalContext } from "../../context";
import { useNavigate } from "react-router-dom";
import CustomInput from "../general/CustomInput";
import CustomButton from "../general/CustomButton";
import styled from "styled-components";
import Seller_NavSidebar from "../../components/seller_sidebar";
import useSeller from "../../hooks/useSeller";
import { set } from "date-fns";
import seller_default_pfp from "../../assets/default_seller_image.png";
import axios from "axios";
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
  margin: 0;
  overflow: hidden;`
  ;

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
  opacity: ${({ withOpacity }) => (withOpacity ? "0.6" : "1.0")};
`;

function EditSellerProfile() {
  const fileInputRef = useRef(null);

  function selectFiles() {
    if (!isEdit) {
      return;
    }
    fileInputRef.current.click();
  }
  const { getSeller, saveSeller } = useSeller();
  const [seller, setSeller] = useState(getSeller());
  const [firstName, setFirstName] = useState(seller.firstName);
  const [lastName, setLastName] = useState(seller.lastName);
  const [emailAddress, setEmailAddress] = useState(seller.email);
  const [username, setUsername] = useState(seller.username);
  const [image, setImage] = useState(null);
  const [isEdit, setIsEdit] = useState(false);

  const textColor = isEdit ? "text-black" : "text-[#777980]";

  const hover = isEdit
    ? "hover:opacity-100 transition-opacity duration-300"
    : "";

  useEffect(() => {}, [isEdit]);

  const handleCancel = () => {
    if (!isEdit) {
      return;
    }
    if (window.confirm("Discard changes?")) {
      setIsEdit(() => false);
      setFirstName(() => seller.firstName);
      setLastName(() => seller.lastName);
      setEmailAddress(() => seller.email);
    }
  };

  function handleFirstNameChange(event) {
    setFirstName(() => event.target.value);
  }

  async function submitProfile() {
    const obj = {
      firstName: firstName,
      lastName: lastName,
      email: emailAddress,
      pfp: image,
    };
    try {
      axios
        .put(`http://localhost:8080/api/sellers/${username}/editProfile`, obj)
        .then((response) => {
          window.alert("Profile edited successfully");
          saveSeller(response.data);
        });
    } catch (err) {
      console.log(err);
    }
  }

  function handleSaveEditClick() {
    if (isEdit) {
      submitProfile();
      setIsEdit(() => false);
    } else {
      setIsEdit(() => true);
    }
  }

  function handleLastNameChange(event) {
    setLastName(() => event.target.value);
  }

  function handleEmailAddressChange(event) {
    setEmailAddress(() => event.target.value);
  }

  async function onFilesSelect(event) {
    const files = event.target.files;
    if (files.length === 0) return false;
    if (files[0].type.split("/")[0] !== "image") return false;
    const base64 = await convertToBase64(files[0]);
    setImage(base64);
  }

  async function convertToBase64(file) {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => reject(error);
    });
  }

  function handleImageClick(event) {}

  return (
    <>
      <Seller_NavSidebar />
      <Container>
        <div className="ml-64 mt-[70px]">
          <SmallText style={{ fontSize: "32px", fontWeight: "medium" }}>
            Edit profile
          </SmallText>
          <div className="flex justify-center items-center">
            <div className="relative w-64 h-64 justify-center items-center">
              <img
                src={
                  image == undefined || image == "" ? seller_default_pfp : image
                }
                alt="Profile"
                className="w-full h-full object-cover rounded-lg"
              />
              <div
                className={`absolute inset-0 bg-black bg-opacity-50 flex items-center content-center 
                    justify-center opacity-0 rounded-lg ${hover}`}
              >
                <button
                  onClick={selectFiles}
                  className="text-white bg-blue-500 px-4 py-2 rounded"
                >
                  Change Profile Picture?
                </button>
              </div>
              <input
                className="hidden"
                type="file"
                ref={fileInputRef}
                accept="image/*"
                onChange={onFilesSelect}
              />
            </div>
          </div>
          <div className="w-full mt-[20px]">
            <h3 className="font-normal text-[#777980] text-base">Username</h3>
            <input
              id="first-name"
              className="mb-2 h-8 w-full border-2 me-4 border-border-grey ps-2 rounded-lg text-[#AAA7AD]"
              type="text"
              placeholder="Enter product quantity here..."
              value={username}
              onChange={null}
              readOnly="true"
            ></input>
          </div>
          <div className="flex w-full">
            <div className="w-1/2 mr-5 pb-2">
              <h3 className="font-normal text-[#777980] text-base">
                First name
              </h3>
              <input
                id="first-name"
                className={`mb-2 h-8 w-full border-2 me-4 border-border-grey ps-2 rounded-lg ${textColor}`}
                type="text"
                placeholder="Enter product quantity here..."
                value={firstName}
                onChange={handleFirstNameChange}
                readOnly={!isEdit}
              ></input>
            </div>
            <div className="w-1/2 float-left">
              <h3 className="font-normal text-[#777980] text-base">
                Last name
              </h3>
              <input
                id="last-name"
                className={`mb-2 h-8 w-full border-2 me-4 border-border-grey ps-2 rounded-lg ${textColor}`}
                type="text"
                placeholder="Enter product quantity here..."
                value={lastName}
                onChange={handleLastNameChange}
                readOnly={!isEdit}
              ></input>
            </div>
          </div>
          <h3 className="font-normal text-[#777980] text-base">
            Email Address
          </h3>
          <input
            id="email"
            className={`mb-2 h-8 w-full border-2 me-4 border-border-grey ps-2 rounded-lg ${textColor}`}
            type="text"
            placeholder="Enter product quantity here..."
            value={emailAddress}
            onChange={handleEmailAddressChange}
            readOnly={!isEdit}
          ></input>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              width: "100%",
              marginBottom: "30px",
              marginTop: "30px",
            }}
          >
            <button
              type="button"
              onClick={handleSaveEditClick}
              className="flex w-20 bg-[#DC2626] rounded-[20px] h-8 mr-0 mb-0 items-center justify-center mr-[20px]"
            >
              <span className="text-white">{isEdit ? "Save" : "Edit"}</span>
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="flex w-20 bg-[#DC2626] rounded-[20px] h-8 mr-0 mb-0 items-center justify-center"
            >
              <span className="text-white">Cancel</span>
            </button>{" "}
          </div>
        </div>
      </Container>
    </>
  );
}

export default EditSellerProfile;
