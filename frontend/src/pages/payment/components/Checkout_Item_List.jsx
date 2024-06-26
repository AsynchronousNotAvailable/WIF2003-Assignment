import React from "react";
import styled from "styled-components";

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

const Column = styled.div`
    width: ${({ width }) => width};
    flex-shrink: 0;
`;

const Image = styled.img`
    width: 100px;
    height: auto;
    margin-right: 20px;
`;

function Checkout_Item_List({ checkoutItems }) {
    console.log(checkoutItems);
    return (
        <div>
            {checkoutItems && checkoutItems.length > 0 ? (
                checkoutItems.map((checkoutItem) => {
                    return (
                        <div>
                            <RowWrapper>
                                <Column
                                    width="40%"
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                    }}
                                >
                                    <Image
                                        src={checkoutItem.product.image}
                                        alt="Product Image"
                                    />
                                    <SmallText>{checkoutItem.product.name}</SmallText>
                                </Column>
                                <Column width="15%">
                                    <SmallText>
                                        {checkoutItem.selectedVariation}
                                    </SmallText>
                                </Column>
                                <Column width="15%">
                                    <SmallText>
                                        RM{" "}
                                        {checkoutItem.product.pricePerUnit.toFixed(
                                            2
                                        )}
                                    </SmallText>
                                </Column>
                                <Column width="15%">
                                    <SmallText>
                                        {checkoutItem.quantity}
                                    </SmallText>
                                </Column>
                                <Column width="15%">
                                    <SmallText>
                                        RM{" "}
                                        {(
                                            checkoutItem.product.pricePerUnit *
                                            checkoutItem.quantity
                                        ).toFixed(2)}
                                    </SmallText>
                                </Column>
                            </RowWrapper>
                        </div>
                    );
                })
            ) : (
                <h1>No items selected to checkout</h1>
            )}
        </div>
    );
}

export default Checkout_Item_List;
