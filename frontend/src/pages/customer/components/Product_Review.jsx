import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../../../context";

function Product_Review({ product, setProduct }) {
    const [review, setReview] = useState("");
    const { productListing, setProductListing } = useContext(GlobalContext);
    console.log(product);

    const submitReview = () => {
        let updatedProduct = {};
        const updatedProductListing = productListing.map((p) => {
            // Check if the current product's id matches the productId
            console.log(p.id, product.id);
            if (p.id === product.id) {
                // If it matches, create a new review object and add it to the reviews array
                const newReview = {
                    pfp: "pfp",
                    username: product.username, // Assuming product.username is defined
                    stars: product.stars, // Assuming product.stars is defined
                    description: review,
                };
                // Create a copy of the product with the new review added to its reviews array
                updatedProduct = {
                    ...p,
                    reviews: [...p.reviews, newReview],
                };
                return(updatedProduct);
            } else {
                // If the id doesn't match, return the original product without changes
                return p;
            }
        });

        setProductListing(updatedProductListing);
        setProduct(updatedProduct);
    };
    return (
        <>
            <div className="flex flex-col">
                Leave a review
                <div className="flex flex-row">
                    <input
                        type="textarea"
                        value={review}
                        onChange={(e) => setReview(e.target.value)}
                    />
                    <button onClick={submitReview}>Submit Review</button>
                </div>
            </div>
            {product.reviews.map((review) => {
                return (
                    <div className="flex-col p-6 bg-slate-400">
                        <div className="flex flex-row gap-10">
                            <div className="flex">{review.pfp}</div>
                            <div className="flex flex-col gap-3">
                                <h4>{review.username}</h4>
                                <h4>{review.stars}</h4>
                                <h4>{review.description}</h4>
                            </div>
                        </div>
                    </div>
                );
            })}
            {/* <div className="flex-col p-6 bg-slate-400">
                <div className="flex flex-row gap-10">
                    <div className="flex">{product.pfp}</div>
                    <div className="flex flex-col gap-3">
                        <h4>{product.username}</h4>
                        <h4>{product.stars}</h4>
                        <h4>{product.description}</h4>
                    </div>
                </div>
            </div> */}
        </>
    );
}

export default Product_Review;
