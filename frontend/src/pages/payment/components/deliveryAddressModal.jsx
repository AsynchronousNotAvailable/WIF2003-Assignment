import React, { useState } from 'react';
import styled from 'styled-components';
import { useEffect } from 'react';

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

const EditAddressModal = ({ isOpen, shippingAddress, onSave }) => {
    const [editedAddress, setEditedAddress] = useState(shippingAddress);

    useEffect(() => {
        setEditedAddress(shippingAddress);
    }, [shippingAddress]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedAddress(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSave = () => {
        onSave(editedAddress);
    };

    return (
        <ModalBackground open={isOpen}>
            <ModalContent>
                <InputField
                    type="text"
                    name="receiverName"
                    value={editedAddress.receiverName}
                    onChange={handleChange}
                    placeholder="Name"
                />
                <InputField
                    type="text"
                    name="receiverPhoneNumber"
                    value={editedAddress.receiverPhoneNumber}
                    onChange={handleChange}
                    placeholder="Phone Number"
                />
                <InputField
                    type="text"
                    name="street"
                    value={editedAddress.street}
                    onChange={handleChange}
                    placeholder="Street"
                />
                <InputField
                    type="text"
                    name="city"
                    value={editedAddress.city}
                    onChange={handleChange}
                    placeholder="City"
                />
                <InputField
                    type="text"
                    name="state"
                    value={editedAddress.state}
                    onChange={handleChange}
                    placeholder="State"
                />
                <InputField
                    type="text"
                    name="zipCode"
                    value={editedAddress.zipCode}
                    onChange={handleChange}
                    placeholder="Zip Code"
                />
                <InputField
                    type="text"
                    name="country"
                    value={editedAddress.country}
                    onChange={handleChange}
                    placeholder="Country"
                />
                <ButtonContainer>
                    <Button onClick={handleSave}>Save</Button>
                </ButtonContainer>
            </ModalContent>
        </ModalBackground>
    );
};

export default EditAddressModal;
