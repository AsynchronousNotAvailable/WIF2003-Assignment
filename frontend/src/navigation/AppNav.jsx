// AppNav.jsx
import React, { useContext } from "react";
import { GlobalContext } from "../context";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Customer_Home from "../pages/customer/customer_home";
import Landing from "../pages/general/landing";
import Login from "../pages/general/login";
import SignUp from "../pages/general/signup";
import Seller_Home from "../pages/seller/seller_home";
import Customer_Navbar from "../components/customer_navbar";
import Seller_Chat from "../pages/seller/seller_chat";
import Seller_NavSidebar from "../components/seller_sidebar";
import Customer_Chat from "../pages/customer/customer_chat";
import EditProfile from "../pages/general/EditProfile";

function AppNav() {
    const { isAuth, isSeller } = useContext(GlobalContext);

    return (
        <>
            <Router>
                <Routes>
                    <Route path="/" element={<Landing />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/editprofile" element={<EditProfile />} />
                    <Route path="/customer" element={<Customer_Home />} />
                    <Route path="/customer_chat" element={<Customer_Chat />} />
                    <Route path="/seller" element={<Seller_Home />} />
                    <Route path="/seller_chat" element={<Seller_Chat />} />
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
            <Route path="/" element={<Customer_Home />} />
            {/* Add more customer-specific routes here */}
        </>
    );
}
export default AppNav;
