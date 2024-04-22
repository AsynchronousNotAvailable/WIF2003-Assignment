// import React, { useContext, useState } from "react";
// import GlobalState, { GlobalContext } from "../../context";
// import Customer_Navbar from "../../components/customer_navbar";
// import { useNavigate } from "react-router-dom";
// import { PieChart } from "@mui/x-charts/PieChart";
// import { Typography, Stack } from "@mui/material";
// import { BarChart } from "@mui/x-charts/BarChart";
// import Seller_NavSidebar from "../../components/seller_sidebar";

// function Marketplace() {
//     const { shopsItemListing, productListing } = useContext(GlobalContext);
//     const [userSearch, setUserSearch] = useState("");
//     const [displayedProducts, setDisplayedProducts] = useState([]);
//     const handleUserSearchChange = (event) => {
//         const userInput = event.target.value.toLowerCase();
//         setUserSearch(userInput);


//     };

//     // const matchedProducts = products.filter((product) =>
//     //     product.name.toLowerCase().includes(userSearch)
//     // );
//     // setDisplayedProducts(matchedProducts);

//     const [productCategorySetOne, setProductCategorySO] = useState([
//         {
//             name: "Books & Stationery",
//             img: "/booksIcon.png",
//         },
//         {
//             name: "Babies & Toys",
//             img: "/toysIcon.png",
//         },
//         {
//             name: "TV & Home Appliances",
//             img: "/tvIcon.png",
//         },
//         {
//             name: "Home & Lifestyle",
//             img: "/homeIcon.png",
//         },
//         {
//             name: "Groceries",
//             img: "/groceryIcon.png",
//         },
//     ]);

//     const [productCategorySetTwo, setProductCategoryST] = useState([
//         {
//             name: "Electronic Accessories",
//             img: "/electronicAcc.png",
//         },
//         {
//             name: "Electronics Devices",
//             img: "/electronicDev.png",
//         },
//         {
//             name: "Women's Fashion",
//             img: "/womenFashion.png",
//         },
//         {
//             name: "Men's Fashion",
//             img: "/menFashion.png",
//         },
//         {
//             name: "Health & Supplements",
//             img: "/healthIcon.png",
//         },
//     ]);

//     const [recommendProduct, setRecommendProduct] = useState([
//         {
//             id: 0,
//             name: "Milo 3 in 1",
//             price: 13,
//             rating: 4,
//             img: "/milothreeproduct.jpg",
//         },
//         {
//             id: 1,
//             name: "Milo 3 in 1",
//             price: 13,
//             rating: 4,
//             img: "/milothreeproduct.jpg",
//         },
//         {
//             id: 2,
//             name: "Milo 3 in 1",
//             price: 13,
//             rating: 4,
//             img: "/milothreeproduct.jpg",
//         },
//         {
//             id: 3,
//             name: "Milo 3 in 1",
//             price: 13,
//             rating: 4,
//             img: "/milothreeproduct.jpg",
//         },
//     ]);

    
//     const navigation = useNavigate();

//     const navigateToShop = (seller) => {
//         navigation(`/customer/shop/${seller}`, {
//             state: { seller: seller },
//         });
//     };

//     const navigateToProductDetails = (productId) => {
//         const product = productListing.find((p) => p.id === productId);

//         // Navigate to the product details page with the targeted product
//         navigation(`/customer/product/${productId}`, {
//             state: { product },
//         });
//     };
//     return (
//         <>
//             <Customer_Navbar />
//             <main className="mt-32 flex flex-col">
//                 <div className="flex flex-col mb-10 items-center mx-48">
//                     <input
//                         className="flex border-0 rounded-lg shadow-lg shadow-neutral-500 py-4 px-4 w-full"
//                         type="text"
//                         value={userSearch}
//                         placeholder="Search for products"
//                         onChange={handleUserSearchChange}
//                     ></input>
//                 </div>

//                 <section className="flex flex-row justify-center  ">
//                     <img className=" object-cover shadow-2xl rounded-3xl" src="/setelbanner.png" />
//                 </section>

//                 <section className="flex flex-col ">
//                     <span className="text-xl items-start mb-10 mt-20 font-sans font-semibold ml-[300px]">
//                         Category
//                     </span>
//                     <section className="flex flex-col gap-5 justify-center items-center">
//                         <section className="flex flex-row gap-3">
//                             {productCategorySetOne.map((product) => {
//                                 return (
//                                     <section className="flex flex-col border-2 w-[175px] h-[218px] justify-center items-center">
//                                         <img
//                                             src={product.img}
//                                             className="border-gray-300 border-2 w-[110px] h-[110px] rounded-full object-right"
//                                         />
//                                         <p className="">{product.name}</p>
//                                     </section>
//                                 );
//                             })}
//                         </section>
//                         <section className="flex flex-row gap-5">
//                             <section className="flex flex-row gap-3">
//                                 {productCategorySetTwo.map((product) => {
//                                     return (
//                                         <section className="flex flex-col rounded-md shadow-lg px-4 py-4 w-[175px] h-[218px] justify-center items-center">
//                                             <img
//                                                 src={product.img}
//                                                 className="border-gray-500 border-2 w-[110px] h-[110px] rounded-full object-contain"
//                                             />
//                                             <p>{product.name}</p>
//                                         </section>
//                                     );
//                                 })}
//                             </section>
//                         </section>
//                     </section>
//                 </section>

//                 <section className="flex flex-col ">
//                     <span className="text-xl items-start mb-10 mt-20 font-sans font-semibold ml-[300px]">
//                         Top Sellers
//                     </span>
//                     <section className="flex flex-col justify-center items-center">
//                         <section className="flex flex-row gap-10">
//                             {Object.keys(shopsItemListing).map((sellers) => {
//                                 return (
//                                     <section
//                                         className="flex flex-col border-red-600 border-2 w-[175px] h-[218px] justify-center items-center"
//                                         onClick={() => navigateToShop(sellers)}
//                                     >
//                                         <img
//                                             src={shopsItemListing[sellers][0]}
//                                             className="border-gray-500 border-2 w-[110px] h-[110px] rounded-full object-contain"
//                                         />
//                                         <p>{sellers}</p>
//                                     </section>
//                                 );
//                             })}
//                         </section>
//                     </section>
//                 </section>

//                 <section className="flex flex-col p-10  ">
//                     <p className="font-sans font-semibold text-lg">
//                         Just For You
//                     </p>
//                     <section className="flex flex-row  gap-5 ">
//                         {recommendProduct.map((product) => {
//                             return (
//                                 <section
//                                     onClick={() =>
//                                         navigateToProductDetails(product.id)
//                                     }
//                                     key={product.id}
//                                     className="flex flex-col w-[350px] border border-gray-300 p-2"
//                                 >
//                                     <img
//                                         src={product.img}
//                                         className="h-full object-cover object-center"
//                                         alt={product.name}
//                                     />
//                                     <p className="font-sans font-semibold text-lg">
//                                         {product.name}
//                                     </p>
//                                     <p className="font-sans">
//                                         <span className="inline-block border text-[#FF6869] text-[12px] border-orange-500 rounded px-1">
//                                             Selling Fast
//                                         </span>
//                                     </p>
//                                     <p className="font-sans text-[#7450DF]">
//                                         RM{product.price}
//                                     </p>
//                                     <p>{product.rating} stars</p>
//                                 </section>
//                             );
//                         })}
//                     </section>
//                 </section>
//             </main>
//         </>
//     );
// }
// export default Marketplace;
import React, { useContext, useState } from "react";
import GlobalState, { GlobalContext } from "../../context";
import Customer_Navbar from "../../components/customer_navbar";
import { useNavigate } from "react-router-dom";
import { PieChart } from "@mui/x-charts/PieChart";
import { Typography, Stack } from "@mui/material";
import { BarChart } from "@mui/x-charts/BarChart";
import Seller_NavSidebar from "../../components/seller_sidebar";

function Marketplace() {
    const [productCategorySetOne, setProductCategorySO] = useState([
        {
            name: "Books & Stationery",
            img: "/booksIcon.png",
        },
        {
            name: "Babies & Toys",
            img: "/toysIcon.png",
        },
        {
            name: "TV & Home Appliances",
            img: "/tvIcon.png",
        },
        {
            name: "Home & Lifestyle",
            img: "/homeIcon.png",
        },
        {
            name: "Groceries",
            img: "/groceryIcon.png",
        },
    ]);

    const [productCategorySetTwo, setProductCategoryST] = useState([
        {
            name: "Electronic Accessories",
            img: "/electronicAcc.png",
        },
        {
            name: "Electronics Devices",
            img: "/electronicDev.png",
        },
        {
            name: "Women's Fashion",
            img: "/womenFashion.png",
        },
        {
            name: "Men's Fashion",
            img: "/menFashion.png",
        },
        {
            name: "Health & Supplements",
            img: "/healthIcon.png",
        },
    ]);

    const [recommendProduct, setRecommendProduct] = useState([
        {
            id: 6,
            name: "Nice Notebook",
            price: 13,
            rating: 4,
            img: "/notebook.jpeg",
            seller: "Nice",
            reviews: [],
            variations: ["Brown", "Khaki", "Grey"],
        },
        {
            id: 0,
            name: "Milo 3 in 1",
            price: 13,
            rating: 4,
            img: "/milothreeproduct.jpg",
        },
        {
            id: 4,
            name: "Builder",
            price: 13,
            rating: 2,
            img: "/builderproduct.png",
            seller: "Builder_Seller",
            reviews: [],
            variations: ["Original", "Chocolate", "Vanilla"],
        },
        {
            id: 2,
            name: "Horlicks",
            price: 8,
            rating: 3,
            img: "/horlickproduct.jpg",
            seller: "Horlicks_Seller",
            reviews: [],
            variations: ["Original", "Chocolate", "Vanilla"],
        },
    ]);

    const { shopsItemListing, productListing } = useContext(GlobalContext);
    const navigation = useNavigate();

    const navigateToShop = (seller) => {
        navigation(`/customer/shop/${seller}`, {
            state: { seller: seller },
        });
    };

    const navigateToProductDetails = (productId) => {
        
        const product = productListing.find(
            (p) => p.id === productId
        );
      
        // Navigate to the product details page with the targeted product
        navigation(`/customer/product/${productId}`, {
            state: { product },
        });
    };
    return (
        <>
            <Customer_Navbar />
            <main className="mt-36 flex flex-col">
                <section className="flex flex-row justify-center  ">
                    <img className=" object-cover " src="/setelbanner.png" />
                </section>

                <section className="flex flex-col ">
                    <span className="text-xl items-start mb-10 mt-20 font-sans font-semibold ml-[300px]">
                        Category
                    </span>
                    <section className="flex flex-col justify-center items-center">
                        <section className="flex flex-row ">
                            {productCategorySetOne.map((product) => {
                                return (
                                    <section className="flex flex-col border-2 w-[175px] h-[218px] justify-center items-center">
                                        <img
                                            src={product.img}
                                            className="border-gray-300 border-2 w-[110px] h-[110px] rounded-full object-right"
                                        />
                                        <p className="">{product.name}</p>
                                    </section>
                                );
                            })}
                        </section>
                        <section className="flex flex-row">
                            <section className="flex flex-row">
                                {productCategorySetTwo.map((product) => {
                                    return (
                                        <section className="flex flex-col border-red-600 border-2 w-[175px] h-[218px] justify-center items-center">
                                            <img
                                                src={product.img}
                                                className="border-gray-500 border-2 w-[110px] h-[110px] rounded-full object-contain"
                                            />
                                            <p>{product.name}</p>
                                        </section>
                                    );
                                })}
                            </section>
                        </section>
                    </section>
                </section>

                <section className="flex flex-col ">
                    <span className="text-xl items-start mb-10 mt-20 font-sans font-semibold ml-[300px]">
                        Top Sellers
                    </span>
                    <section className="flex flex-col justify-center items-center">
                        <section className="flex flex-row gap-10">
                            {Object.keys(shopsItemListing).map((sellers) => {
                                return (
                                    <section
                                        className="flex flex-col rounded-lg shadow-lg w-[175px] h-[218px] justify-center items-center"
                                        onClick={() => navigateToShop(sellers)}
                                    >
                                        <img
                                            src={shopsItemListing[sellers][0]}
                                            className="border-gray-500 border-2 w-[110px] h-[110px] rounded-full object-contain"
                                        />
                                        <p>{sellers}</p>
                                    </section>
                                );
                            })}
                        </section>
                    </section>
                </section>

                <section className="flex flex-col p-10  ">
                    <p className="font-sans font-semibold text-lg">
                        Just For You
                    </p>
                    <section className="flex flex-row  gap-5 ">
                        {recommendProduct.map((product) => {
                            return (
                                <section
                                    onClick={() =>
                                        navigateToProductDetails(product.id)
                                    }
                                    key={product.id}
                                    className="flex flex-col w-[350px] border border-gray-300 p-2"
                                >
                                    <img
                                        src={product.img}
                                        className="h-full object-cover object-center"
                                        alt={product.name}
                                    />
                                    <p className="font-sans font-semibold text-lg">
                                        {product.name}
                                    </p>
                                    <p className="font-sans">
                                        <span className="inline-block border text-[#FF6869] text-[12px] border-orange-500 rounded px-1">
                                            Selling Fast
                                        </span>
                                    </p>
                                    <p className="font-sans text-[#7450DF]">
                                        RM{product.price}
                                    </p>
                                    <p>{product.rating} stars</p>
                                </section>
                            );
                        })}
                    </section>
                </section>
            </main>
        </>
    );
}
export default Marketplace;
