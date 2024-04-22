import React, { useContext, useEffect, useState } from "react";
import Customer_Navbar from "../../components/customer_navbar";
import { GlobalContext } from "../../context";
import Cart_Item_List from "./components/Cart_Item_List";

function Customer_Cart() {
    const {
        cartItems,
        setCartItems,
        totalCheckoutPrice,
        setTotalCheckoutPrice,
    } = useContext(GlobalContext);
    
    const [dict, setDict] = useState({});
    useEffect(() => {
        
        const updatedDict = {};
        cartItems.forEach((cartItem) => {
            if (!updatedDict[cartItem.seller]) {
                // If the seller doesn't exist in the updated dictionary, create a new entry
                updatedDict[cartItem.seller] = [cartItem];
            } else {
                // If the seller already exists, update the existing entry
                updatedDict[cartItem.seller].push(cartItem);
            }
        });

        // Update the state once after processing all cart items
        setDict(updatedDict);
    }, [cartItems]);

    // setDict((prevDict) => {
    //     const updatedDict = { ...prevDict }; // Make a copy of the previous state

    //     // Loop through each cart item
    //     cartItems.forEach((cartItem) => {
    //         if (!updatedDict[cartItem.seller]) {
    //             // If the seller doesn't exist in the dictionary, create a new entry
    //             updatedDict[cartItem.seller] = [cartItem];
    //         } else {
    //             // If the seller already exists, push the cart item to its array
    //             updatedDict[cartItem.seller].push(cartItem);
    //         }
    //     });

    //     return updatedDict; // Return the updated dictionary
    // });
    // console.log(dict);

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
                            <h4>checkbox</h4>
                            <h4>Product</h4>
                        </div>

                        <div className="flex flex-row gap-10">
                            <h4>Unit Price</h4>
                            <h4>Quantity</h4>
                            <h4>Total Price</h4>
                            <h4>Actions</h4>
                        </div>
                    </div>

                    {/* {Object.keys(dict).map((seller) => {
                        return (
                            <div className="flex flex-col gap-5">
                                <div className="flex flex-row gap-10 bg-slate-500 p-6 rounded-lg">
                                    <h4>checkbox</h4>
                                    <h4>{seller}</h4>
                                </div>
                                {dict[seller].map((cartItem) => {
                                    return (
                                        <div className="flex flex-row justify-between bg-slate-200 p-6 rounded-lg">
                                            <div className="flex flex-row gap-10">
                                                <h4>checkbox</h4>
                                                <h4>product image</h4>
                                                <h4>{cartItem.productName}</h4>
                                            </div>

                                            <div className="flex flex-row gap-10">
                                                <h4>RM {cartItem.price}</h4>
                                                <h4>{cartItem.quantity}</h4>
                                                <h4>
                                                    RM{" "}
                                                    {cartItem.price *
                                                        cartItem.quantity}
                                                </h4>
                                                <h4>delete button</h4>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        );
                    })} */}

                    {Object.keys(dict).map((seller) => {
                        return (
                            <Cart_Item_List
                                cartItems={dict}
                                seller={seller}
                                deleteItem={deleteItem}
                                setTotalCheckoutPrice={setTotalCheckoutPrice}
                                totalCheckoutPrice={totalCheckoutPrice}
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
                            <h4>RM {totalCheckoutPrice}</h4>
                            <h4>Check Out</h4>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Customer_Cart;
