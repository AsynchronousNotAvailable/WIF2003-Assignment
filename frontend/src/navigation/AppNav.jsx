// AppNav.jsx
import React, { useContext } from "react";
import { GlobalContext } from "../context";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "../pages/general/landing";
import Login from "../pages/general/login";
import SignUp from "../pages/general/signup";
import Seller_Home from "../pages/seller/seller_home";
import Customer_Navbar from "../components/customer_navbar";
import Seller_Chat from "../pages/seller/seller_chat";
import Seller_NavSidebar from "../components/seller_sidebar";
import Customer_Chat from "../pages/customer/customer_chat";
import MarketplaceAnalysis from "../pages/general/marketplaceAnalysis";
import SellerAnalysis from "../pages/seller/sellerAnalysis";
import ProductListing from "../pages/general/productListing";
import Product from "../pages/customer/product";
import Customer_Cart from "../pages/customer/customer_cart";
import CustomerAnalysis from "../pages/customer/customerAnalysis"
import Marketplace from "../pages/general/marketplace"
import Shop from "../pages/customer/shop";
import EditProfile from "../pages/general/EditProfile";
import Checkout from "../pages/payment/checkout";
import Orders from "../pages/payment/orders";
import OrderManagement from "../pages/seller/order_management";
import ProductManagement from "../pages/seller/product_management";
import AddProduct from "../pages/seller/add_product";


function AppNav() {
    const { isAuth, isSeller } = useContext(GlobalContext);

    return (
        <>
            <Router>
                <Routes>
                    <Route path="/" element={<Landing />} />
                    <Route
                        path="/marketplace/analysis"
                        element={<MarketplaceAnalysis />}
                    />
                    <Route path="/marketplace" element={<Marketplace />} />
                    <Route path="/customer/shop/:seller" element={<Shop />} />
                    <Route path="/login" element={<Login />} />
                    <Route
                        path="/customer/products"
                        element={<ProductListing />}
                    />

                    <Route path="/customer/product/:id" element={<Product />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/editprofile" element={<EditProfile />} />
                    <Route path="/customer/cart" element={<Customer_Cart />} />
                    <Route path="/customer/checkout" element={<Checkout/> } />
                    <Route path="/customer/orders" element={<Orders />} />
                    <Route
                        path="/customer/analysis"
                        element={<CustomerAnalysis />}
                    />
                    <Route path="/customer_chat" element={<Customer_Chat />} />
                    <Route path="/seller" element={<Seller_Home />} />
                    <Route
                        path="/seller/analysis"
                        element={<SellerAnalysis />}
                    />

                    <Route path="/seller_chat" element={<Seller_Chat />} />
                    <Route path="/order_management" element={<OrderManagement/>}/>
                <Route path="/product_management" element={<ProductManagement/>}/>
                <Route path="/add_product_page" element={<AddProduct/>}/>
            </Routes>
                {/* {!isAuth ? (
                <Routes>
                    <Route path="/" element={<Landing />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<SignUp />} />
                </Routes>
            ) : isSeller ? (
                    <Routes>
                    
                    <Route path="/seller" element={<Seller_Home />} />
                </Routes>
            ) : (
                <Routes>
                    <Route path="/customer" element={<Customer_Home />} />
                </Routes>
            )} */}
            </Router>
        </>
    );
}

function AuthenticatedRoutes({ isSeller }) {
    return (
        <Routes>
            {isSeller ? (
                <Route path="/" element={<SellerRoutes />} />
            ) : (
                <Route path="/" element={<CustomerRoutes />} />
            )}
        </Routes>
    );
}

function SellerRoutes() {
    return (
        <>
            <Route path="/" element={<Seller_Home />} />
            {/* Add more seller-specific routes here */}
        </>
    );
}

function CustomerRoutes() {
    return (
        <>
            <Route path="/" element={<Marketplace />} />

        </>
    );
}



export default AppNav;
