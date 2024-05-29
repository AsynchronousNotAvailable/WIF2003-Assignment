import React, { useContext, useState } from "react";

function Product_Review({ reviews }) {
    return (
        <>
            {reviews.map((review) => {
                return (
                    <div className="flex-col p-6   rounded-md">
                        <div className="flex flex-row items-center gap-10">
                            <img
                                src={review.customerPfp}
                                alt=""
                                className=" object-cover rounded-full w-20 h-20"
                            />
                            <div className="flex flex-col gap-3 items-start">
                                <div className="flex flex-col gap-1">
                                    <h4 className="font-sans font-medium text-md">
                                        {review.customerName}
                                    </h4>
                                    <div className="flex flex-row">
                                        {Array.from(
                                            { length: review.rating },
                                            (_, index) => (
                                                <i
                                                    key={index}
                                                    className="fa-solid fa-star text-[#FFD43B]"
                                                ></i>
                                            )
                                        )}
                                    </div>
                                </div>
                                <h4 className="font-sans font-light text-sm">
                                    {review.description}
                                </h4>
                            </div>
                        </div>
                    </div>
                );
            })}
        </>
    );
}

export default Product_Review;
