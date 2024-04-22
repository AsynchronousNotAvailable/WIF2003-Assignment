import React from "react";
import Customer_Navbar from "../../components/customer_navbar";
import Checkout_Item_List from "../payment/components/Checkout_Item_List";
import { GlobalContext } from "../../context";
import { useContext } from "react";
import styled from "styled-components";

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
`

export default function Checkout() {
    const { cartItems } = useContext(GlobalContext);
    const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
    const orderTotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

    const CheckoutList = () => {
        return (
            <div style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center", marginBottom: "30px"}}>
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
                <Wrapper style={{ display: "flex"}}>
                    <Column width="60%"></Column>
                    <Column width="20%"><Text style={{ marginRight: "auto" }}><Bold>Doorstep Delivery</Bold></Text></Column>
                    <Column width="20%"><Text style={{ marginRight: "auto" }}><Light>RM 5.00</Light></Text></Column>
                </Wrapper>
                <Wrapper style={{ display: "flex"}}>
                    <Column width="60%"></Column>
                    <Column width="20%"><Text style={{ marginRight: "auto" }}><Bold>Order Total ({totalItems} item)</Bold></Text></Column>
                    <Column width="20%"><Text style={{ marginRight: "auto" }}><Light>RM {orderTotal.toFixed(2)}</Light></Text></Column>
                </Wrapper>
            </div>
        )
    }

    return (
        <Container>
            <Customer_Navbar />
            <div style={{ width: "90%", marginTop: "8%"}} >
                <Text style={{ fontSize: "32px", fontWeight: "bold", marginRight: "auto", marginBottom: "30px" }}>Checkout</Text>       
            </div>
            <Wrapper style={{ marginBottom: "30px"}}>
                <Text style={{ marginRight: "auto", color: "#0F60FF" }}>Delivery Address</Text>
                <Text style={{ marginRight: "auto" }}> <Bold>Tan Jun Xian (+60) 132068030</Bold> 121, Jalan 17/14, Seksyen 17, Petaling Jaya, 46400 Selangor. </Text>  
            </Wrapper>
            <CheckoutList />
            <Wrapper style={{ display: "flex", alignItems: "center"}}>
                <Column width="15%"><Text style={{ marginRight: "auto", fontSize: "16px" }}><Light>Payment Method</Light></Text></Column>
                <PaymentButton>Online Banking</PaymentButton>
                <PaymentButton>Credit/Debit Card</PaymentButton>
                <PaymentButton>TnG E-Wallet</PaymentButton>
                <PaymentButton>Cash On Delivery</PaymentButton>
            </Wrapper>
        </Container>
    )
}