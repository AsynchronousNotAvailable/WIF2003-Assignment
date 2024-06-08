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

};

export default function Category({ category, url, onCategoryClicked }) {
 
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
