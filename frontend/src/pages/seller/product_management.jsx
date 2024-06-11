import React, { useState, useRef, useCallback, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Seller_NavSidebar from "../../components/seller_sidebar";
import SortingTable from "../../components/order_management/sorting_table";
import { GlobalContext } from "../../context";
import useGetAllChats from "../../hooks/useGetAllChats";
import download_icon_blue from "../../assets/download_icon_blue.png";
import calendar_icon from "../../assets/calendar_icon.png";
import filter_icon from "../../assets/filter_icon.png";
import axios from "axios";
import add_icon from "../../assets/add_icon_white.png";
import { GlobalFilter } from "../../components/order_management/global_filter";
import { format, setDate } from "date-fns";
import TableDatePicker from "../../components/order_management/tableDatePicker";
import ExportCsv from "../../components/order_management/export_csv";
import DatePicker from "react-datepicker";
import useSeller from "../../hooks/useSeller";
import { Component } from "react";
import FloatingChat from "./ChatComponents/FloatingChat";
import FloatingChatList from "./ChatComponents/FloatingChatList";

function ProductManagement() {
    const {setSelectedSeller,setSellerProduct, userDetails, selectedCustomer, setSelectedCustomer } = useContext(GlobalContext);
    console.log(userDetails);
    const {allChats} = useGetAllChats();
    console.log(allChats);
    const navigation = useNavigate();
    const [rendered, setRendered] = useState(false);
    const [dateFilter, setDateFilter] = useState({
        startDate: null,
        endDate: null,
    });
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [productData, setProductData] = useState(null);
    const sortingTableRef = useRef();
    const { getSeller } = useSeller();
    const [seller, setSeller] = useState(getSeller());
    const [chatList, setChatList] = useState("");
    useEffect(() => {
        setRendered(() => true);
    }, [sortingTableRef]);

    useEffect(() => {
        const username = seller.username;
        axios
            .get(`http://localhost:1234/api/sellers/${username}/products`)
            .then((response) => {
                setProductData(response.data);
                console.log(response.data);
            });
    }, []);

    // useEffect(() => {
    //     console.log('FROM PRODUCT MANAGEMENT', seller);
    // }, []);

    const [floating, setFloating] = useState(false);
    const toggleFloatingChat = () => {
        setChatList(allChats)
        setFloating(!floating);
    };
    const [activeChat, setActiveChat] = useState("");
    const [activeChatContent, setActiveChatContent] = useState([]);
    const handleChatButtonClick = () => {
        // navigation("/customer/chat");
        toggleFloatingChat();
    };

   
    const [chatName, setChatName] = useState("");
    const handleChatClick = (name) => {
        setChatName(name);
        const conversation = allChats.find((chat) => chat.customerId.username === name);
        setSelectedCustomer(conversation.customerId)
        console.log(conversation);
        setActiveChatContent(conversation)

    }

    const goBackToChatList = () => {
        setChatName("");
    };


    const deleteSellerProduct = (index) => {
        const updatedData = sellerProduct.filter((_, i) => i !== index);
        console.log(index);
        console.log(updatedData);
        setSellerProduct(updatedData);
        console.log(sellerProduct);
    };

    // useEffect(() => {

    // }, [sellerProduct]);

    const { sellerProduct } = useContext(GlobalContext);

    function handleStartDateChange(date) {
        setStartDate(() => date);
        setDateFilter({ ...dateFilter, startDate: date });
        console.log(dateFilter);
    }

    function deleteDate() {
        setStartDate(null);
        setEndDate(null);
        setDateFilter({ ...dateFilter, startDate: null, endDate: null });
    }

    function handleEndDateChange(date) {
        setEndDate(() => date);
        setDateFilter({ ...dateFilter, endDate: date });
        console.log(dateFilter);
    }

    function onAddEditProductClick(isAdd, product) {
        navigation("/add_product_page", {
            state: { isAdd: isAdd, product: product },
        });
    }

    const PRODUCT_COLUMNS = [
        {
            Header: "Product",
            Footer: "Product",
            accessor: "name",
        },
        {
            Header: "Category",
            Footer: "Category",
            accessor: "category",
        },
        {
            Header: "Stock",
            Footer: "Stock",
            accessor: "quantity",
        },
        {
            Header: "Price",
            Footer: "Price",
            accessor: "pricePerUnit",
        },
        {
            Header: "Variation",
            Footer: "Variation",
            accessor: "variation",
            Cell: ({ value }) => {
                return <p className="w-60">{value.join(", ")}</p>;
            },
        },
        // {
        //     Header: 'Status',
        //     Footer: 'Status',
        //     accessor: 'Status',
        // },
        {
            Header: "Created Date",
            Footer: "Created Date",
            accessor: "createdDateTime",
            Cell: ({ value }) => {
                return format(new Date(value), "dd/MM/yyyy");
            },
        },
        {
            Header: "Action",
            Footer: "Action",
            Cell: ({ cell }) => {
                return (
                    <div className="flex">
                        {/* <button className='mx-2' onClick={() => alert('hi')}>
                            Edit
                        </button>
                        <button className='mx-2' onClick={() => alert('hi')}>
                            Hide
                        </button> */}
                        <button
                            className="mx-2 mr-0"
                            onClick={() => {
                                if (
                                    window.confirm(
                                        "Are you sure you want to delete the product?"
                                    )
                                ) {
                                    sortingTableRef.current.handleDeleteData(
                                        productData[cell.row.index]._id
                                    );
                                }
                            }}
                        >
                            Delete
                        </button>
                        <button
                            className="mx-2 mr-0"
                            onClick={() => {
                                onAddEditProductClick(
                                    false,
                                    productData[cell.row.index]
                                );
                            }}
                        >
                            Edit
                        </button>
                    </div>
                );
            },
        },
    ];

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
                        {rendered && productData && (
                            <GlobalFilter
                                filter={sortingTableRef.current?.globalFilter}
                                setFilter={
                                    sortingTableRef.current?.setGlobalFilter
                                }
                            />
                        )}
                    </div>

                    <ExportCsv
                        data={sellerProduct}
                        fileName={"seller_product"}
                    ></ExportCsv>

                    <button
                        className="flex-initial w-36 bg-[#7450DF] rounded-lg h-10"
                        onClick={() => {
                            onAddEditProductClick(true, null);
                        }}
                    >
                        <span className="text-white flex ml-4">
                            <img src={add_icon}></img>
                            <p className="ml-1">Add Product</p>
                        </span>
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
                        <span className="w-28 mr-3 inline-block">
                            <p>Start Date: </p>
                            <DatePicker
                                className="border-2 border-color-border-100 rounded-lg pl-4 w-28"
                                selected={startDate}
                                onChange={handleStartDateChange}
                                dateFormat="dd/MM/YYYY"
                            />
                        </span>
                        <span className="w-28 inline-block	">
                            <p>End Date: </p>
                            <DatePicker
                                className="border-2 border-color-border-100 rounded-lg pl-4 w-28"
                                selected={endDate}
                                onChange={handleEndDateChange}
                                dateFormat="dd/MM/YYYY"
                            />
                        </span>
                        <button
                            className="mt-5 ml-2 w-24 rounded-lg bg-[#7450DF] rounded-lg h-8"
                            onClick={deleteDate}
                        >
                            <p className="text-white ">Clear</p>
                        </button>
                        {/* <button className="mx-2 mr-0 h-10 border-2 border-border-grey rounded-lg w-24">
                            <span className='flex ml-4'><img src={filter_icon}></img><p className='text-border-100 text-textGrey-400 ml-1'>Filter</p></span>
                        </button> */}
                    </div>
                </div>
                <div className="flex ms-5 me-2 my-2">
                    {productData && (
                        <SortingTable
                            ref={sortingTableRef}
                            columns={PRODUCT_COLUMNS}
                            data={productData}
                            deleteSellerProduct={deleteSellerProduct}
                            dateFilter={dateFilter}
                        />
                    )}
                </div>
                <button
                    className="fixed bottom-10 right-10 bg-blue-500 text-white px-4 py-2 rounded-full shadow-md hover:bg-blue-600"
                    onClick={handleChatButtonClick}
                >
                    <i className="fa fa-comment"></i>
                </button>

                {floating && (
                    <FloatingChatList
                        chatList={chatList}
                        handleChatClick={handleChatClick}
                    />
                )}
                {chatName !== "" && (
                    <FloatingChat
                        activeChat={chatName}
                        activeChatContent={activeChatContent}
                        goBackToChatList={goBackToChatList}
                    />
                )}
            </div>
        </>
    );
}
export default ProductManagement;
