import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const ModalBackground = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: ${({ open }) => (open ? "block" : "none")};
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

const ButtonContainer = styled.div`
    display: flex;
    margin-top: 20px;
    justify-content: flex-end;
`;

const Button = styled.button`
    padding: 10px 20px;
    background-color: #0f60ff;
    color: #fff;
    cursor: pointer;
    margin-left: 10px;
`;
const Text = styled.p`
    font-family: Inter;
    font-size: 18px;
    font-weight: regular;
    display: inline;
    vertical-align: middle;
`;

const SuccessModal = ({ isOpen, cancelModal, title, message, product }) => {
    const navigation = useNavigate();

    const goToProduct = () => {
        navigation(`/customer/product/${product._id}`, { state: { product } });
    };

    return (
        <ModalBackground open={isOpen}>
            <ModalContent>
                <Text style={{ fontWeight: "bold" }}>{title}</Text>
                <br />
                <br />
                <Text>{message}</Text>

                <ButtonContainer>
                    <Button
                        onClick={cancelModal}
                        style={{
                            backgroundColor: "white",
                            color: "#0f60ff",
                            borderColor: "#0f60ff",
                            borderWidth: "1px",
                        }}
                    >
                        OK
                    </Button>
                    <Button onClick={goToProduct}>Go to product</Button>
                </ButtonContainer>
            </ModalContent>
        </ModalBackground>
    );
};

export default SuccessModal;
