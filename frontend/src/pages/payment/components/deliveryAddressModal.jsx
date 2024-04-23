import React, { useState } from 'react';
import styled from 'styled-components';

const ModalBackground = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: ${({ open }) => (open ? 'block' : 'none')};
    z-index: 999;
`;

const ModalContent = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    padding: 20px;
    border-radius: 5px;
`;

const InputField = styled.input`
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
`;

const ButtonContainer = styled.div`
    display: flex;
    margin-top: 20px;
`;

const Button = styled.button`
    padding: 10px 20px;
    background-color: #0F60FF;
    color: #fff;
    border: none;
    cursor: pointer;
    margin-left: auto; 
`;

const EditAddressModal = ({ isOpen, name, address, phoneNumber, onSave }) => {
    const [editedName, setEditedName] = useState(name);
    const [editedAddress, setEditedAddress] = useState(address);
    const [editedPhoneNumber, setPhoneNumber] = useState(phoneNumber);

    const handleSave = () => {
        onSave(editedName, editedPhoneNumber, editedAddress);
    };

    return (
        <ModalBackground open={isOpen}>
            <ModalContent>
                <InputField
                    type="text"
                    value={editedName}
                    onChange={(e) => setEditedName(e.target.value)}
                    placeholder="Name"
                />
                <InputField
                    type="text"
                    value={editedPhoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="Phone Number"
                />
                <InputField
                    type="text"
                    value={editedAddress}
                    onChange={(e) => setEditedAddress(e.target.value)}
                    placeholder="Delivery Address"
                />
                <ButtonContainer>
                    <Button onClick={handleSave}>Save</Button>
                </ButtonContainer>
            </ModalContent>
        </ModalBackground>
    );
};

export default EditAddressModal;
