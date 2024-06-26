import React from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import { GlobalContext } from "../context";

function Customer_Navbar() {
    const { setUserDetails } = useContext(GlobalContext);
    const navigation = useNavigate();
    const handleLogout = () => {
        setUserDetails(null);
        localStorage.removeItem("customer");
        navigation("/");
    };

    const goToChat = () => {
        navigation(`/customer_chat`);
    };

    
    const goToCart = () => {
        navigation("/customer/cart");
    };

    const goToUserAnalysis = () => {
        navigation("/customer/analysis")
    }

    const goToProductList = () => {
        navigation("/marketplace");
    }

    const goToMarketAnalysis = () => {
        navigation("/marketplace/analysis")
    }

    const goToOrders = () => { 
        navigation("/customer/orders");
    }

    const goToProfile = () => { 
        navigation("/customer/profile");
    }

    return (
        <nav class="bg-[#5489FC] fixed w-full z-20 top-0 start-0 border-b border-gray-200">
            <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <a
                    href="https://flowbite.com/"
                    className="flex items-center space-x-3 rtl:space-x-reverse"
                >
                    <img
                        src="https://flowbite.com/docs/images/logo.svg"
                        className="h-8"
                        alt="Flowbite Logo"
                    ></img>
                    <span className="self-center text-2xl font-semibold whitespace-nowrap text-white dark:text-white">
                        Syopi
                    </span>
                </a>
                <div class="flex md:order-2 space-x-3 md:space-x-3 rtl:space-x-reverse items-center">
                    <div
                        class="cursor-pointer px-2 py-1 hover:bg-[#45b9dc] rounded-lg"
                        onClick={goToChat}
                    >
                        <i class="fa-regular fa-comment text-white"></i>
                    </div>

                    <div
                        class="cursor-pointer px-2 py-1 hover:bg-[#45b9dc] rounded-lg"
                        onClick={goToCart}
                    >
                        <i class="fa-solid fa-cart-shopping text-white"></i>
                    </div>

                    <div
                        class="cursor-pointer px-2 py-1 hover:bg-[#45b9dc] rounded-lg"
                        onClick={goToProfile}
                    >
                        <i class="fa-solid fa-user text-white"></i>
                    </div>

                    <button
                        onClick={handleLogout}
                        type="button"
                        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center"
                    >
                        Logout
                    </button>
                </div>
                <div
                    className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
                    id="navbar-sticky"
                >
                    <ul class="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-[#5489FC] md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-[#5489FC]">
                        <li>
                            <button
                                onClick={goToProductList}
                                type="button"
                                class="text-white bg-[#5489FC] hover:bg-[#45b9dc]  font-medium rounded-lg text-md px-4 py-2 text-center"
                            >
                                Home
                            </button>
                        </li>
                        

                        <li>
                            <button
                                onClick={goToOrders}
                                type="button"
                                class="text-white bg-[#5489FC] hover:bg-[#45b9dc]  font-medium rounded-lg text-md px-4 py-2 text-center"
                            >
                                Orders
                            </button>
                        </li>
                        

                        <li>
                            <button
                                type="button"
                                class="text-white  bg-[#5489FC] hover:bg-[#45b9dc] font-medium rounded-lg text-md px-4 py-2 text-center"
                                onClick={goToMarketAnalysis}
                            >
                                Marketplace Analysis
                            </button>
                        </li>

                        <li>
                            <button
                                type="button"
                                class="text-white  bg-[#5489FC] hover:bg-[#45b9dc] font-medium rounded-lg text-md px-4 py-2 text-center"
                                onClick={goToUserAnalysis}
                            >
                                User Analysis
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Customer_Navbar;
