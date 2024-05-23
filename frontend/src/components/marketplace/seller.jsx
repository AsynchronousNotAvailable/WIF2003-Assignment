import React from "react";
const styles = {
    productImage: {
        width: "100%",
        height: "16em",
        objectFit: "cover",
        borderRadius: "20px 20px 0 0",
    },
    card: {
        boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
        maxWidth: "320px",
        margin: "1rem",
        textAlign: "center",
        fontFamily: "Arial, sans-serif",
        borderRadius: "20px",
    },
    price: {
        color: "grey",
        fontSize: "22px",
    },
    p: {
        padding: "10px",
    },
    // button: {
    //     border: "none",
    //     outline: "0",
    //     padding: "12px",
    //     color: "white",
    //     backgroundColor: "#000",
    //     textAlign: "center",
    //     cursor: "pointer",
    //     width: "100%",
    //     fontSize: "18px",

    // },
    // buttonHover: {
    //     opacity: "0.7",
    // },
};

export default function Seller({ sellerId, name, pfp, navigateToShop }) {
    console.log(sellerId, name, pfp);
    return (
        <div
            className="border-2 border-black flex flex-col justify-center w-64 h-92 my-5 rounded-xl shadow-xl px-10 py-10 items-center hover:bg-slate-100"
            onClick={() => navigateToShop(sellerId)}
        >
            <img
                src={pfp}
                className="border-gray-500 border-2 w-[110px] h-[110px] rounded-full shadow-2xl object-contain mb-5"
            />
            <p className="font-sans font-light text-xl">{name}</p>
        </div>
        // <div style={styles.card}>
        //     <img
        //         onClick={() => navigateToShop(name)}
        //         style={styles.productImage}
        //         src={pfp}
        //         alt="product"
        //     />
        //     <p style={styles.p}>
        //         <h2>{name}</h2>
        //     </p>
        // </div>
    );
}
