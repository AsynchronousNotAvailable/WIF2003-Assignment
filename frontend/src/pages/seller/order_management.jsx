import React, { useMemo, useState, useEffect, forwardRef, useRef } from 'react'
import Seller_NavSidebar from '../../components/seller_sidebar';
import SortingTable from "../../components/order_management/sorting_table"
import order_data from "../../components/order_management/cleaned_data.json"
import download_icon_blue from "../../assets/download_icon_blue.png"
import calendar_icon from "../../assets/calendar_icon.png"
import filter_icon from "../../assets/filter_icon.png"
import { GlobalFilter } from "../../components/order_management/global_filter";
import ExportCsv from "../../components/order_management/export_csv";
import useSeller from "../../hooks/useSeller";
import { GlobalContext } from "../../context";
import { useContext } from "react";
import axios from "axios";
import { format, setDate } from "date-fns";





function OrderManagement(){
    const sortingTableRef = useRef(); 
    const { deleteSellerOrder } = useContext(GlobalContext)
    const [rendered, setRendered] = useState(false);
    const { getSeller } = useSeller();
    const [seller, setSeller] = useState(getSeller());
    const [sellerOrder, setSellerOrder] = useState(null);

    useEffect(() => {
        setRendered(() => true);
    }, [sortingTableRef])
    
    const getInitialData = async () => {
      const username = seller.username;
      try{
        console.log(`http://localhost:8080/api/sellers/${username}/orders`);
        const response = await axios
        .get(`http://localhost:8080/api/sellers/${username}/orders`);

        await Promise.all(response.data.map(async (orders) => {
            const name = await getProductNameById(username, orders.product);
            orders.name = name; 
        })).then(() => {
            setSellerOrder(response.data);
        });
      } catch (e){
        console.log(e.toString())
      }
    };

    useEffect(() => {
        getInitialData();
    }, []);


    async function getProductNameById(username, id) {
        console.log(`http://localhost:8080/api/sellers/${username}/products/${id}`);
      const response = await axios.get(
        `http://localhost:8080/api/sellers/${username}/products/${id}`
      );

      return response.data.name;
    }


    const ORDER_COLUMNS = [
        {
            Header: 'Order ID',
            Footer: 'Order ID',
            accessor: '_id',
        },
        {
            Header: 'Product ID',
            Footer: 'Product ID',
            accessor: 'product'
    
        },
        {
            Header: 'Product Name',
            Footer: 'Product Name',
            accessor: 'name',
            // Cell: ({ cell })  => {
            //     const id = sellerOrder[cell.row.index].product;
            //     const username = seller.username;
            //     const productName = await getProductNameById(username, id);
            //     return <p>{productName}</p>
            // }
    
        },
        {
            Header: 'Date Placed',
            Footer: 'Date Placed',
            accessor: 'time_placed',
            Cell: ({ value }) => { return format(new Date(value), 'dd/MM/yyyy') },
        },
        {
            Header: 'Date Received',
            Footer: 'Date Received',
            accessor: 'time_received',
            Cell: ({ value }) => { return value ? format(new Date(value), 'dd/MM/yyyy') : "Not Received" },
        },
        {
            Header: 'Total Price',
            Footer: 'Total Price',
            accessor: 'totalPricePerOrder',
        },
        {
            Header: 'Status',
            Footer: 'Status',
            accessor: 'status',
        }
    ]
    
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
                            <GlobalFilter filter={sortingTableRef.current?.globalFilter} setFilter={sortingTableRef.current?.setGlobalFilter} />
                        }
                    </div>
                    <ExportCsv data={sellerOrder} fileName={"seller_order"}/>
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
                {sellerOrder && <SortingTable ref={sortingTableRef} columns={ORDER_COLUMNS} data={sellerOrder}/>}
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