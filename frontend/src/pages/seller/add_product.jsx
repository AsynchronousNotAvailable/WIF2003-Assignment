import React, { useState } from "react";
import DragDropImageUploader from "../../components/product_management/add_product/dragDropImageUploader";
import { useForm } from "react-hook-form";
import { useContext } from "react";
import { GlobalContext } from "../../context";
import { useNavigate, useLocation } from "react-router-dom";
import cross_icon from "../../assets/cross_icon.png";
import cross_icon_white from "../../assets/cross_icon_white.png";
import axios from "axios";
import add_icon from "../../assets/add_icon_white.png";
import Seller_NavSidebar from "../../components/seller_sidebar";
import useSeller from "../../hooks/useSeller";

function AddProduct() {
    const { state } = useLocation();
    const { isAdd, product } = state;

    const [productName, setProductName] = useState(product ? product.name : "");
    const [productDesc, setProductDesc] = useState(
        product ? product.description : ""
    );
    const [productPrice, setProductPrice] = useState(
        product ? product.pricePerUnit : ""
    );
    const [discountType, setDiscountType] = useState("none");
    const [quantity, setQuantity] = useState(product ? product.quantity : "");
    const [discountPercentage, setDiscountPercentage] = useState(0);
    const [variations, setVariations] = useState(
        product ? product.variation : []
    );
    // const [sku, setSku] = useState();
    // const [barcode, setBarcode] = useState();
    // const [quantity, setQuantity] = useState(0);
    // const [weight, setWeight] = useState(0);
    // const [height, setHeight] = useState(0);
    // const [length, setLength] = useState(0);
    // const [width, setWidth] = useState(0);
    const [category, setCategory] = useState(product ? product.category : "");
    const [tags, setTags] = useState("none");
    const [images, setImages] = useState(product ? [product.image] : []);
    const { getSeller } = useSeller();
    const [seller, setSeller] = useState(getSeller());
    const navigation = useNavigate();
    function handleNameChange(event) {
        setProductName(() => event.target.value);
    }

    function handleDescChange(event) {
        setProductDesc(() => event.target.value);
    }

    function handleQuantityChange(event) {
        setQuantity(() => event.target.value);
    }

    function handlePriceChange(event) {
        setProductPrice(() => event.target.value);
    }

    function handleDiscountTypeChange(event) {
        setDiscountType(() => event.target.value);
    }

    function handleDiscountPercentageChange(event) {
        setDiscountPercentage(() => event.target.value);
    }

    function handleVariationChange(event, index) {
        const updatedList = variations.map((variation, i) =>
            i === index ? event.target.value : variation
        );
        setVariations(updatedList);
    }

    function addVariants(event) {
        const newVariant = "";
        setVariations([...variations, newVariant]);
    }

    function deleteVariants(index) {
        const updatedData = variations.filter((_, i) => i !== index);
        setVariations(updatedData);
    }

    // function handleSkuChange(event) {
    //     setSku(() => event.target.value)
    // }
    // function handleBarcodeChange(event) {
    //     setBarcode(() => event.target.value);
    // }
    // function handleQuantityChange(event) {
    //     setQuantity(() => event.target.value);
    // }
    // function handleWeightChange(event) {
    //     setWeight(() => event.target.value);
    // }
    // function handleHeightChange(event) {
    //     setHeight(() => event.target.value);
    // }
    // function handleLengthChange(event) {
    //     setLength(() => event.target.value);
    // }
    // function handleWidthChange(event) {
    //     setWidth(() => event.target.value);
    // }
    function handleCategoryChange(event) {
        setCategory(() => event.target.value);
    }
    function handleTagsChange(event) {
        setTags(() => event.target.value);
    }
    function handleCancelClick() {
        navigation("/seller/product_management");
    }

    function addSellerProduct(productObj) {
        const username = seller.username;
        console.log(productObj);
        try {
            axios
                .post(
                    `http://localhost:1234/api/sellers/${username}/product/new`,
                    productObj
                )
                .then((_) => {
                    window.alert("Product added successfully");
                    navigation(-1);
                });
        } catch (err) {
            console.log(err.response.data);
            throw err;
        }
    }

    function editSellerProduct(productObj, productID) {
        const username = seller.username;
        console.log(productObj);
        axios
            .put(
                `http://localhost:1234/api/sellers/${username}/${productID}/edit`,
                productObj
            )
            .then((_) => {
                window.alert("Product edited successfully");
                navigation(-1);
            });
    }

    async function handleSubmit(event) {
        event.preventDefault();

        // const base64 = await convertToBase64(images[0] ?? null)
        // console.log(base64);
        const obj = {
            name: productName,
            description: productDesc,
            pricePerUnit: productPrice,
            quantity: quantity,
            // "SKU": sku,
            //   Category: category,
            // "Stock": quantity,
            //   Status: Math.floor(Math.random() * 4),
            createdDateTime: isAdd ? Date() : product.createdDateTime,
            variation: variations.filter((item) => item.trim() !== ""),
            category: category,
            deleted: false,
            image:
                images && images.length > 0
                    ? await extractBase64Strings(images)
                    : [],
        };
        /* var fs = require('fs');
        fs.readFile("../../components/order_management/mock_product_data.json", 'utf8', function readFileCallback(err, data){
            if (err){
                console.log(err);
            } else {
            obj = JSON.parse(); //now it an object
            obj.push(obj); //add some data
            const json = JSON.stringify(obj); //convert it back to json
            fs.writeFile("../../components/order_management/mock_product_data.json", json, 'utf8'); // write it back 
        }}); */

        isAdd ? addSellerProduct(obj) : editSellerProduct(obj, product._id);
    }

    async function extractBase64Strings(images) {
        const base64Promises = images.map((image) => {
            if (typeof image[0] === "string" || image[0] instanceof String) {
                return image[0];
            } else if (image.base64 instanceof Promise) {
                return image.base64;
            }
        });

        const base64Strings = await Promise.all(base64Promises);

        return base64Strings;
    }

    return (
        <>
            {" "}
            <Seller_NavSidebar />
            <div className="ml-64 mt-[70px]">
                <div className="flex ms-5 mb-2 me-5 mt-5">
                    <p className="flex-1 font-bold text-3xl ms-5" type="submit">
                        Add Product
                    </p>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="flex ms-5 me-2 mt-3 w-full">
                        <div className="float-left w-4/5 px-5 py-5">
                            <div className="mb-7 shadow-lg px-5 py-5 rounded-md">
                                <h2 className="font-semibold mb-2 text-[#353535] text-2xl">
                                    General Information
                                </h2>
                                <h3 className="font-normal text-[#777980] text-base">
                                    Product Name
                                </h3>
                                <input
                                    id="product-name"
                                    className="mb-2 h-8 w-full border-2 me-4 border-border-grey ps-2 rounded-lg"
                                    type="text"
                                    placeholder="Type product name here..."
                                    value={productName}
                                    onChange={handleNameChange}
                                />
                                <h3 className="font-normal text-[#777980] text-base">
                                    Description
                                </h3>
                                <textarea
                                    id="product-description"
                                    rows={5}
                                    className="w-full border-2 me-4 border-border-grey ps-2 rounded-lg"
                                    placeholder="Type product description here..."
                                    value={productDesc}
                                    onChange={handleDescChange}
                                />
                                <h3 className="font-normal text-[#777980] text-base">
                                    Quantity
                                </h3>
                                <input
                                    id="product-quantity"
                                    className="mb-2 h-8 w-full border-2 me-4 border-border-grey ps-2 rounded-lg"
                                    type="number"
                                    placeholder="Enter product quantity here..."
                                    value={quantity}
                                    onChange={handleQuantityChange}
                                />
                            </div>
                            <div className="mb-7 shadow-lg px-5 py-5 rounded-md">
                                <h2 className="font-semibold mb-2 text-[#353535] text-2xl">
                                    Variation
                                </h2>
                                <ul>
                                    {variations.map((variation, index) => {
                                        return (
                                            <li key={index} className="flex">
                                                <input
                                                    id="product-name"
                                                    className="mb-2 h-8 w-full border-2 me-4 border-border-grey ps-2 rounded-lg"
                                                    type="text"
                                                    placeholder="Type product name here..."
                                                    value={variation}
                                                    onChange={(event) =>
                                                        handleVariationChange(
                                                            event,
                                                            index
                                                        )
                                                    }
                                                />
                                                <button
                                                    type="button"
                                                    onClick={(_) =>
                                                        deleteVariants(index)
                                                    }
                                                    className="flex-initial w-12 bg-[#DC2626] rounded-lg h-8 mr-0 mb-3 items-center justify-center"
                                                >
                                                    <span className="text-white flex ml-4">
                                                        <img
                                                            className="h-4 mt-1"
                                                            src={
                                                                cross_icon_white
                                                            }
                                                        ></img>
                                                    </span>
                                                </button>
                                            </li>
                                        );
                                    })}
                                </ul>
                                <button
                                    type="button"
                                    onClick={addVariants}
                                    className="flex-initial w-40 bg-[#7450DF] rounded-lg h-10 mr-0 mb-3"
                                >
                                    <span className="text-white flex ml-4">
                                        <img
                                            className="h-4 mt-1"
                                            src={add_icon}
                                        ></img>
                                        <p className="ml-1">{"Add Variants"}</p>
                                    </span>
                                </button>
                            </div>
                            <div className="mb-7 shadow-lg px-5 py-2 rounded-md">
                                <h2 className="font-semibold mb-2 text-[#353535] text-2xl mb-2">
                                    Media
                                </h2>
                                <h3 className="font-normal text-[#777980] text-base">
                                    Photo
                                </h3>
                                <DragDropImageUploader
                                    images={images}
                                    setImages={setImages}
                                    isAdd={isAdd}
                                />
                            </div>
                            <div className="mb-7 shadow-lg px-5 py-2 rounded-md">
                                <h2 className="font-semibold mb-2 text-[#353535] text-2xl mb-2">
                                    Pricing
                                </h2>
                                <h3 className="font-normal text-[#777980] text-base">
                                    Base Price
                                </h3>
                                <input
                                    id="product-price"
                                    className="mb-2 h-8 w-full border-2 me-4 border-border-grey ps-2 rounded-lg"
                                    type="text"
                                    placeholder="Type base price here..."
                                    value={productPrice}
                                    onChange={handlePriceChange}
                                />
                                <div className="flex w-full">
                                    <div className="float-left w-1/2 mr-5 pb-5">
                                        <h3 className="font-normal text-[#777980] text-base">
                                            Discount Type
                                        </h3>
                                        <select
                                            id="discount-type"
                                            className=" h-8 w-full border border-border-grey rounded-lg"
                                            value={discountType}
                                            onChange={handleDiscountTypeChange}
                                        >
                                            <option value="none">
                                                Select a discount type
                                            </option>
                                            <option value="voucher">
                                                Voucher
                                            </option>
                                        </select>
                                    </div>
                                    <div className="float-left w-1/2">
                                        <h3 className="font-normal text-[#777980] text-base">
                                            Discount Percentage
                                        </h3>
                                        <input
                                            id="discount-percentage"
                                            className=" h-8 w-full border-2 me-4 border-border-grey ps-2 rounded-lg"
                                            type="number"
                                            placeholder="Type discount percentage here..."
                                            value={discountPercentage}
                                            onChange={
                                                handleDiscountPercentageChange
                                            }
                                        />
                                    </div>
                                </div>
                            </div>
                            {/* <div className="mb-7 shadow-lg px-5 py-2 rounded-md">
                                <h2 className="font-semibold mb-2 text-[#353535] text-2xl mb-2">Inventory</h2>
                                <div className="flex w-full">
                                    <div className="float-left w-1/3 mr-5 pb-5">
                                        <h3 className="font-normal text-[#777980] text-base">SKU</h3>
                                        <input id="sku" type="text" placeholder="Type product SKU here..." className="px-2 h-8 w-full border border-border-grey rounded-lg"
                                            value={sku} onChange={handleSkuChange} />
                                    </div>
                                    <div className="float-left w-1/3 mr-5">
                                        <h3 className="font-normal text-[#777980] text-base">Barcode</h3>
                                        <input id="barcode" type="text" placeholder="Product barcode" className="px-2 h-8 w-full border border-border-grey rounded-lg"
                                            value={barcode} onChange={handleBarcodeChange} />
                                    </div>
                                    <div className="float-left w-1/3">
                                        <h3 className="font-normal text-[#777980] text-base">Quantity</h3>
                                        <input id="quantity" type="text" placeholder="Type product quantity here..." className="px-2 h-8 w-full border border-grey-1100 rounded-lg"
                                            value={quantity} onChange={handleQuantityChange} />
                                    </div>
                                </div>
                            </div> */}
                            {/* <div className="mb-7 shadow-lg px-5 py-2 rounded-md">
                                <h2 className="font-semibold mb-2 text-[#353535] text-2xl mb-2">Shipping</h2>
                                <input className="inline mr-2" type="checkbox" id="physical_product" name="physical_product" value="is_physical_product" />
                                <span className="text-blue-700">This is a physical product</span>
                                <div className="flex w-full">
                                    <div className="float-left w-1/4 mr-5 pb-5">
                                        <h3 className="font-normal text-[#777980] text-base">Weight</h3>
                                        <input id="weight" type="number" placeholder="Product weight..." className="px-2 h-8 w-full border border-border-grey rounded-lg"
                                            value={weight} onChange={handleWeightChange} />
                                    </div>
                                    <div className="float-left w-1/4 mr-5">
                                        <h3 className="font-normal text-[#777980] text-base">Height</h3>
                                        <input id="height" type="number" placeholder="Height (cm) ..." className="px-2 h-8 w-full border border-border-grey rounded-lg"
                                            value={height} onChange={handleHeightChange} />
                                    </div>
                                    <div className="float-left w-1/4 mr-5">
                                        <h3 className="font-normal text-[#777980] text-base">Length</h3>
                                        <input id="length" type="number" placeholder="Length (cm)..." className="px-2 h-8 w-full border border-border-grey rounded-lg"
                                            value={length} onChange={handleLengthChange} />
                                    </div>
                                    <div className="float-left w-1/4 pb-5">
                                        <h3 className="font-normal text-[#777980] text-base">Width</h3>
                                        <input id="width" type="number" placeholder="Width (cm)..." className="px-2 h-8 w-full border border-border-grey rounded-lg"
                                            value={width} onChange={handleWidthChange} />
                                    </div>
                                </div>
                            </div> */}
                        </div>
                        <div className="w-1/5 mr-5 float-right items-end flex-1">
                            <div className="flex w-full inline-block">
                                <button
                                    className="items-center content-center flex w-28 me-2 bg-[#7450DF]/15 rounded-lg h-10"
                                    onClick={handleCancelClick}
                                >
                                    <span className="flex text-[#7450DF] pl-3">
                                        <img
                                            className="mt-2 h-3"
                                            src={cross_icon}
                                        ></img>
                                        <p className="ml-1">Cancel</p>
                                    </span>
                                </button>
                                <button
                                    type="submit"
                                    className="flex-initial w-40 bg-[#7450DF] rounded-lg h-10 mr-0 mb-3"
                                >
                                    <span className="text-white flex ml-4">
                                        <img
                                            className="h-4 mt-1"
                                            src={add_icon}
                                        ></img>
                                        <p className="ml-1">
                                            {isAdd ? "Add Product" : "Save"}
                                        </p>
                                    </span>
                                </button>
                            </div>
                            <div className="content-center mx-0 mb-7 shadow-lg px-5 py-5 rounded-md">
                                <h1 className="font-semibold mb-2 text-[#353535] text-2x">
                                    Category
                                </h1>
                                <h3 className="font-normal text-[#777980] text-base">
                                    Product Category
                                </h3>
                                <select
                                    id="category"
                                    className=" h-8 w-full border border-border-grey rounded-lg mb-3"
                                    value={category}
                                    onChange={handleCategoryChange}
                                >
                                    <option value="none">
                                        Select a category
                                    </option>
                                    <option value="Food">
                                        Food and Beverages
                                    </option>
                                    <option value="Clothing">
                                        Clothing and Accessories
                                    </option>
                                    <option value="Electronics">
                                        Electronics
                                    </option>
                                    <option value="Home&Living">
                                        Home and Living
                                    </option>
                                    <option value="Health">
                                        Health and Personal Care
                                    </option>
                                    <option value="Automotive">
                                        Automotive
                                    </option>
                                    <option value="Sports">
                                        Sports and Outdoors
                                    </option>
                                    <option value="Toys">
                                        Toys and Hobbies
                                    </option>
                                    <option value="Entertaintment">
                                        Books, Music, and Entertainment
                                    </option>
                                    <option value="Office">
                                        Office Supplies
                                    </option>
                                    <option value="Pet">Pet</option>
                                </select>
                                <h3 className="font-normal text-[#777980] text-base">
                                    Product Tags
                                </h3>
                                <select
                                    id="tags"
                                    className=" h-8 w-full border border-border-grey rounded-lg"
                                    value={tags}
                                    onChange={handleTagsChange}
                                >
                                    <option value="none">Select tags</option>
                                    <option value="fragile">Fragile</option>
                                    <option value="protected">Protected</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}

export default AddProduct;
