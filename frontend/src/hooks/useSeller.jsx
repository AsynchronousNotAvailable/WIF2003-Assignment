import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../context";

const useSeller = () => {
    const [seller, setSeller] = useState(null);

    // setSeller(JSON.parse(localStorage.getItem("seller")));

    
    const getSeller = () => {
        const seller = localStorage.getItem("seller");
        return seller ? JSON.parse(seller) : null;
    };


    const saveSeller = (seller) => {
        localStorage.setItem("seller", JSON.stringify(seller));
        setSeller(seller);
    };

    const clearSeller = () => {
        localStorage.removeItem("seller");
        setSeller(null);
    };

    return { seller, getSeller, saveSeller, clearSeller };
};

export default useSeller;
