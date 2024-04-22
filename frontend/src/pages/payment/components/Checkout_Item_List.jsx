import React from 'react'
import styled from 'styled-components'

const SmallText = styled.p`
    font-size: 18px;
    font-family: Inter;
    font-weight: 300;
    opacity: 0.6;
    margin: 10px 0;
    opacity: ${({ withOpacity }) => withOpacity ? '0.6' : '1.0'};
`

const RowWrapper = styled.div`
    display: flex;
    align-items: center; /* Align items vertically */
    justify-content: space-between;
    width: 55%;
    height: 80%;
    padding: 30px 70px;
    border-bottom: 1px solid #ccc; /* Add border to create table-like rows */
`;

const Image = styled.img`
    width: 100px;
    height: auto;
    margin-right: 20px; 
`;

function Checkout_Item_List({checkoutItems}) {
  return (
      <div>
            {checkoutItems && checkoutItems.length > 0 ? (
                checkoutItems.map((checkoutItem) => {
                return (
                    <div>
                        <RowWrapper>
                            <Image src={checkoutItem.img} alt="Product Image" />
                            <SmallText>{checkoutItem.name}</SmallText>
                            <SmallText>RM {checkoutItem.price}</SmallText>
                            <SmallText>{checkoutItem.quantity}</SmallText>
                            <SmallText>RM {checkoutItem.price * checkoutItem.quantity}</SmallText>
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

export default Checkout_Item_List