import React, { useContext, useState } from 'react';
import Customer_Navbar from '../../components/customer_navbar';
import { useNavigate } from 'react-router-dom';
import { GlobalContext } from '../../context';

const ProductListing = () => {
    const { cartItems, setCartItems } = useContext(GlobalContext);
    console.log('PRODCUT', cartItems);
    const navigation = useNavigate();
    const [productListing, setProductListing] = useState([
        {
            id: 0,
            name: "Milo 3 in 1",
            price: 13,
            rating: 4,
            img: "/milothreeproduct.jpg",
            seller: "Milo Seller"
        },
        {
            id: 1,
            name: "Milo 2 in 1",
            price: 10,
            rating: 5,
            img: "/milotwoproduct.jpg",
            seller: "Milo 2 Seller"
        },
        {
            id: 2,
            name: "Horlicks",
            price: 8,
            rating: 3,
            img: "/horlickproduct.jpg",
            seller: "Horlicks Seller"
        },
        {
            id: 3,
            name: "Builder",
            price: 13,
            rating: 2,
            img: "/builderproduct.png",
            seller: "Builder Seller"
        }
    ]);

    const handleClick = (product) => {
        navigation(`/customer/product/${product.id}`, { state: { product } });
        
    };

    return (
        <div>
            <Customer_Navbar />
            <main className="mt-36">
                <div className="flex flex-row">
                    {productListing.map((product) => (
                        <div
                            key={product.id}
                            className="product-card"
                            onClick={() => handleClick(product)}
                        >
                            <img
                                src={product.img}
                                alt={product.name}
                                className="product-image"
                            />
                            <h3>{product.name}</h3>
                            <p>Price: ${product.price}</p>
                            <p>Rating:{product.rating}</p>
                            <p>Rating: {product.seller}</p>
                        </div>
                    ))}
                </div>
            </main>
            <style jsx>{`
                .product-card {
                    border: 1px solid #ccc;
                    padding: 20px;
                    margin: 10px;
                    width: 200px; /* Set the width to ensure all cards have the same size */
                    text-align: center;
                    cursor: pointer; /* Add cursor pointer to indicate clickable */
                }

                .product-image {
                    max-width: 100%;
                    height: auto;
                    margin-bottom: 10px;
                }
            `}</style>
        </div>
    );
};

export default ProductListing;
