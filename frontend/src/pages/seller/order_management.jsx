import React, { useMemo, useState, useEffect, forwardRef, useRef } from 'react'
import Seller_NavSidebar from '../../components/seller_sidebar';
import SortingTable from "../../components/order_management/sorting_table"
import order_data from "../../components/order_management/cleaned_data.json"
import download_icon_blue from "../../assets/download_icon_blue.png"
import calendar_icon from "../../assets/calendar_icon.png"
import filter_icon from "../../assets/filter_icon.png"
import { GlobalFilter } from "../../components/order_management/global_filter";
import { GlobalContext } from "../../context";
import { useContext } from "react";




function OrderManagement(){
    const sortingTableRef = useRef(); 
    function onExportClick(){

    }
    const { deleteSellerOrder } = useContext(GlobalContext)
    const [rendered, setRendered] = useState(false);
    const {sellerOrder} = useContext(GlobalContext);

    useEffect(() => {
        setRendered(() => true);
    }, [sortingTableRef])

    function onAddProductClick(){

    }
    const ORDER_COLUMNS = [
        {
            Header: 'Order ID',
            Footer: 'Order ID',
            accessor: 'order_id',
        },
        {
            Header: 'Product',
            Footer: 'Product',
            accessor: 'product'
    
        },
        {
            Header: 'Date',
            Footer: 'Date',
            accessor: 'date',
        },
        {
            Header: 'Customer',
            Footer: 'Customer',
            accessor: 'customer',
        },
        {
            Header: 'Total',
            Footer: 'Total',
            accessor: 'total',
        },
        {
            Header: 'Payment',
            Footer: 'Payment',
            accessor: 'payment',
        },
        {
            Header: 'Status',
            Footer: 'Status',
            accessor: 'status',
        }
    ]
    const selected = [true, false, false, false]
    return (
        <>
            {/* <Seller_NavSidebar/> */}
            <Seller_NavSidebar />
            <div className="ml-64 mt-[70px]">
                <div className="flex ms-5 mb-3 me-2">
                    <p className="flex-1 font-bold text-3xl">Order</p>
                    {/* <div className="flex">
                        <img
                            className="mx-2 h-7 max-w-full"
                            src={notification_icon}
                        ></img>
                        <img
                            className="mx-2 h-auto max-w-full"
                            src="https://via.placeholder.com/30"
                        ></img>
                        <img
                            className="mx-2 mr-0 rounded-lg mx-2 h-auto max-w-full"
                        src="https://via.placeholder.com/30"
                        ></img>
                    </div> */}
                    <br />
                </div>
                <div className="flex ms-5 me-2 mb-2">
                    <div className="flex-1 mr-3">
                        {rendered &&
                            <GlobalFilter filter={sortingTableRef.current.globalFilter} setFilter={sortingTableRef.current.setGlobalFilter} />
                        }
                    </div>
                    <button
                        className="items-center content-center flex w-24 me-2 bg-[#7450DF]/15 rounded-lg h-10"
                        onClick={onExportClick}
                    >
                        <span className='flex text-[#7450DF] pl-3'><img className=""src={download_icon_blue}></img><p className='ml-1'>Export</p></span>
                    </button>
                    {/* <button
                        className="flex-initial w-36 bg-button-100 rounded-lg h-10"
                        onClick={onAddProductClick}
                    >
                        <span className='text-white'>Add Product</span>
                    </button> */}
                </div>
            <div className="flex ms-5 me-4 mt-3 mb-3 max-w-full h-10 hidden">
                    <div className="border-2 border-border-grey rounded-lg">
                        <button className="mx-2 h-9">All Product</button>
                        <button className="mx-2 h-9">Published</button>
                        <button className="mx-2 h-9">Low Stock</button>
                        <button className="mx-2 h-9">Draft</button>
                    </div>
                    <div className="flex-1"></div>
                    <div className="float-end flex ">
                        <button className="mx-2 mr-0 h-10 border-2 border-border-grey rounded-lg w-32">
                            <span className='flex ml-2'><img src={calendar_icon}></img><p className='text-border-100 text-textGrey-400 ml-1'>Select Date</p></span>
                        </button>
                        <button className="mx-2 mr-0 h-10 border-2 border-border-grey rounded-lg w-24">
                            <span className='flex ml-4'><img src={filter_icon}></img><p className='text-border-100 text-textGrey-400 ml-1'>Filter</p></span>
                        </button>
                    </div>
                </div>
                <div className="flex ms-5 me-2 my-2">
                <SortingTable ref={sortingTableRef} columns={ORDER_COLUMNS} stringabcd='abcd' data={sellerOrder}/>
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
            </div>
        </>
    );
}

export default OrderManagement; 