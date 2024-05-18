// import { useEffect, useState } from "react";

// const useSeller = () => {
//     const [seller, setSeller] = useState(null);

//     useEffect(() => {
//         const seller = localStorage.getItem("seller");
//         if (seller) {
//             setSeller(JSON.parse(seller));
//         }
//     });

//     const saveSeller = (seller) => {
//         localStorage.setItem("seller", JSON.stringify(seller));
//         setSeller(seller);
//     }

//     const clearSeller = () => {
//         localStorage.removeItem("seller");
//         setSeller(null);
//     }

//     return {seller, saveSeller, clearSeller}
// }

// export default useSeller;