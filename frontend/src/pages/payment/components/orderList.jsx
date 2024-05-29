import React, { useState } from "react";
import styled from "styled-components";
import Product_Review from "../../customer/components/Product_Review";
import AddReviewModal from "./ReviewModal";

const SmallText = styled.p`
    font-size: 18px;
    font-family: Inter;
    font-weight: 300;
    opacity: 0.6;
    margin: 10px 0;
    opacity: ${({ withOpacity }) => (withOpacity ? "0.6" : "1.0")};
`;

const RowWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 80%;
    padding: 5px 0;
    position: relative;
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

const Column = styled.div`
    width: ${({ width }) => width};
    flex-shrink: 0;
`;

const Image = styled.img`
    width: 100px;
    height: auto;
    margin-right: 20px;
`;

function Order_List({
    items,
    sellerName,
    quantity,
    handleChatButtonClick,
    setReviewModal,
    setProductReview,
}) {
    const openReviewModal = () => {
        setReviewModal(true);
        setProductReview(items);
    };
    return (
        <div className="">
            {Object.keys(items).length > 0 ? (
                <div>
                    <RowWrapper>
                        <Column
                            width="40%"
                            style={{
                                display: "flex",
                                alignItems: "center",
                            }}
                        >
                            <Image src={items.image} alt="Product Image" />
                            <SmallText>{items.name}</SmallText>
                        </Column>
                        <Column width="15%">
                            <SmallText>{sellerName}</SmallText>
                        </Column>
                        <Column width="30%">
                            {/* <SmallText>{item.seller}</SmallText> */}
                            <button
                                className=" bg-blue-500 text-white px-4 py-2 rounded-full shadow-md hover:bg-blue-600"
                                onClick={() =>
                                    handleChatButtonClick(sellerName)
                                }
                            >
                                <i className="fa fa-comment"></i>
                            </button>
                        </Column>
                        <Column width="15%" align="right">
                            <SmallText>
                                RM {(items.pricePerUnit * quantity).toFixed(2)}
                            </SmallText>
                        </Column>
                    </RowWrapper>
                    <PaymentButton onClick={() => openReviewModal()}>
                        Add Review
                    </PaymentButton>
                </div>
            ) : (
                <h1>No items selected to checkout</h1>
            )}
        </div>
    );
}

export default Order_List;
