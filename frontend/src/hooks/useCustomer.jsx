import { useState } from "react";

const useCustomer = () => {
    const [customer, setCustomer] = useState(null);
    const getCustomer = () => {
        const customer = localStorage.getItem("customer");
        return customer ? JSON.parse(customer) : null;
    }

    const saveCustomer = (customerData) => {
        localStorage.setItem("customer", JSON.stringify(customerData));
        setCustomer(customerData);
    };

    const clearCustomer = () => {
        localStorage.removeItem("customer");
        setCustomer(null);
    };

    return { customer, getCustomer, saveCustomer, clearCustomer };
};

export default useCustomer;
