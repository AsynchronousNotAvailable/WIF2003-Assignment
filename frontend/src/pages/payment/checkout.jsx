import React from "react";
import Customer_Navbar from "../../components/customer_navbar";
import Checkout_Item_List from "../payment/components/Checkout_Item_List";
import { GlobalContext } from "../../context";
import { CheckoutContext } from "../../context";
import { useContext } from "react";

export default function Checkout() {
    const { selectedItems } = useContext(CheckoutContext);

    return (
        <div>
            {/* <Customer_Navbar /> */}
            <Checkout_Item_List
                checkoutItems={selectedItems}
            />
        </div>
    )
}