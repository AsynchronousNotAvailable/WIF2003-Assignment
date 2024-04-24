import React from "react";
import Customer_Navbar from "../../components/customer_navbar";
import Order_List from "./components/orderList";
import { GlobalContext } from "../../context";
import { useContext } from "react";
import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FloatingChat from "../customer/components/FloatingChat";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    min-height: 100vh;
    width: 100%;
    margin: 0 auto;
    background-color: #f9f9f9;
    padding-bottom: 50px;
`;

const Text = styled.p`
    font-family: Inter;
    font-size: 18px;
    font-weight: regular;
`;

const Wrapper = styled.div`
    border: 0.5px solid #c2c0ff;
    width: 90%;
    background-color: #ffffff;
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
`;

const Row = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
`;

const PaymentButton = styled.button`
    border: 1px solid #0f60ff;
    color: #0f60ff;
    padding: 10px 20px;
    cursor: pointer;
    margin-left: 20px;
    background-color: ${({ selected }) =>
        selected ? "#0F60FF" : "transparent"};
    color: ${({ selected }) => (selected ? "#FFFFFF" : "#0F60FF")};
`;

const Divider = styled.hr`
    border: none;
    border-top: 1px solid #666;
    opacity: 0.2;
    width: 100%;
    margin: 10px 0;
`;

export default function Orders() {
    const [chatName, setChatName] = useState("");
    const [activeChatContent, setActiveChatContent] = useState([]);
    const [floating, setFloating] = useState(false);
    const toggleFloatingChat = () => {
        setFloating(!floating);
    };

    const handleChatButtonClick = (name) => {
        // navigation("/customer/chat");
        handleChatClick(name);
        toggleFloatingChat();
    };
    const handleChatClick = (name) => {
        setChatName(name);
        if (name === "Koperasi_UM") {
            setActiveChatContent([
                {
                    type: "SELLER",
                    text: "Hello! This is Koperasi UM Customer Service. Anything enquiries?",
                },
            ]);
        } else if (name === "KK_Mart_UM") {
            setActiveChatContent([
                {
                    type: "SELLER",
                    text: "Hello! This is KK Mart Customer Service. Anything enquiries?",
                },
            ]);
        } else if (name === "UM_Sports_Direct") {
            setActiveChatContent([
                {
                    type: "SELLER",
                    text: "Hello! This is UM Sport Direct Customer Service. Anything enquiries?",
                },
            ]);
        } else if (name === "Zus_Coffee_UM") {
            setActiveChatContent([
                {
                    type: "SELLER",
                    text: "Hello! This is Zus Coffee UM Customer Service. Anything enquiries?",
                },
            ]);
        }
    };

    const goBackToChatList = () => {
        setChatName("");
    };
    const { orderHistory, updateOrderStatus } = useContext(GlobalContext);
    const navigation = useNavigate();

    const handleOrderReceived = (orderId) => {
        updateOrderStatus(orderId, "Order Received.");
    };

    const sortedOrders = orderHistory
        .slice()
        .sort((a, b) => b.timestamp - a.timestamp);

    return (
        <Container>
            <Customer_Navbar />
            <div style={{ width: "90%", marginTop: "8%" }}>
                <Text
                    style={{
                        fontSize: "32px",
                        fontWeight: "bold",
                        marginRight: "auto",
                        marginBottom: "30px",
                    }}
                >
                    Orders
                </Text>
            </div>
            {sortedOrders.map((order, index) => (
                <Wrapper key={index} style={{ marginBottom: "20px" }}>
                    <Row>
                        <Column width="40%">
                            <Text>
                                <Light>Order ID: {order.orderId}</Light>
                            </Text>
                        </Column>
                        <Column width="30%">
                            <Text>
                                <Light>Seller</Light>
                            </Text>
                        </Column>
                        <Column width="30%">
                            <Text>
                                <Bold
                                    style={{
                                        textAlign: "right",
                                        color: "#0F60FF",
                                    }}
                                >
                                    {order.status}
                                </Bold>
                            </Text>
                        </Column>
                    </Row>
                    <Divider />
                    <Order_List
                        style={{ backgroundColor: "white" }}
                        items={order.orderItems}
                        handleChatButtonClick={handleChatButtonClick}
                    />
                    <Divider />
                    <Row>
                        <Column width="85%">
                            <Text>
                                <Bold style={{ textAlign: "right" }}>
                                    Order Total
                                </Bold>
                            </Text>
                        </Column>
                        <Column width="15%">
                            <Text>
                                <Light
                                    style={{
                                        color: "#0F60FF",
                                        fontSize: "38px",
                                        textAlign: "right",
                                    }}
                                >
                                    RM {order.orderPrice.toFixed(2)}
                                </Light>
                            </Text>
                        </Column>
                    </Row>
                    {order.status !== "Order Received." && (
                        <Row>
                            <PaymentButton
                                style={{
                                    backgroundColor: "#0f60ff",
                                    color: "white",
                                    width: "20%",
                                    marginLeft: "auto",
                                }}
                                onClick={() =>
                                    handleOrderReceived(order.orderId)
                                }
                            >
                                Order Received
                            </PaymentButton>
                        </Row>
                    )}
                </Wrapper>
            ))}
            {chatName !== "" && (
                <FloatingChat
                    activeChat={chatName}
                    activeChatContent={activeChatContent}
                    goBackToChatList={goBackToChatList}
                />
            )}
        </Container>
    );
}
