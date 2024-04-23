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

const Button = styled.button`
    padding: 10px 20px;
    background-color: #0F60FF;
    color: #fff;
    border: none;
    cursor: pointer;
`;

const EditAddressModal = ({ isOpen, onClose, onSave, name, address, phoneNumber }) => {
    const [editedName, setEditedName] = useState(name);
    const [editedAddress, setEditedAddress] = useState(address);
    const [editedPhoneNumber, setPhoneNumber] = useState(phoneNumber);

    const handleSave = () => {
        onSave(editedName, editedAddress);
        onClose();
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
                <Button onClick={handleSave}>Save</Button>
            </ModalContent>
        </ModalBackground>
    );
};

export default EditAddressModal;
