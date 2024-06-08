// AppNav.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../pages/general/login";
import SignUp from "../pages/general/signup";
import Seller_Home from "../pages/seller/seller_home";
import Seller_Chat from "../pages/seller/ChatComponents/seller_chat";
import Customer_Chat from "../pages/customer/ChatComponents/customer_chat";
import MarketplaceAnalysis from "../pages/general/marketplaceAnalysis";
import SellerAnalysis from "../pages/seller/sellerAnalysis";
import ProductListing from "../pages/general/productListing";
import Product from "../pages/customer/product";
import Customer_Cart from "../pages/customer/customer_cart";
import CustomerAnalysis from "../pages/customer/customerAnalysis";
import Marketplace from "../pages/general/marketplace";
import Shop from "../pages/customer/shop";
import EditProfile from "../pages/general/EditProfile";
import Checkout from "../pages/payment/checkout";
import Orders from "../pages/payment/orders";
import OrderManagement from "../pages/seller/order_management";
import ProductManagement from "../pages/seller/product_management";
import AddProduct from "../pages/seller/add_product";
import EditSellerProfile from "../pages/seller/seller_edit_profile";
import WishlistPage from "../pages/customer/WishlistComponent/WishlistPage";
import PurchaseHistoryPage from "../pages/customer/PurchaseHistoryComponents/PurchaseHistoryPage";
import PopularProductAnalysisPage from "../pages/seller/components/PopularProductAnalysisComponents/PopularProductAnalysisPage";
import ProductInteractivityAnalysisPage from "../pages/seller/components/PopularProductAnalysisComponents/ProductInteractivityAnalysisPage";
import CustomerSegmentationPage from "../pages/seller/components/CustomerSegmentationComponents/CustomerSegmentationPage";
import Search from "../pages/general/search";

function AppNav() {
    return (
        <>
            <Router>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route
                        path="/marketplace/analysis"
                        element={<MarketplaceAnalysis />}
                    />
                    <Route path="/marketplace" element={<Marketplace />} />
                    <Route path="/customer/shop/:sellerId" element={<Shop />} />
                    <Route
                        path="/customer/products/:category"
                        element={<ProductListing />}
                    />
                    <Route
                        path="/customer/products/search/:query"
                        element={<Search />}
                    />
                    <Route
                        path="/customer/product/:productId"
                        element={<Product />}
                    />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/editprofile" element={<EditProfile />} />
                    <Route path="/customer/cart" element={<Customer_Cart />} />
                    <Route path="/customer/checkout" element={<Checkout />} />
                    <Route path="/customer/orders" element={<Orders />} />
                    <Route
                        path="/customer/analysis"
                        element={<CustomerAnalysis />}
                    />
                    <Route
                        path="/customer/wishlist"
                        element={<WishlistPage />}
                    />
                    <Route
                        path="/customer/purchase_history"
                        element={<PurchaseHistoryPage />}
                    />
                    <Route path="/customer_chat" element={<Customer_Chat />} />
                    <Route path="/seller" element={<Seller_Home />} />
                    <Route
                        path="/seller/analysis"
                        element={<SellerAnalysis />}
                    />
                    <Route
                        path="/seller/analysis/customer_segmentation"
                        element={<CustomerSegmentationPage />}
                    />
                    <Route
                        path="/seller/analysis/popular_products"
                        element={<PopularProductAnalysisPage />}
                    />
                    <Route
                        path="/seller/analysis/interacted_products"
                        element={<ProductInteractivityAnalysisPage />}
                    />
                    <Route path="/seller_chat" element={<Seller_Chat />} />
                    <Route
                        path="/seller/order_management"
                        element={<OrderManagement />}
                    />
                    <Route
                        path="/seller/product_management"
                        element={<ProductManagement />}
                    />
                    <Route
                        path="/seller/profile"
                        element={<EditSellerProfile />}
                    />
                    <Route path="/add_product_page" element={<AddProduct />} />
                </Routes>
            </Router>
        </>
    );
}

export default AppNav;
