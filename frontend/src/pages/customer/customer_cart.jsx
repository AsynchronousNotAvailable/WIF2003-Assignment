import React, { useContext } from "react";
import Customer_Navbar from "../../components/customer_navbar";
import { GlobalContext } from "../../context";

function Customer_Cart() {
    const { cartItems } = useContext(GlobalContext);
    console.log('CART', cartItems);
    return (
        <>
            <Customer_Navbar />
            {cartItems.map((cartItem) => (
                console.log(cartItem)
            ))}
        </>
    );
}

export default Customer_Cart;
