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
                updatedDict[cartItem.seller] = [cartItem];
            } else {
                updatedDict[cartItem.seller].push(cartItem);
            }
        });

        setDict(updatedDict);
    }, [cartItems]);



    const deleteItem = (cartItem, seller) => {
      
        console.log(typeof dict[seller][0]["id"])
        const updatedItemListsPerSeller = dict[seller].filter((item) => {
            return (
                item.id !== cartItem.id && item.variation !== cartItem.variation
            );
            // Check if the item's ID matches and the variation is the same
        });

        setDict((prev) => ({
            ...prev,
            [seller]: updatedItemListsPerSeller, // Update the item list for the specified seller
        }));

        // Filter out the deleted item from the overall cart items
        const updatedCartItems = cartItems.filter((item) => {
            // Check if the item's ID matches and the variation is the same
            return (
                item.id !== cartItem.id || item.variation !== cartItem.variation
            );
        });

        // Update the cart items state
        setCartItems(updatedCartItems);
    };

    let quantity = 0;
    for (let i = 0; i < cartItems.length; i++) {
        quantity += cartItems[i].quantity;
    }

    

    return (
        <>
            <Customer_Navbar />
            <div className="mt-[64px] p-14 flex flex-col gap-10">
                <h2 className="font-sans font-bold text-2xl pl-2">
                    Shopping Cart
                </h2>
                <div className="flex flex-col gap-10">
                    <div className="flex flex-row justify-between border-[1px] py-3 px-5 rounded-sm">
                        <div className="flex flex-row gap-10">
                            <h4 className="text-[#8B909A] font-sans text-[14px]">
                                Product
                            </h4>
                        </div>
                        <div className="flex flex-row gap-14">
                            <h4 className="text-[#8B909A] font-sans text-[14px]">
                               Variation
                            </h4>
                            <h4 className="text-[#8B909A] font-sans text-[14px]">
                                Unit Price
                            </h4>
                            <h4 className="text-[#8B909A] font-sans text-[14px]">
                                Quantity
                            </h4>
                            <h4 className="text-[#8B909A] font-sans text-[14px]">
                                Total Price
                            </h4>
                            <h4 className="text-[#8B909A] font-sans text-[14px]">
                                Actions
                            </h4>
                        </div>
                    </div>

                    {/* <div classNmae="flex flex-col">
                        <div className="flex flex-row">
                            <p>Checkbox</p>
                            <p>Seller geh name</p>
                        </div>
                        <div className="flex flex-row justify-between">
                            <div className="flex flex-row">
                                <p>Checkbox</p>
                                <p>dig bick</p>
                            </div>

                            <div className="flex flex-row justify-between border-2 border-blue-700">
                                <p>RM15.38</p>
                                <p>2</p>
                                <p>Rm42.69</p>
                                <p>Waiting for Payment</p>
                            </div>
                        </div>
                    </div> */}
                    <div className="">
                        {Object.keys(dict).map((seller) => {
                            return (
                                
                                    <Cart_Item_List
                                        cartItems={dict}
                                        seller={seller}
                                        deleteItem={deleteItem}
                                        setTotalCheckoutPrice={
                                            setTotalCheckoutPrice
                                        }
                                        totalCheckoutPrice={totalCheckoutPrice}
                                    />
                              
                            );
                        })}
                    </div>

                    {/* check out bar */}
                    <div className="flex flex-row justify-end border-[1px] border-blue-300 py-3 px-5 rounded-sm items-center">
                        <div className="flex flex-row gap-12 items-center">
                            <h4 className="font-sans text-xl">
                                Total {quantity} Item{" "}
                            </h4>
                            <h4 className="font-sans text-2xl font-semibold text-[#5489FC]">
                                RM {totalCheckoutPrice}
                            </h4>
                            <div className="py-2 px-3 bg-[#5489FC] rounded-sm">
                                <button className="font-sans text-white ">
                                    Check Out
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Customer_Cart;
