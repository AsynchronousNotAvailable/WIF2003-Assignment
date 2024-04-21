import React from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Customer_Navbar() {
    const navigation = useNavigate();
    const handleLogout = () => {
        navigation("/login");
    };

    const goToChat = () => {
        navigation("/customer_chat");
    };
    return (
        <nav class="bg-[#5489FC] fixed w-full z-20 top-0 start-0 border-b border-gray-200">
            <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <a
                    href="https://flowbite.com/"
                    class="flex items-center space-x-3 rtl:space-x-reverse"
                >
                    <img
                        src="https://flowbite.com/docs/images/logo.svg"
                        class="h-8"
                        alt="Flowbite Logo"
                    ></img>
                    <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
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

                    <div class="cursor-pointer px-2 py-1 hover:bg-[#45b9dc] rounded-lg">
                        <i class="fa-regular fa-cart-shopping text-white"></i>
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
                    class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
                    id="navbar-sticky"
                >
                    <ul class="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-[#5489FC] md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-[#5489FC]">
                        <li>
                            <a
                                href="#"
                                class="block py-2 px-3 text-white  rounded md:bg-transparent md:text-white md:p-0"
                                aria-current="page"
                            >
                                Home
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                            >
                                About
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                            >
                                Services
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                            >
                                Contact
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Customer_Navbar;
