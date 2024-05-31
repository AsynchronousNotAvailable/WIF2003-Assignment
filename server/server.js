const express = require("express");
const { connect } = require("mongoose");
const customerRoutes = require("./routes/customerRoutes");
const sellerRoutes = require("./routes/sellerRoutes");
const productRoutes = require("./routes/productRoutes");
const salesRoutes = require("./routes/salesRoutes");

const messageRoutes = require("./routes/messageRoutes");
const { app, server } = require("./socket");
const cors = require("cors");

//change port number
const PORT = 1234;

//so can parse json request body
app.use(express.json({ limit: "2mb" }));
app.use(express.urlencoded({ limit: "2mb" }));

app.use(cors());

app.use("/api/customers", customerRoutes);
app.use("/api/sellers", sellerRoutes);
app.use("/api/products", productRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/sales", salesRoutes);

connectDb()
    .then(() => {
        server.listen(PORT, () => {
            console.log(`Server started on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error("Error connecting to database:", err);
    });

// app.use("/api/sales", salesRoutes);
async function connectDb() {
    // const url =
    //     "mongodb+srv://sandbox:sandboxyyds@cluster0.gre7tst.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
    const url =
        "mongodb+srv://syopi:syopiyyds@cluster0.kdyzyta.mongodb.net/syopi?retryWrites=true&w=majority&appName=Cluster0";
    try {
        await connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`Database connected: ${url}`);
    } catch (err) {
        console.error("Error connecting to database:", err.message);
        throw err;
    }
}
