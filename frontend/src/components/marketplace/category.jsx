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
    }
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

export default function Category({ category, url, onCategoryClicked }) {
    console.log(category, url);
    return (
        <div style={styles.card}>
            <img
                onClick={() => onCategoryClicked(category)}
                style={styles.productImage}
                src={url}
                alt="product"
            />
            <p style={styles.p}>
                <h2>{category}</h2>
            </p>
        </div>
    );
}
