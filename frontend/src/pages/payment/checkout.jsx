import React from "react";
import Customer_Navbar from "../../components/customer_navbar";
import Checkout_Item_List from "../payment/components/Checkout_Item_List";
import { GlobalContext } from "../../context";
import { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import OnlineBankingOptions from "./components/OnlineBanking";
import CreditDebitCard from "./components/CreditDebit";
import { useNavigate, useLocation } from "react-router-dom";
import EditAddressModal from "./components/deliveryAddressModal";
import useCustomer from "../../hooks/useCustomer";
import axios from "axios";

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

const PaymentContent = styled.div`
    width: 100%;
    display: ${({ selected }) => (selected ? "flex" : "none")};
    flex-direction: column;
    align-items: center;
`;

export default function Checkout() {
    const {userDetails,selectedSeller} = useContext(GlobalContext);
    console.log(selectedSeller);
    const userId = userDetails.id;
    const location = useLocation();
    const [cartItems, setCartItems] = useState(location.state.cartItems);
    console.log(cartItems);
    const [isBuyNow, setIsBuyNow] = useState(location.state.buyNow);
    const navigation = useNavigate();

    const totalItems = cartItems.reduce(
        (total, item) => total + item.quantity,
        0
    );
    const orderTotal = cartItems.reduce(
        (total, item) => total + item.product.pricePerUnit * item.quantity,
        0
    );

    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);

    const { getCustomer } = useCustomer();
    const [customer, setCustomer] = useState(getCustomer());
    console.log(customer);

    const handlePaymentMethodClick = (method) => {
        setSelectedPaymentMethod(method);
    };

    const handlePlaceOrder = async () => {
        if (selectedPaymentMethod === null) {
            alert("Please select a payment method to proceed.");
        } else {
            if (isBuyNow) {
                buyNow();
            } else {
                placeOrder();
            }
            // navigation("/customer/orders");
        }
    };

    const buyNow = async () => {
        try {
            const username = customer.username;
            if (selectedPaymentMethod === "TnG E-Wallet") {
                setSelectedPaymentMethod("TNG");
            }
            const paymentDetails = {
                payment_method: selectedPaymentMethod,
                payment_date: new Date(),
                shipping_address: customer.shippingAddress,
            };

            const purchaseDetails = {
                productDetails: {
                    id: cartItems[0].product._id,
                    quantity: cartItems[0].quantity,
                },
                paymentDetails,
            };
            console.log(purchaseDetails);
            const response = await axios.post(
                `http://localhost:1234/api/customers/${username}/buyNow`,
                purchaseDetails
            );
            if (response.status === 201) {
                console.log(cartItems[0])
                const reqBody = {
                    message : "Thank you for your purchase! Your order is being processed.",
                    senderId : cartItems[0].product.seller._id,
                }
                const response = await axios.post(`http://localhost:1234/api/messages/send/${customer._id}`, reqBody);
                console.log(response.data);
                navigation("/customer/orders");
            }
        } catch (error) {
            console.log(error);
        }
    };

    const placeOrder = async () => {
        try {
            const username = customer.username;
            if (selectedPaymentMethod === "TnG E-Wallet") {
                selectedPaymentMethod = "TNG";
            }
            const paymentDetails = {
                payment_method: selectedPaymentMethod,
                payment_date: new Date(),
                shipping_address: customer.shippingAddress,
            };
            const response = await axios.put(
                `http://localhost:1234/api/customers/${username}/checkout`,
                paymentDetails
            );
            console.log(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleEdit = () => {
        setModalOpen(true);
    };

    const handleSave = async (updatedAddress) => {
        setCustomer({ ...customer, shippingAddress: updatedAddress });
        setModalOpen(false);
        try {
            const response = await axios.post(
                `http://localhost:1234/api/customers/${customer.username}/updateShippingAddress`,
                updatedAddress
            );
        } catch (error) {
            console.log(error);
        }
    };

    const CheckoutList = () => {
        return (
            <div
                style={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    marginBottom: "30px",
                }}
            >
                <Wrapper style={{ display: "flex" }}>
                    <Column width="40%">
                        <Text style={{ marginRight: "auto" }}>
                            <Light>Product</Light>
                        </Text>
                    </Column>
                    <Column width="15%">
                        <Text style={{ marginRight: "auto" }}>
                            <Light>Variation</Light>
                        </Text>
                    </Column>
                    <Column width="15%">
                        <Text style={{ marginRight: "auto" }}>
                            <Light>Unit Price</Light>
                        </Text>
                    </Column>
                    <Column width="15%">
                        <Text style={{ marginRight: "auto" }}>
                            <Light>Quantity</Light>
                        </Text>
                    </Column>
                    <Column width="15%">
                        <Text style={{ marginRight: "auto" }}>
                            <Light>Total Price</Light>
                        </Text>
                    </Column>
                </Wrapper>
                <Wrapper>
                    <Checkout_Item_List
                        style={{ backgroundColor: "white" }}
                        checkoutItems={cartItems}
                    />
                </Wrapper>
                <Wrapper style={{ display: "flex" }}>
                    <Column width="65%"></Column>
                    <Column width="20%">
                        <Text style={{ marginRight: "auto" }}>
                            <Bold>Doorstep Delivery</Bold>
                        </Text>
                    </Column>
                    <Column width="20%">
                        <Text style={{ marginRight: "auto" }}>
                            <Light>RM 5.00</Light>
                        </Text>
                    </Column>
                </Wrapper>
                <Wrapper style={{ display: "flex" }}>
                    <Column width="65%"></Column>
                    <Column width="20%">
                        <Text style={{ marginRight: "auto" }}>
                            <Bold>Order Total ({totalItems} item)</Bold>
                        </Text>
                    </Column>
                    <Column width="20%">
                        <Text style={{ marginRight: "auto" }}>
                            <Light>RM {orderTotal.toFixed(2)}</Light>
                        </Text>
                    </Column>
                </Wrapper>
            </div>
        );
    };

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
                    Checkout
                </Text>
            </div>
            <Wrapper style={{ marginBottom: "30px" }}>
                <div style={{ display: "flex", alignItems: "center" }}>
                    <Column width="12%">
                        <Text style={{ marginRight: "auto", color: "#0F60FF" }}>
                            Delivery Address
                        </Text>
                    </Column>
                    <p onClick={handleEdit} style={{ fontSize: "14px" }}>
                        EDIT
                    </p>
                </div>
                <Text style={{ marginRight: "auto" }}>
                    {" "}
                    <Bold>
                        {customer.shippingAddress.receiverName}{" "}
                        {customer.shippingAddress.receiverPhoneNumber}
                    </Bold>{" "}
                    {customer.shippingAddress.street}{" "}
                    {customer.shippingAddress.zipCode}{" "}
                    {customer.shippingAddress.city}{" "}
                    {customer.shippingAddress.state}{" "}
                    {customer.shippingAddress.country}{" "}
                </Text>
                <EditAddressModal
                    isOpen={modalOpen}
                    shippingAddress={customer.shippingAddress}
                    onSave={handleSave}
                />
            </Wrapper>
            <CheckoutList />
            <Wrapper style={{ display: "flex", alignItems: "center" }}>
                <Column width="15%">
                    <Text style={{ marginRight: "auto", fontSize: "16px" }}>
                        <Light>Payment Method</Light>
                    </Text>
                </Column>
                <PaymentButton
                    selected={selectedPaymentMethod === "Online Banking"}
                    onClick={() => handlePaymentMethodClick("Online Banking")}
                >
                    Online Banking
                </PaymentButton>
                <PaymentButton
                    selected={selectedPaymentMethod === "Credit/Debit Card"}
                    onClick={() =>
                        handlePaymentMethodClick("Credit/Debit Card")
                    }
                >
                    Credit/Debit Card
                </PaymentButton>
                <PaymentButton
                    selected={selectedPaymentMethod === "TnG E-Wallet"}
                    onClick={() => handlePaymentMethodClick("TnG E-Wallet")}
                >
                    TnG E-Wallet
                </PaymentButton>
                <PaymentButton
                    selected={selectedPaymentMethod === "Cash On Delivery"}
                    onClick={() => handlePaymentMethodClick("Cash On Delivery")}
                >
                    Cash On Delivery
                </PaymentButton>
            </Wrapper>
            <PaymentContent
                selected={selectedPaymentMethod === "Online Banking"}
            >
                <Wrapper>
                    <OnlineBankingOptions />
                </Wrapper>
            </PaymentContent>
            <PaymentContent
                selected={selectedPaymentMethod === "Credit/Debit Card"}
            >
                <Wrapper>
                    <CreditDebitCard username={customer.username} />
                </Wrapper>
            </PaymentContent>
            <PaymentContent selected={selectedPaymentMethod === "TnG E-Wallet"}>
                <Wrapper>
                    <Text>Connecting to TnG E-Wallet sandbox...</Text>
                </Wrapper>
            </PaymentContent>
            <PaymentContent
                selected={selectedPaymentMethod === "Cash On Delivery"}
            >
                <Wrapper>
                    <Text>
                        Cash On Delivery payment method selected. You will pay
                        for your order on delivery.
                    </Text>
                </Wrapper>
            </PaymentContent>
            <Wrapper style={{ display: "flex", alignItems: "center" }}>
                <Column width="80%"></Column>
                <Column width="20%">
                    <Text
                        style={{
                            marginRight: "auto",
                            color: "#0F60FF",
                            fontSize: "38px",
                        }}
                    >
                        RM {(orderTotal + 5).toFixed(2)}
                    </Text>
                </Column>
            </Wrapper>
            <Wrapper style={{ display: "flex", alignItems: "center" }}>
                <Column width="80%"></Column>
                <Column width="20%">
                    <PaymentButton
                        style={{
                            backgroundColor: "#0F60FF",
                            color: "white",
                            width: "90%",
                            margin: "0",
                        }}
                        onClick={() => handlePlaceOrder()}
                    >
                        Place Order
                    </PaymentButton>
                </Column>
            </Wrapper>
        </Container>
    );
}
