import React, { useContext, useEffect, useState } from "react";
import Customer_Navbar from "../../components/customer_navbar";
import { GlobalContext } from "../../context";
import Cart_Item_List from "./components/Cart_Item_List";
import { useNavigate } from "react-router-dom";
import useCustomer from "../../hooks/useCustomer";
import axios from "axios";

function Customer_Cart() {
    const {
        cartItems,
        setCartItems,
        totalCheckoutPrice,
        setTotalCheckoutPrice,
    } = useContext(GlobalContext);
    const navigation = useNavigate();
    const [dict, setDict] = useState({});
    const [fetchCart, setFetchCart] = useState(false);
    const { getCustomer } = useCustomer();
    useEffect(() => {
        fetchCartItem();
    }, [fetchCart]);

    const fetchCartItem = async () => {
        const customer = getCustomer();
        const username = customer.username;
        try {
            const response = await axios.get(
                `http://localhost:1234/api/customers/${username}/cart`
            );

            const cartItems = response.data.cartItem;
            setCartItems(cartItems);
            const updatedDict = {};
            cartItems.forEach((cartItem) => {
                if (!updatedDict[cartItem.product.seller]) {
                    updatedDict[cartItem.product.seller] = [cartItem];
                } else {
                    updatedDict[cartItem.product.seller].push(cartItem);
                }
            });

            setDict(updatedDict);
        } catch (error) {
            console.log(error);
        }
    };

    const deleteItem = async (cartItemId) => {
        const customer = getCustomer();
        const username = customer.username;
        try {
            const response = await axios.delete(
                `http://localhost:1234/api/customers/${username}/deleteFromCart/${cartItemId}`
            );

            if (response.status === 200) {
                setFetchCart(!fetchCart);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleCheckout = () => {
        // save to cartItems using setcartItems and then navigate to checkout page
        setCartItems(cartItems);
        navigation("/customer/checkout", { state: { cartItems: cartItems } });
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

                    <div className="">
                        {Object.keys(dict).map((seller) => {
                            return (
                                <Cart_Item_List
                                    cartItems={dict} //dict with seller: array of items as key value pair
                                    seller={seller} //key
                                    deleteItem={deleteItem}
                                    setTotalCheckoutPrice={
                                        setTotalCheckoutPrice
                                    }
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
                                RM{" "}
                                {Object.keys(dict).length === 0
                                    ? 0
                                    : totalCheckoutPrice}
                            </h4>
                            <div className="py-2 px-3 bg-[#5489FC] rounded-sm">
                                <button
                                    className="font-sans text-white "
                                    onClick={handleCheckout}
                                >
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
