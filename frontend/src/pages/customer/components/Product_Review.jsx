import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../../../context";

function Product_Review({ product, setProduct, productListing, setProductListing }) {
    const [review, setReview] = useState("");
    const submitReview = () => {
        let updatedProduct = {};
        const updatedProductListing = productListing.map((p) => {
            // Check if the current product's id matches the productId
            console.log(p.id, product.id);
            if (p.id === product.id) {
                // If it matches, create a new review object and add it to the reviews array
                const newReview = {
                    pfp: "/customer_pfp.jpg",
                    username: "Xopher", // Assuming product.username is defined
                    stars: 5, // Assuming product.stars is defined
                    description: review,
                };
                // Create a copy of the product with the new review added to its reviews array
                updatedProduct = {
                    ...p,
                    reviews: [...p.reviews, newReview],
                };
                return updatedProduct;
            } else {
                // If the id doesn't match, return the original product without changes
                return p;
            }
        });
        setReview("")
        setProductListing(updatedProductListing);
        setProduct(updatedProduct);
    };
    return (
        <>
            <div className="flex flex-col gap-3">
                <div className="flex flex-row gap-3 justify-between">
                    <input
                        className="flex flex-1 px-2 py-3 rounded-md"
                        type="textarea"
                        placeholder="Write a review..."
                        value={review}
                        onChange={(e) => setReview(e.target.value)}
                    />
                    <button
                        onClick={submitReview}
                        className="px-4 py-1 rounded-2xl hover:bg-[#7dc7d8] cursor-pointer"
                    >
                        <i className="fa-solid fa-paper-plane text-[#5489FC]"></i>
                    </button>
                </div>
            </div>
            {product.reviews.map((review) => {
                return (
                    <div className="flex-col p-6   rounded-md">
                        <div className="flex flex-row items-center gap-10">
                            <img
                                src={review.pfp}
                                alt=""
                                className=" object-cover rounded-full w-20 h-20"
                            />
                            <div className="flex flex-col gap-3 items-start">
                                <div className="flex flex-col gap-1">
                                    <h4 className="font-sans font-medium text-md">
                                        {review.username}
                                    </h4>
                                    <div className="flex flex-row">
                                        {Array.from(
                                            { length: review.stars },
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
