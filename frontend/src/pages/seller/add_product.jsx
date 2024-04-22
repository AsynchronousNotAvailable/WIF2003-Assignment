import DragDropImageUploader from "../../components/product_management/add_product/dragDropImageUploader";

function AddProduct() {
    return (
        <>
            <div className="flex ms-5 mb-2 me-5 mt-5">
                <p className="flex-1 font-bold text-3xl ms-5">Add Product</p>
                <div className="flex">
                    <img className="mx-2 h-auto max-w-full" src="https://via.placeholder.com/30"></img>
                    <img className="mx-2 h-auto max-w-full" src="https://via.placeholder.com/30"></img>
                    <img className="mx-2 mr-0 rounded-lg mx-2 h-auto max-w-full" src="https://via.placeholder.com/30"></img>
                </div>
                <br />
            </div>
            <div className="flex ms-5 me-2 mt-3 w-full">
                <div className="float-left w-4/5 px-5 py-5">
                    <div className="mb-7 shadow-lg px-5 py-5 rounded-md">
                        <h2 className="font-w500 mb-2">General Information</h2>
                        <h3>Product Name</h3>
                        <input className="mb-2 h-8 w-full border-2 me-4 border-border-grey ps-2 rounded-lg" type="text" placeholder="Type product name here..."/>
                        <h3>Description</h3>
                        <textarea rows="5" className="w-full border-2 me-4 border-border-grey ps-2 rounded-lg" type="text" placeholder="Type product description here..."/>
                    </div>
                    <div className="mb-7 shadow-lg px-5 py-2 rounded-md">
                        <h2 className="font-w500 mb-2">Media</h2>
                        <h3>Photo</h3>
                        <DragDropImageUploader/>
                    </div>
                    <div className="mb-7 shadow-lg px-5 py-2 rounded-md">
                        <h2 className="font-w500 mb-2">Pricing</h2>
                        <h3>Base Price</h3>
                        <input className="mb-2 h-8 w-full border-2 me-4 border-border-grey ps-2 rounded-lg" type="text" placeholder="Type base price here..."/>
                        <div className="flex w-full">
                            <div className="float-left w-1/2 mr-5 pb-5">
                                <h3>Discount Type</h3>
                                <select className=" h-8 w-full border border-border-grey rounded-lg">
                                    <option value="none">Select a discount type</option>
                                    <option value="voucher">Voucher</option>
                                </select>
                            </div>
                            <div className="float-left w-1/2">
                                <h3>Discount Percentage</h3>
                                <input className=" h-8 w-full border-2 me-4 border-border-grey ps-2 rounded-lg" type="number" placeholder="Type discount percentage here..." />
                            </div>
                        </div>
                    </div>
                    <div className="mb-7 shadow-lg px-5 py-2 rounded-md">
                        <h2 className="font-w500 mb-2">Inventory</h2>
                        <div className="flex w-full">
                            <div className="float-left w-1/3 mr-5 pb-5">
                                <h3>SKU</h3>
                                <input type="text" placeholder="Type product SKU here..." className="px-2 h-8 w-full border border-border-grey rounded-lg"/>
                            </div>
                            <div className="float-left w-1/3 mr-5">
                                <h3>Barcode</h3>
                                <input type="text" placeholder="Product barcode" className="px-2 h-8 w-full border border-border-grey rounded-lg"/>
                            </div>
                            <div className="float-left w-1/3">
                                <h3>Quantity</h3>
                                <input type="text" placeholder="Type product quantity here..." className="px-2 h-8 w-full border border-grey-1100 rounded-lg"/>
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
                                <input type="number" placeholder="Product weight..." className="px-2 h-8 w-full border border-border-grey rounded-lg"/>
                            </div>
                            <div className="float-left w-1/4 mr-5">
                                <h3>Height</h3>
                                <input type="number" placeholder="Height (cm) ..." className="px-2 h-8 w-full border border-border-grey rounded-lg"/>
                            </div>
                            <div className="float-left w-1/4 mr-5">
                                <h3>Length</h3>
                                <input type="number" placeholder="Length (cm)..." className="px-2 h-8 w-full border border-border-grey rounded-lg"/>
                            </div>
                            <div className="float-left w-1/4 pb-5">
                                <h3>Width</h3>
                                <input type="number" placeholder="Width (cm)..." className="px-2 h-8 w-full border border-border-grey rounded-lg"/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-1/5 mx-5">
                    <div className="flex w-full">
                        <button className="w-1/4 h-8 border-0 bg-blue-400 rounded-lg mx-5 my-3">Cancel</button>
                        <button className="w-3/4 h-8 border-0 bg-blue-200 rounded-lg mx-5 my-3">Add Product</button>
                    </div>
                    <div className="content-center mx-5 mb-7 shadow-lg px-5 py-5 rounded-md">
                        <h1 className="my-5">Category</h1>
                        <h3>Product Category</h3>
                        <select className=" h-8 w-full border border-border-grey rounded-lg mb-3">
                            <option value="none">Select a category</option>
                            <option value="food">Food</option>
                            <option value="cosmetics">Cosmetics</option>
                            <option value="electronics">Electronics</option>
                            <option value="pet">Pet</option>
                        </select>
                        <h3>Product Tags</h3>
                        <select className=" h-8 w-full border border-border-grey rounded-lg">
                            <option value="none">Select tags</option>
                            <option value="voucher">Beauty</option>
                            <option value="voucher">Drinks</option>
                            <option value="voucher">Tag2</option>
                            <option value="voucher">Tag3</option>
                        </select>
                    </div>
                </div>
            </div>

        </>)
}

export default AddProduct; 