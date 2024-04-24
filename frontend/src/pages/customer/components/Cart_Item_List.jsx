import React, { useContext, useEffect } from "react";
import { GlobalContext } from "../../../context";

function Cart_Item_List({
    cartItems,
    seller,
    deleteItem,
    totalCheckoutPrice,
    setTotalCheckoutPrice,
}) {
    useEffect(() => {
        let totalPrice = 0;
        Object.values(cartItems).forEach((items) => {
            items.forEach((item) => {
                totalPrice += parseFloat(item.price) * parseInt(item.quantity);
            });
        });
        setTotalCheckoutPrice(totalPrice);
    }, [cartItems]);
    return (
      
            <div className="flex flex-col gap-2 mb-10">
                <div className="flex flex-row gap-10 border-[1px] py-3 px-5 rounded-sm">
                    <h4 className="text-black font-semibold font-sans text-[14px]">
                        {seller}
                    </h4>
                </div>
                {cartItems[seller].map((cartItem) => {
                    return (
                        <div className="flex flex-row justify-between border-[1px] py-3 px-5 rounded-sm">
                            <div className="flex flex-row gap-8 items-center">
                                <img
                                    src={cartItem.img}
                                    alt=""
                                    className=" w-20 h-20"
                                />
                                <h4 className="text-black font-semibold font-sans text-[20px]">
                                    {cartItem.name}
                                </h4>
                            </div>

                            <div className="flex flex-row px-4 gap-20 justify-between items-center">
                                <h4 className="text-black font-light font-sans text-[16px] w-16">
                                    {cartItem.variation}
                                </h4>
                                <h4 className="text-[#8B909A] font-light font-sans text-[16px]">
                                    RM {cartItem.price}
                                </h4>
                                <h4 className="text-black font-light font-sans text-[16px]">
                                    {cartItem.quantity}
                                </h4>
                                <h4 className="text-black font-light font-sans text-[16px]">
                                    RM {cartItem.price * cartItem.quantity}
                                </h4>
                                <button
                                    onClick={() => deleteItem(cartItem, seller)}
                                >
                                    <i class="fa-solid fa-trash"></i>
                                </button>

                                {/* <h4
                                onClick={() =>
                                    addToTotalCheckoutPrice(
                                        cartItem.price * cartItem.quantity
                                    )
                                }
                            >
                                Add
                            </h4> */}
                            </div>
                        </div>
                    );
                })}
            </div>
     
    );
}

export default Cart_Item_List;
