import React, { useState, useRef, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Seller_NavSidebar from '../../components/seller_sidebar';
import SortingTable from "../../components/order_management/sorting_table"
import { useContext } from "react";
import { GlobalContext } from "../../context";
import download_icon_blue from "../../assets/download_icon_blue.png"
import calendar_icon from "../../assets/calendar_icon.png"
import filter_icon from "../../assets/filter_icon.png"
import add_icon from "../../assets/add_icon_white.png"
import { GlobalFilter } from "../../components/order_management/global_filter";
import { format, setDate } from 'date-fns'
import TableDatePicker from "../../components/order_management/tableDatePicker";
import ExportCsv from "../../components/order_management/export_csv";
import DatePicker from "react-datepicker";
function ProductManagement() {
    const navigation = useNavigate();
    const [rendered, setRendered] = useState(false);
    const [dateFilter, setDateFilter] = useState({
        startDate: null,
        endDate: null
    });
    const [startDate, setStartDate] = useState(null)
    const [endDate, setEndDate] = useState(null)
    const sortingTableRef = useRef();

    useEffect(() => {
        setRendered(() => true);
    }, [sortingTableRef]);
    
    function onExportClick() {

    }

    const {setSellerProduct} =  useContext(GlobalContext)

    const deleteSellerProduct = (index) => {
        const updatedData = sellerProduct.filter((_,i) => i !== index);
        console.log(index);
        console.log(updatedData);
        setSellerProduct(updatedData);
        console.log(sellerProduct);
    }
    
    // useEffect(() => {

    // }, [sellerProduct]);

    const { sellerProduct } = useContext(GlobalContext);

    function handleStartDateChange(date) {
        setStartDate(() => date);
        setDateFilter({ ...dateFilter, startDate: date })
        console.log(dateFilter)
    }

    function deleteDate() {
        setStartDate(null);
        setEndDate(null);
        setDateFilter({ ...dateFilter, startDate: null, endDate: null })
    }

    function handleEndDateChange(date) {
        setEndDate(() => date);
        setDateFilter({ ...dateFilter, endDate: date })
        console.log(dateFilter)
    }


    function onAddProductClick() {
        navigation("/add_product_page");
    }

    const PRODUCT_COLUMNS = [
        {
            Header: 'Product',
            Footer: 'Product',
            accessor: 'Product',
        },
        {
            Header: 'SKU',
            Footer: 'SKU',
            accessor: 'SKU'

        },
        {
            Header: 'Category',
            Footer: 'Category',
            accessor: 'Category',
        },
        {
            Header: 'Stock',
            Footer: 'Stock',
            accessor: 'Stock',
        },
        {
            Header: 'Price',
            Footer: 'Price',
            accessor: 'Price',
        },
        {
            Header: 'Status',
            Footer: 'Status',
            accessor: 'Status',
        },
        {
            Header: 'Added',
            Footer: 'Added',
            accessor: 'Added',
            Cell: ({ value }) => { return format(new Date(value), 'dd/MM/yyyy') },
        },
        {
            Header: 'Action',
            Footer: 'Action',
            accessor: 'action',
            Cell: ({cell, deleteSellerProduct}) => {
                return (
                    <div className='flex'>
                        {/* <button className='mx-2' onClick={() => alert('hi')}>
                            Edit
                        </button>
                        <button className='mx-2' onClick={() => alert('hi')}>
                            Hide
                        </button> */}
                        <button className='mx-2 mr-0' onClick={() => sortingTableRef.current.handleDeleteData(cell.row.index)}>
                            Delete
                        </button>
                    </div>
                )
            }
        }
    ]

    const selected = [true, false, false, false]
    return (
        <>
            <Seller_NavSidebar />
            <div className="ml-64 mt-[70px]">
                <div className="flex ms-5 mb-3 me-2">
                    <p className="flex-1 font-bold text-3xl">Product</p>
                    {/* <TableDatePicker/> */}
                    <br />
                </div>
                <div className="flex ms-5 me-2 mb-2">
                    <div className="flex-1 mr-3">
                        {rendered &&
                            <GlobalFilter filter={sortingTableRef.current.globalFilter} setFilter={sortingTableRef.current.setGlobalFilter} />
                        }
                        <ExportCsv data={sellerProduct}/>

                    </div>
                    
                    <button
                        className="flex-initial w-36 bg-[#7450DF] rounded-lg h-10"
                        onClick={onAddProductClick}
                    >
                        <span className='text-white flex ml-4'><img src={add_icon}></img><p className="ml-1">Add Product</p></span>
                    </button>
                </div>
                <div className="flex ms-5 me-2 max-w-full relative">
                    <div className="border-2 border-border-grey rounded-lg absolute hidden">
                        <button className="mx-2 h-9">All Product</button>
                        <button className="mx-2 h-9">Published</button>
                        <button className="mx-2 h-9">Low Stock</button>
                        <button className="mx-2 h-9">Draft</button>
                    </div>
                    <div className="flex-1"></div>
                    <div className="float-end flex">
                        {/* <button className="mx-2 mr-0 h-10 border-2 border-border-grey rounded-lg w-32">
                            <span className='flex ml-2'><img src={calendar_icon}></img><p className='text-border-100 text-textGrey-400 ml-1'>Select Date</p></span>
                        </button> */}
                        <span className="w-28 mr-3 inline-block"><p>Start Date: </p>
                            <DatePicker className="border-2 border-color-border-100 rounded-lg pl-4 w-28" selected={startDate} onChange={handleStartDateChange} dateFormat="dd/MM/YYYY" />
                        </span>
                        <span className="w-28 inline-block	"><p>End Date: </p>
                            <DatePicker className="border-2 border-color-border-100 rounded-lg pl-4 w-28" selected={endDate} onChange={handleEndDateChange} dateFormat="dd/MM/YYYY" />
                        </span>
                        <button className="mt-5 ml-2 w-24 rounded-lg bg-[#7450DF] rounded-lg h-8" onClick={deleteDate}><p className="text-white ">Clear</p></button>
                        {/* <button className="mx-2 mr-0 h-10 border-2 border-border-grey rounded-lg w-24">
                            <span className='flex ml-4'><img src={filter_icon}></img><p className='text-border-100 text-textGrey-400 ml-1'>Filter</p></span>
                        </button> */}
                    </div>
                </div>
                <div className="flex ms-5 me-2 my-2">
                    <SortingTable ref={sortingTableRef} columns={PRODUCT_COLUMNS} data={sellerProduct} deleteSellerProduct={deleteSellerProduct} dateFilter={dateFilter} />
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

export default ProductManagement; 