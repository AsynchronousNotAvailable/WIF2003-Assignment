// import { useState, useEffect } from "react";
// const useCustomer = () => {
//     const [customer, setCustomer] = useState(null);

//     useEffect(() => {
//         const customer = localStorage.getItem("customer");
//         if (customer) {
//             setCustomer(JSON.parse(customer));
//         }
//     }, []);

//     const saveCustomer = () => {
//         localStorage.setItem("customer", JSON.stringify(customer));
//         setCustomer(customer);
//     };

//     const clearCustomer = () => {
//         localStorage.removeItem("customer");
//         setCustomer(null);
//     };

//     return { customer, saveCustomer, clearCustomer };
// };

// export default useCustomer;
