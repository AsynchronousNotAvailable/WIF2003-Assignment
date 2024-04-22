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
        <div className="flex flex-col gap-5">
            <div className="flex flex-row gap-10 bg-slate-500 p-6 rounded-lg">
                <h4>checkbox</h4>
                <h4>{seller}</h4>
            </div>
            {cartItems[seller].map((cartItem) => {
                
                return (
                    <div className="flex flex-row justify-between bg-slate-200 p-6 rounded-lg">
                        <div className="flex flex-row gap-10">
                            <h4>checkbox</h4>
                            <h4>product image</h4>
                            <h4>{cartItem.productName}</h4>
                        </div>

                        <div className="flex flex-row gap-10">
                            <h4>{cartItem.variation}</h4>
                            <h4>RM {cartItem.price}</h4>
                            <h4>{cartItem.quantity}</h4>
                            <h4>RM {cartItem.price * cartItem.quantity}</h4>
                            <h4 onClick={() => deleteItem(cartItem, seller)}>
                                delete button
                            </h4>
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
