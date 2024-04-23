import React, {useState} from "react";
import DragDropImageUploader from "../../components/product_management/add_product/dragDropImageUploader";
import {useForm} from 'react-hook-form'
import { useContext } from "react";
import { GlobalContext } from "../../context";
import { useNavigate } from "react-router-dom";

function AddProduct() {
    const { addSellerProduct } = useContext(GlobalContext);
    
    const[productName, setProductName] = useState('');
    const[productDesc, setProductDesc] = useState('');
    const[productPrice, setProductPrice] = useState('');
    const[discountType, setDiscountType] = useState('none');
    const[discountPercentage, setDiscountPercentage] = useState(0);
    const[sku, setSku] = useState();
    const[barcode, setBarcode] = useState();
    const[quantity, setQuantity] = useState(0);
    const[weight, setWeight] = useState(0);
    const[height, setHeight] = useState(0);
    const[length, setLength] = useState(0);
    const[width, setWidth] = useState(0);
    const[category, setCategory] = useState("none");
    const[tags, setTags] = useState("none");

    const navigation = useNavigate();
    function handleNameChange(event){
        setProductName(() => event.target.value);
    }

    function handleDescChange(event){
        setProductDesc(() => event.target.value);
    }

    function handlePriceChange(event){
        setProductPrice(() => event.target.value);
    }
    
    function handleDiscountTypeChange(event){
        setDiscountType(() => event.target.value);
    }

    function handleDiscountPercentageChange(event){
        setDiscountPercentage(() => event.target.value);
    }
    function handleSkuChange(event){
        setSku(() => event.target.value)
    }
    function handleBarcodeChange(event){
        setBarcode(() => event.target.value);
    }
    function handleQuantityChange(event){
        setQuantity(() => event.target.value);
    }
    function handleWeightChange(event){
        setWeight(() => event.target.value);
    }
    function handleHeightChange(event){
        setHeight(() => event.target.value);
    }
    function handleLengthChange(event){
        setLength(() => event.target.value);
    }
    function handleWidthChange(event){
        setWidth(() => event.target.value);
    }
    function handleCategoryChange(event){
        setCategory(() => event.target.value);
    }
    function handleTagsChange(event){
        setTags(() => event.target.value);
    }
    function handleCancelClick(){
        navigation("/product_management");
    }
    function handleSubmit(event){
        event.preventDefault();
        const obj = {
            "Product": productName,
            "SKU": sku,
            "Category": category, 
            "Stock": quantity,
            "Status": Math.floor(Math.random() * 4),
            "Added": Date()
        }
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
        addSellerProduct(obj);
        navigation("/product_management");
    }

    
    return (
        <>
            <div className="flex ms-5 mb-2 me-5 mt-5">
                <p className="flex-1 font-bold text-3xl ms-5" type="submit">Add Product</p>
                <div className="flex">
                    <img className="mx-2 h-auto max-w-full" src="https://via.placeholder.com/30"></img>
                    <img className="mx-2 h-auto max-w-full" src="https://via.placeholder.com/30"></img>
                    <img className="mx-2 mr-0 rounded-lg mx-2 h-auto max-w-full" src="https://via.placeholder.com/30"></img>
                </div>
                <br />
            </div>
            <form onSubmit={handleSubmit}>
                <div className="flex ms-5 me-2 mt-3 w-full">
                <div className="float-left w-4/5 px-5 py-5">
                    <div className="mb-7 shadow-lg px-5 py-5 rounded-md">
                        <h2 className="font-w500 mb-2">General Information</h2>
                        <h3>Product Name</h3>
                        <input id="product-name" className="mb-2 h-8 w-full border-2 me-4 border-border-grey ps-2 rounded-lg" type="text" placeholder="Type product name here..." value={productName} onChange={handleNameChange}/>
                        <h3>Description</h3>
                        <textarea id="product-description" rows={5} className="w-full border-2 me-4 border-border-grey ps-2 rounded-lg" placeholder="Type product description here..."
                        value={productDesc} onChange={handleDescChange}/>
                    </div>
                    <div className="mb-7 shadow-lg px-5 py-2 rounded-md">
                        <h2 className="font-w500 mb-2">Media</h2>
                        <h3>Photo</h3>
                        <DragDropImageUploader/>
                    </div>
                    <div className="mb-7 shadow-lg px-5 py-2 rounded-md">
                        <h2 className="font-w500 mb-2">Pricing</h2>
                        <h3>Base Price</h3>
                        <input id="product-price" className="mb-2 h-8 w-full border-2 me-4 border-border-grey ps-2 rounded-lg" type="text" placeholder="Type base price here..." 
                        value={productPrice} onChange={handlePriceChange}/>
                        <div className="flex w-full">
                            <div className="float-left w-1/2 mr-5 pb-5">
                                <h3>Discount Type</h3>
                                <select id="discount-type" className=" h-8 w-full border border-border-grey rounded-lg" value={discountType} onChange={handleDiscountTypeChange}>
                                    <option value="none">Select a discount type</option>
                                    <option value="voucher">Voucher</option>
                                </select>
                            </div>
                            <div className="float-left w-1/2">
                                <h3>Discount Percentage</h3>
                                <input id="discount-percentage" className=" h-8 w-full border-2 me-4 border-border-grey ps-2 rounded-lg" type="number" placeholder="Type discount percentage here..."
                                value={discountPercentage} onChange={handleDiscountPercentageChange} />
                            </div>
                        </div>
                    </div>
                    <div className="mb-7 shadow-lg px-5 py-2 rounded-md">
                        <h2 className="font-w500 mb-2">Inventory</h2>
                        <div className="flex w-full">
                            <div className="float-left w-1/3 mr-5 pb-5">
                                <h3>SKU</h3>
                                <input id="sku" type="text" placeholder="Type product SKU here..." className="px-2 h-8 w-full border border-border-grey rounded-lg"
                                value={sku} onChange={handleSkuChange}/>
                            </div>
                            <div className="float-left w-1/3 mr-5">
                                <h3>Barcode</h3>
                                <input id="barcode" type="text" placeholder="Product barcode" className="px-2 h-8 w-full border border-border-grey rounded-lg"
                                value={barcode} onChange={handleBarcodeChange}/>
                            </div>
                            <div className="float-left w-1/3">
                                <h3>Quantity</h3>
                                <input id="quantity" type="text" placeholder="Type product quantity here..." className="px-2 h-8 w-full border border-grey-1100 rounded-lg"
                                value={quantity} onChange={handleQuantityChange}/>
                            </div>
                        </div>
                    </div>
                    <div className="mb-7 shadow-lg px-5 py-2 rounded-md">
                        <h2 className="font-w500 mb-2">Shipping</h2>
                        <input className="inline mr-2" type="checkbox" id="physical_product" name="physical_product" value="is_physical_product"/>
                        <span className="text-blue-700">This is a physical product</span>
                        <div className="flex w-full">
                            <div className="float-left w-1/4 mr-5 pb-5">
                                <h3>Weight</h3>
                                <input id="weight" type="number" placeholder="Product weight..." className="px-2 h-8 w-full border border-border-grey rounded-lg"
                                value={weight} onChange={handleWeightChange}/>
                            </div>
                            <div className="float-left w-1/4 mr-5">
                                <h3>Height</h3>
                                <input id="height" type="number" placeholder="Height (cm) ..." className="px-2 h-8 w-full border border-border-grey rounded-lg"
                                value={height} onChange={handleHeightChange}/>
                            </div>
                            <div className="float-left w-1/4 mr-5">
                                <h3>Length</h3>
                                <input id="length" type="number" placeholder="Length (cm)..." className="px-2 h-8 w-full border border-border-grey rounded-lg"
                                value={length} onChange={handleLengthChange}/>
                            </div>
                            <div className="float-left w-1/4 pb-5">
                                <h3>Width</h3>
                                <input id="width" type="number" placeholder="Width (cm)..." className="px-2 h-8 w-full border border-border-grey rounded-lg"
                                value={width} onChange={handleWidthChange}/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-1/5 mx-5">
                    <div className="flex w-full">
                        <button onClick={handleCancelClick} className="w-1/4 h-8 border-0 bg-blue-400 rounded-lg mx-5 my-3">Cancel</button>
                        <button className="w-3/4 h-8 border-0 bg-blue-200 rounded-lg mx-5 my-3">Add Product</button>
                    </div>
                    <div className="content-center mx-5 mb-7 shadow-lg px-5 py-5 rounded-md">
                        <h1 className="my-5">Category</h1>
                        <h3>Product Category</h3>
                        <select id="category" className=" h-8 w-full border border-border-grey rounded-lg mb-3"
                        value={category} onChange={handleCategoryChange}>
                            <option value="none">Select a category</option>
                            <option value="food">Food</option>
                            <option value="cosmetics">Cosmetics</option>
                            <option value="electronics">Electronics</option>
                            <option value="pet">Pet</option>
                        </select>
                        <h3>Product Tags</h3>
                        <select id="tags" className=" h-8 w-full border border-border-grey rounded-lg"
                        value={tags} onChange={handleTagsChange}>
                            <option value="none">Select tags</option>
                            <option value="voucher">Beauty</option>
                            <option value="voucher">Drinks</option>
                            <option value="voucher">Tag2</option>
                            <option value="voucher">Tag3</option>
                        </select>
                    </div>
                </div>
            </div>
            </form>
            

        </>)
}

export default AddProduct; 