import React from "react";
import Customer_Navbar from "../../components/customer_navbar";
import Order_List from "./components/orderList";
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

const Row = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
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
    const { orderHistory } = useContext(GlobalContext);
    const navigation = useNavigate();

    const handleOrderReceived = () => {
            navigation("/marketplace");
    };

    return (
        <Container>
            <Customer_Navbar />
            <div style={{ width: "90%", marginTop: "8%"}} >
                <Text style={{ fontSize: "32px", fontWeight: "bold", marginRight: "auto", marginBottom: "30px" }}>Orders</Text>       
            </div>
            {orderHistory.map((order, index) => (
                <Wrapper key={index}>
                    <Row>
                        <Column width="40%"><Text><Light>Order ID: {order.orderId}</Light></Text></Column>
                        <Column width="30%"></Column>
                        <Column width="30%"><Text><Bold style={{ textAlign: "right", color: "#0F60FF" }}>{order.status}</Bold></Text></Column>
                    </Row>
                    <Order_List
                        style={{ backgroundColor: "white" }}
                        items={order.orderItems}
                    />
                    <Row>
                        <Column width="85%"><Text><Bold style={{ textAlign: "right" }}>Order Total</Bold></Text></Column>
                        <Column width="15%"><Text><Light style={{ color: "#0F60FF", fontSize: "38px", textAlign: "right" }}>RM {order.orderPrice.toFixed(2)}</Light></Text></Column>
                    </Row>
                    <Row>
                        <PaymentButton style={{ backgroundColor: "#0F60FF", color: "white", width: "20%", marginLeft: "auto" }} onClick={() => handleOrderReceived()}>Order Received</PaymentButton>
                    </Row>
                </Wrapper>
            ))}
        </Container>
    )
}