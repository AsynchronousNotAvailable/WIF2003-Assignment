import React, { useEffect } from "react";
import Customer_Navbar from "../../components/customer_navbar";
import Order_List from "./components/orderList";
import { GlobalContext } from "../../context";
import { useContext } from "react";
import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FloatingChat from "../customer/components/FloatingChat";
import axios from "axios";
import useCustomer from "../../hooks/useCustomer";
import AddReviewModal from "./components/ReviewModal";
import SuccessModal from "./components/successModal";

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
    const [productReview, setProductReview] = useState("");
    const [floating, setFloating] = useState(false);
    const toggleFloatingChat = () => {
        setFloating(!floating);
    };
    const { getCustomer } = useCustomer();
    const [customer, setCustomer] = useState(getCustomer());
    const [orders, setOrders] = useState([]);
    const [fetchOrder, setFetchOrder] = useState(false);
    const [reviewModal, setReviewModal] = useState(false);
    const [successModal, setSuccessModal] = useState(false);
    useEffect(() => {
        fetchData();
    }, [fetchOrder]);

    const fetchData = async () => {
        const username = customer.username;
        //change port number
        try {
            const response = await axios.get(
                `http://localhost:1234/api/customers/${username}/orderHistory`
            );

            const products = response.data;
            setOrders(products);
        } catch (error) {
            console.log(error);
        }
    };

    const submitReview = async (reviewDetails) => {
        try {
            const username = customer.username;
            const response = await axios.post(
                `http://localhost:1234/api/customers/${username}/${productReview._id}/addReview`,
                reviewDetails
            );
            if (response.status === 200) {
                setReviewModal(false);
                setSuccessModal(true);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleChatButtonClick = (name) => {
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

    const handleOrderReceived = async (orderId) => {
        try {
            const customer = getCustomer();
            const username = customer.username;
            const receivalDetails = { time_received: new Date() };
            const response = await axios.put(
                `http://localhost:1234/api/customers/${username}/${orderId}/orderReceived`,
                receivalDetails
            );
        
            if (response.status === 200) {
                setFetchOrder(!fetchOrder);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const sortedOrders = orders
    .slice()
    .sort((a, b) => {
        if (a.status === b.status) {
            return b.timestamp - a.timestamp;
        }
        if (a.status === "Received") {
            return 1;
        }
        if (b.status === "Received") {
            return -1;
        }
        return 0;
    });

    return (
        <Container>
            <Customer_Navbar />
            <SuccessModal
                isOpen={successModal}
                cancelModal={() => setSuccessModal(false)}
                title="Review Submitted"
                message="Your review has been submitted successfully!"
                product={productReview}
            />
            <AddReviewModal
                isOpen={reviewModal}
                cancelModal={() => setReviewModal(false)}
                submitReview={submitReview}
            />
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
                                <Light>Order ID: {order._id}</Light>
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
                        items={order.product}
                        quantity={order.quantity}
                        sellerName={order.sellerId.username}
                        handleChatButtonClick={handleChatButtonClick}
                        setReviewModal={setReviewModal}
                        setProductReview={setProductReview}
                    />
                    <Divider />

                    <Row>
                        <Column width="65%"></Column>
                        <Column width="15%">
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
                                    RM {order.totalPricePerOrder.toFixed(2)}
                                </Light>
                            </Text>
                        </Column>
                    </Row>
                    {order.status !== "Received" && (
                        <Row>
                            <PaymentButton
                                style={{
                                    backgroundColor: "#0f60ff",
                                    color: "white",
                                    width: "20%",
                                    marginLeft: "auto",
                                }}
                                onClick={() => handleOrderReceived(order._id)}
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
