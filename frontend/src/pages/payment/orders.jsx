import React from "react";
import Customer_Navbar from "../../components/customer_navbar";
import Checkout_Item_List from "../payment/components/Checkout_Item_List";
import { GlobalContext } from "../../context";
import { useContext } from "react";
import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    min-height: 100vh;
    width: 100%;
    margin: 0 auto;
    background-color: #F9F9F9;
    padding-bottom: 50px;
`;

const Text = styled.p`
    font-family: Inter;
    font-size: 18px;
    font-weight: regular;
`

const Wrapper = styled.div`
    border: 0.5px solid #C2C0FF;
    width: 90%;
    background-color: #FFFFFF;
    padding: 20px 40px;
`;

const Column = styled.div`
    width: ${({ width }) => width};
    flex-shrink: 0;
`;

const Bold = styled.p`
    font-weight: bold;
`;

const Light = styled.p`
    font-weight: 300;
    opacity: 0.6;
`

const PaymentButton = styled.button`
    border: 1px solid #0F60FF;
    color: #0F60FF;
    padding: 10px 20px;
    cursor: pointer;
    margin-left: 20px;
    background-color: ${({ selected }) => (selected ? "#0F60FF" : "transparent")};
    color: ${({ selected }) => (selected ? "#FFFFFF" : "#0F60FF")};
`

const PaymentContent = styled.div`
    width: 100%;
    display: ${({ selected }) => (selected ? "flex" : "none")};
    flex-direction: column;
    align-items: center;
`;

export default function Orders() {
    const { cartItems } = useContext(GlobalContext);
    const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
    const orderTotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

    const navigation = useNavigate();

    const handleOrderReceived = () => {
            navigation("/customer/products");
    };

    const CheckoutList = () => {
        return (
            <div style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center"}}>
                <Wrapper style={{ display: "flex"}}>
                    <Column width="40%"><Text style={{ marginRight: "auto" }}><Light>Product</Light></Text></Column>
                    <Column width="20%"><Text style={{ marginRight: "auto" }}><Light>Unit Price</Light></Text></Column>
                    <Column width="20%"><Text style={{ marginRight: "auto" }}><Light>Quantity</Light></Text></Column>
                    <Column width="20%"><Text style={{ marginRight: "auto" }}><Light>Total Price</Light></Text></Column>
                </Wrapper>
                <Wrapper>
                    <Checkout_Item_List
                        style={{ backgroundColor: "white" }}
                        checkoutItems={cartItems}
                    />
                </Wrapper>
            </div>
        )
    }

    return (
        <Container>
            <Customer_Navbar />
            <div style={{ width: "90%", marginTop: "8%"}} >
                <Text style={{ fontSize: "32px", fontWeight: "bold", marginRight: "auto", marginBottom: "30px" }}>Orders</Text>       
            </div>
            <CheckoutList />
            <Wrapper style={{ display: "flex" }}>
                <Column width="70%"></Column>
                <Column width="10%"><Text style={{ marginRight: "auto", marginTop: "15px" }}><Bold>Order Total</Bold></Text></Column>
                <Column width="20%"><Text style={{ marginRight: "auto", color: "#0F60FF", fontSize: "38px" }}>RM {(orderTotal + 5).toFixed(2)}</Text>
                <PaymentButton style={{ backgroundColor: "#0F60FF", color: "white", width: "90%", margin: "0"}} onClick={() => handleOrderReceived()}>Order Received</PaymentButton></Column>
            </Wrapper>
        </Container>
    )
}