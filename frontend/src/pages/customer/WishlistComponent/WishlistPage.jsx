import React, { useEffect, useContext, useState } from 'react';
import Customer_Navbar from '../../../components/customer_navbar';
import axios from 'axios';
import { GlobalContext } from '../../../context';
import { MdDeleteForever } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import useCustomer from '../../../hooks/useCustomer';

const WishlistPage = () => {
    const [wishlist, setWishlist] = useState([]);
    const { getCustomer } = useCustomer();
    const userId = getCustomer()._id;

    useEffect(() => {
        const fetchWishlist = async () => {
            try {
                const response = await axios.get(`http://localhost:1234/api/customers/wishlist/get/${userId}`);
                console.log(response.data);
                setWishlist(response.data);
            } catch (error) {
                console.error("Error fetching wishlist:", error);
            }
        };
        fetchWishlist();
    }, [userId]);

    const handleDelete = async (productId) => {
        try {
            const res = await axios.delete(`http://localhost:1234/api/customers/wishlist/delete/${userId}/${productId}`);
            setWishlist(wishlist.filter((item) => item._id !== productId));
        } catch (error) {
            console.error("Error deleting product from wishlist:", error);
        }
    };
    const navigate = useNavigate();
    const handleClickVisit = (product) => {
        const productId = product._id
        navigate(`/customer/product/${productId}`, {
            state : {product}
        })
    }

    
    // const navigateToProductDetails = (product) => {
    //     navigation(`/customer/product/${product._id}`, {
    //         state: { product },
    //     });
    // };

    return (
        <div className="flex flex-col p-20">
            <div>
                <Customer_Navbar />
            </div>

            <div className="mt-20">
                {wishlist && wishlist.length > 0 ? (
                    <div className="flex flex-col gap-14">
                        <div className="text-[32px] font-bold">
                            Wishlist
                        </div>

                        <div className="flex flex-row gap-[300px] justify-center">
                            <div className="text-xl font-semibold">
                                Product Name
                            </div>

                            <div className="text-xl font-semibold">
                                Unit Price
                            </div>

                            <div className="text-xl font-semibold">
                                Seller
                            </div>
                        </div>

                        {wishlist.map((item) => (
                            <div key={item._id} className="gap-[200px] p-10 flex items-center flex-row">
                                <div className="flex flex-row items-center gap-16">
                                    <button
                                        className="text-5xl text-middle"
                                        onClick={() => handleDelete(item._id)}
                                    >
                                        <MdDeleteForever />
                                    </button>

                                    <div>
                                        <img
                                            src={item.image[0]}
                                            alt="product"
                                            className="h-[200px] w-[200px] object-cover rounded-lg"
                                        />
                                    </div>
                                </div>

                                <div className="flex flex-row justify-between flex-1">
                                    <div className="text-xl text-semibold max-w-20">
                                        {item.name}
                                    </div>

                                    <div className="text-xl text-semibold ml-[100px]">
                                        {item.pricePerUnit}
                                    </div>

                                    <div className="text-xl text-semibold ml-[50px]">
                                        {item.seller.username}
                                    </div>

                                    <div>
                                        <button className="bg-blue-700 hover:bg-blue-800 text-white text-semibold px-5 py-2 rounded-lg"
                                        onClick = {() => handleClickVisit(item)}
                                        >
                                            Visit Product Listing
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center text-xl mt-20">
                        Your wishlist is empty.
                    </div>
                )}
            </div>
        </div>
    );
};

export default WishlistPage;
