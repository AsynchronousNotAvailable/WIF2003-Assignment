import React, { useContext, useEffect, useState } from "react";
import Customer_Navbar from "../../components/customer_navbar";
import { GlobalContext } from "../../context";
import Cart_Item_List from "./components/Cart_Item_List";

function Customer_Cart() {
    const { cartItems, setCartItems } = useContext(GlobalContext);
    const [dict, setDict] = useState({});
    useEffect(() => {
        const updatedDict = {};
        cartItems.forEach((cartItem) => {
            if (!updatedDict[cartItem.seller]) {
                updatedDict[cartItem.seller] = [cartItem];
            } else {
                updatedDict[cartItem.seller].push(cartItem);
            }
        });

        setDict(updatedDict);
    }, [cartItems]);



    const deleteItem = (cartItem, seller) => {
        const updatedItemListsPerSeller = dict[seller].filter(
            (item) => cartItem.id !== item.id
        );
        setDict((prev) => ({
            ...prev,
            [seller]: updatedItemListsPerSeller, // Update the item list for the specified seller
        }));
        const updatedCartItems = cartItems.filter((item) => item.id !== cartItem.id);
        setCartItems(updatedCartItems);
    };

    return (
        <>
            <Customer_Navbar />
            {/* {cartItems.map((cartItem) => console.log(cartItem))} */}
            <div className="mt-[64px] p-10 flex flex-col gap-10">
                Shopping Cart
                <div className="flex flex-col gap-10">
                    <div className="flex flex-row justify-between bg-blue-200 p-6 rounded-lg">
                        <div className="flex flex-row gap-10">
                            <h4 className = "text-[#8B909A] font-sans text-[20px]">checkbox</h4>
                            <h4 className = "text-[#8B909A] font-sans text-[20px]">Product</h4>
                        </div>
                        <div className="flex flex-row gap-10">
                            <h4 className = "text-[#8B909A] font-sans text-[20px]">Unit Price</h4>
                            <h4 className = "text-[#8B909A] font-sans text-[20px]">Quantity</h4>
                            <h4 className = "text-[#8B909A] font-sans text-[20px]">Total Price</h4>
                            <h4 className = "text-[#8B909A] font-sans text-[20px]">Actions</h4>
                        </div>
                    </div>

                    <div classNmae = "flex flex-col">
                    <div className = "flex flex-row">
                        <p>Checkbox</p>
                        <p>Seller geh name</p>
                    </div>
                    <div className = "flex flex-row justify-between">
                        <div className = "flex flex-row">
                        <p>Checkbox</p>
                        <p>dig bick</p>
                        </div>

                        <div className = "flex flex-row justify-between border-2 border-blue-700">
                        <p>RM15.38</p>
                        <p>2</p>
                        <p>Rm42.69</p>
                        <p>Waiting for Payment</p>

                        </div>
                       
                    </div>

                    </div>
                  


                 

                    {Object.keys(dict).map((seller) => {
                        return (
                            <Cart_Item_List
                                cartItems={dict}
                                seller={seller}
                                deleteItem={deleteItem}
                            />
                        );
                    })}

                    {/* check out bar */}
                    <div className="flex flex-row justify-between bg-red-200 mt-10 p-8 rounded-lg">
                        <div className="flex flex-row gap-10">
                            <h4>checkbox</h4>
                            <h4>Select All</h4>
                            <h4>Delete</h4>
                        </div>

                        <div className="flex flex-row gap-10 ">
                            <h4>Total Item</h4>
                            <h4>RM 0.00</h4>
                            <h4>Check Out</h4>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Customer_Cart;
