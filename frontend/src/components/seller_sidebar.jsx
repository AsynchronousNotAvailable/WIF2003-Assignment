import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../context";

function Seller_NavSidebar() {
  const { sellerNavBarSelected, setSellerNavBarSelected } =
    useContext(GlobalContext);
  console.log(sellerNavBarSelected);
  const navigation = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("seller");
    navigation("/");
  };

  const toReportAndAnalysis = () => {
    setSellerNavBarSelected("RnA");
    navigation("/seller/analysis");
  };
  const toSellerProfilePage = () => {
    setSellerNavBarSelected("Profile");
    navigation("/seller/profile");
  };
  const goToChat = () => {
    navigation("/seller/seller_chat");
  };
  const toOrderManagement = () => {
    setSellerNavBarSelected("OrderMgmt");
    navigation("/seller/order_management");
  };
  const toProductManagement = () => {
    setSellerNavBarSelected("ProductMgmt");
    navigation("/seller/product_management");
  };
  return (
    <div class="font-inter">
      <nav class="fixed top-0 z-50 w-full bg-white border-b border-gray-200 ">
        <div class="px-3 py-3 lg:px-5 lg:pl-3">
          <div
            class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
            id="navbar-sticky"
          >
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
            {/* <ul class="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-purple-800 md:dark:bg-purple-900 dark:border-purple-700">
                            <li>
                                <a
                                    href="#"
                                    class="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500"
                                    aria-current="page"
                                >
                                    Dashboard
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                                >
                                    Orders
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                                >
                                    Products
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                                >
                                    Settings
                                </a>
                            </li>
                        </ul> */}

            <div className="flex flex-row gap-5">
              <div class="cursor-pointer px-2 py-1 hover:bg-[#B8A3F9] rounded-lg">
                <i class="fa-regular fa-bell text-[#7450DF]"></i>
              </div>
              <div
                class="cursor-pointer px-2 py-1 hover:bg-[#B8A3F9] rounded-lg"
                onClick={goToChat}
              >
                <i class="fa-regular fa-comment text-[#7450DF]"></i>
              </div>

              <button
                onClick={handleLogout}
                type="button"
                class="text-white  bg-[#7450DF] hover:bg-[#4416CD] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <aside
        id="logo-sidebar"
        class="fixed top-0 left-0 z-50 w-64 h-screen pt-5 transition-transform -translate-x-full bg-[#7450DF] border-r border-gray-200 sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div class="flex items-center justify-between px-4 ">
          <a href="" class="flex items-center space-x-3 rtl:space-x-reverse">
            <img
              src="https://flowbite.com/docs/images/logo.svg"
              class="h-8"
              alt="Flowbite Logo"
            ></img>
            <span class="self-center text-2xl text-white font-semibold whitespace-nowrap ">
              Syopi
            </span>
          </a>
        </div>

        <div class="h-full mt-5 px-3 pb-4 bg-[#7450DF] ">
          <ul class="space-y-2 font-medium">
            <li onClick={toProductManagement}>
              <a
                className={
                  sellerNavBarSelected === "ProductMgmt"
                    ? "border-white border-2 flex items-center p-2 my-4 text-white rounded-md hover:bg-gray-700"
                    : "flex items-center p-2 my-4 text-white rounded-md hover:bg-gray-700"
                }
              >
                <i class="w-5 fa-solid fa-boxes-stacked fa-lg text=[#B197FC]"></i>
                <span class="ms-3 font-inter font-medium">
                  Product Management
                </span>
              </a>
            </li>
            <li onClick={toOrderManagement}>
              <a
                className={
                  sellerNavBarSelected === "OrderMgmt"
                    ? "border-white border-2 flex items-center p-2 my-4 text-white rounded-md hover:bg-gray-700"
                    : "flex items-center p-2 my-4 text-white rounded-md hover:bg-gray-700"
                }
              >
                <i class="w-5 fa-solid fa-bag-shopping fa-lg text-white"></i>
                <span class="flex-1 ms-3 whitespace-nowrap">
                  Order Management
                </span>
              </a>
            </li>
            <li onClick={toReportAndAnalysis}>
              <a
                className={
                  sellerNavBarSelected === "RnA"
                    ? "border-white border-2 flex items-center p-2 my-4 text-white rounded-md hover:bg-gray-700"
                    : "flex items-center p-2 my-4 text-white rounded-md hover:bg-gray-700"
                }
              >
                <i class="w-5 fa-solid fa-magnifying-glass-chart fa-lg text-white"></i>
                <span class="flex-1 ms-3 whitespace-nowrap">
                  Report and Analysis
                </span>
              </a>
            </li>
            <li onClick={toSellerProfilePage}>
              <a
                className={
                  sellerNavBarSelected === "Profile"
                    ? "border-white border-2 flex items-center p-2 my-4 text-white rounded-md hover:bg-gray-700"
                    : "flex items-center p-2 my-4 text-white rounded-md hover:bg-gray-700"
                }
              >
                <i class="w-5 fa-solid fa-user fa-lg text-white"></i>
                <span class="flex-1 ms-3 whitespace-nowrap">
                  Seller Profile
                </span>
              </a>
            </li>
          </ul>
        </div>
      </aside>
    </div>
  );
}

export default Seller_NavSidebar;
