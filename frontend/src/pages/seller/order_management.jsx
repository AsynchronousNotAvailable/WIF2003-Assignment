import React, {useState} from "react";
import Seller_NavSidebar from '../../components/seller_sidebar';
import { BasicTable } from "../../components/order_management/order_table";
import {SortingTable} from "../../components/order_management/sorting_table"


function OrderManagement(){
    function onExportClick(){

    }

    function onAddProductClick(){

    }
    
    const selected = [true, false, false, false]
    return (
        <>
            {/* <Seller_NavSidebar/> */}
            <div className="flex ms-5 mb-2 me-2 float-left">
                <p className="flex-1 font-bold text-3xl">Order</p>
                <div className="flex">
                    <img className="mx-2 h-auto max-w-full" src="https://via.placeholder.com/30"></img>
                    <img className="mx-2 h-auto max-w-full" src="https://via.placeholder.com/30"></img>
                    <img className="mx-2 mr-0 rounded-lg mx-2 h-auto max-w-full" src="https://via.placeholder.com/30"></img>
                </div>
                <br/>
            </div>
            <div className="flex ms-5 me-2 mb-2">
                <input type="text" placeholder="Search product" className="flex-1 border-2 me-4 border-border-grey ps-2 rounded-lg"></input>
                <button className="flex-initial w-24 me-2 bg-button-blue/15 rounded-lg h-10 " onClick={onExportClick}>Export</button>
                <button className="flex-initial w-36 bg-button-blue rounded-lg h-10" onClick={onAddProductClick}>Add Product</button>
            </div>  
            <div className="flex ms-5 me-2 max-w-full">
                <div className="border-2 border-border-grey rounded-lg">   
                    <button className="mx-2 h-9">All Product</button>
                    <button className="mx-2 h-9">Published</button>
                    <button className="mx-2 h-9">Low Stock</button>
                    <button className="mx-2 h-9">Draft</button>
                </div>
                <div className="flex-1"></div>
                <div className="float-end">
                    <button className="mx-2 mr-0 h-10 border-2 border-border-grey rounded-lg w-32">Select Date</button>
                    <button className="mx-2 mr-0 h-10 border-2 border-border-grey rounded-lg w-24">Filters</button>
                </div>
            </div>
            <div className="flex ms-5 me-2 my-2">
                <SortingTable/>
                {/* <table className="w-full">
                    <thead className="border-2 border-border-grey">
                        <tr>
                            <th className="">Order ID</th>
                            <th className="">Product</th>
                            <th className="">Date</th>
                            <th className="">Customer</th>
                            <th className="">Total</th>
                            <th className="">Payment</th>
                            <th className="">Status</th>
                            <th className="">Action</th>
                        </tr>
                    </thead>
                    <tr>
                        <td>abcd</td>
                        <td>defgh</td>
                    </tr>
                </table> */}
            </div>
        </>
    )
}

export default OrderManagement; 