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
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

function Marketplace() {
    const { shopsItemListing, productListing } = useContext(GlobalContext);
    console.log(shopsItemListing) //time to map the value of the name, given the key 
    const options = productListing.map((option) => {
        const firstLetter = option.name[0].toUpperCase();
        return {
          firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
          ...option,
        };
      });

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
            id: 0,
            name: "Milo 3 in 1",
            price: 13,
            rating: 4,
            img: "/milothreeproduct.jpg",
        },
        {
            id: 1,
            name: "Milo 3 in 1",
            price: 13,
            rating: 4,
            img: "/milothreeproduct.jpg",
        },
        {
            id: 2,
            name: "Milo 3 in 1",
            price: 13,
            rating: 4,
            img: "/milothreeproduct.jpg",
        },
        {
            id: 3,
            name: "Milo 3 in 1",
            price: 13,
            rating: 4,
            img: "/milothreeproduct.jpg",
        },
        
    ]);
    const [userSearchInput, setUserSearchInput] = useState("");
    const [displayedProducts , setDisplayedProducts] = useState([]);

    // const handleSearchChange = (e) => {
    
    //     const userInput = e.target.value.toLowerCase();
    //     setUserSearchInput(userInput)
    //     const matchedProducts = productListing.filter((product) => 
    //         product.name.toLowerCase().includes(userInput)
    //     )
    //     setDisplayedProducts(matchedProducts)
    // }
    const handleSearchChange = (event) => {
        if(event.target.innerText){
            const userInput = (event.target.innerText).toLowerCase();
            setUserSearchInput(userInput)
            const matchedProducts = productListing.filter((product) => product.name.toLowerCase().includes(userInput))
            setDisplayedProducts(matchedProducts)
        }
        else {
            const userInput = event.target.value.toLowerCase();
            setUserSearchInput(userInput)
            const matchedProducts = productListing.filter((product) => product.name.toLowerCase().includes(userInput))
            setDisplayedProducts(matchedProducts)
        }
    };
    
    const navigation = useNavigate();

    const onSearchButtonClick = () => {
        navigation((`/customer/products`), {state : {displayedProducts}})
    }

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
            <main className="mt-36 flex flex-col gap-5">
                <section className = "flex flex-row w-full gap-2 justify-center">
                <Autocomplete
                            id="free-solo-demo"
                            freeSolo
                            sx={{ width:600 }}
                            onChange = {(event, newValue) => {
                                console.log(newValue)
                            }}
                            inputValue = {userSearchInput}
                            value = {userSearchInput}
                            onInputChange = {(newInputValue) => handleSearchChange(newInputValue)}
                            options={productListing.map((option) => option.name)}
                            renderInput={(params) => <TextField {...params} label="Search" />}
                        />

                <button onClick={onSearchButtonClick}>
                <i class="fa fa-search" aria-hidden="true"></i>
                </button>

                </section>
                <section className="flex flex-row justify-center  ">
                    <img className=" object-cover " src="/setelbanner.png" />
                </section>
                <section className="flex flex-col ">
                    <section className = "flex flex-row">
                    {/* <Stack spacing={2} sx={{ width: 300 }}>
                        
                        <Autocomplete
                            freeSolo
                            id="free-solo-2-demo"
                            disableClearable
                            onInputChange = {(newInputValue) => handleSearchChange(newInputValue)}
                            options={productListing.map((option) => option.name)}
                            renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Search input"
                                InputProps={{
                                ...params.InputProps,
                                type: 'search',
                                }}
                            />
                            )}
                        />
                        </Stack>                       */}
                    </section>
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
                                        <section className="flex flex-col  w-[175px] h-[218px] justify-center items-center">
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
                                        className="flex flex-col  w-[175px] h-[218px] justify-center items-center"
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

                <section className="flex flex-col  ">
                    <p className="ftext-xl items-start mb-10 mt-20 font-sans font-semibold ml-[300px]">
                        Just For You
                    </p>
                    <section className="flex flex-row items-center justify-center gap-5 ">
                        {recommendProduct.map((product) => {
                            return (
                                <section
                                    onClick={() =>
                                        navigateToProductDetails(product.id)
                                    }
                                    key={product.id}
                                    className="flex flex-col w-[350px] border border-gray-300 p-2 justify-center"
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
