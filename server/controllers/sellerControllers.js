// controllers/customerController.js

const SellerService = require("../services/sellerService");

exports.login = async (req, res) => {
    try {
        const loginData = req.body;
        const seller = await SellerService.login(loginData);
        res.json({ message: "Login Successful", seller: seller });
    } catch (error) {
        if (error.message === "Seller Not Found") {
            res.status(404).json({ error: error.message });
        } else {
            res.status(500).json({ error: error.message });
        }
    }
};

exports.getSellers = async (req, res) => {
    try {
        const sellers = await SellerService.getSellers();
        res.json({ sellers });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getSellerByUsername = async (req, res) => {
    try {
        const username = req.params.username;
        const seller = await SellerService.getSellerByUsername(username);
        res.json(seller);
    } catch (error) {
        if (error.message === "Seller Not Found") {
            res.status(404).json({ error: error.message });
        } else {
            res.status(500).json({ error: error.message });
        }
    }
};

exports.createSeller = async (req, res) => {
    try {
        const { firstName, lastName, username, email, password } = req.body;
        const sellerData = {
            firstName,
            lastName,
            username,
            email,
            password,
            products: [],
            orders: [],
        };

        const newSeller = await SellerService.createSeller(sellerData);
        res.status(201).json(newSeller);
    } catch (error) {
        if (error.message === "Invalid seller data") {
            res.status(400).json({ error: error.message });
        } else if (
            error.message === "Existing Seller With Same Email" ||
            error.message === "Existing Seller With Same Username" ||
            error.message === "Invalid Email Format For Seller"
        ) {
            res.status(409).json({ error: error.message });
        } else {
            res.status(500).json({ error: error.message });
        }
    }
};

exports.addProduct = async (req, res) => {
    try {
        const username = req.params.username;
        const { name, description, variation, pricePerUnit, category, createdDateTime, quantity, deleted, image } =
            req.body;

        const newProductData = {
            name,
            description,
            variation,
            pricePerUnit,
            category,
            review: [],
            createdDateTime,
            quantity,
            avarage_rating: 0,
            deleted: false
        };

        const newProduct = await SellerService.addProduct(
            username,
            newProductData
        );
        res.status(201).json(newProduct);
    } catch (err) {
        if (err.message === "Seller Not Found") {
            res.status(404).json({ err: err.message });
        } else if (err.message === "Duplicate Product Found") {
            res.status(409).json({ err: err.message });
        } else {
            res.status(500).json({ err: err.message });
        }
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        const username = req.params.username;
        const productId = req.params.productId;
        await SellerService.deleteProduct(username, productId);

        res.status(200).json({ message: "Product Deleted Successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.editProduct = async (req, res) => {
    try {
        const username = req.params.username;
        const productId = req.params.productId;

        const updateProductData = req.body;

        const updatedProduct = await SellerService.updateProduct(
            username,
            productId,
            updateProductData
        );

        res.status(200).json(updatedProduct);
    } catch (error) {
        if (error.message === "Seller Not Found") {
            res.status(400).json({ error: error.message });
        } else {
            res.status(500).json({ error: error.message });
        }
    }
};

exports.getOrders = async (req, res) => {
    try {
        const username = req.params.username;
        const orders = await SellerService.getOrders(username);

        res.status(200).json(orders);
    } catch (error) {
        if (
            error.message === "Seller Not Found" ||
            error.message === "Orders Not Found"
        ) {
            res.status(400).json({ error: error.message });
        } else {
            res.status(500).json({ error: error.message });
        }
    }
};

exports.getProducts = async (req, res) => {
    try {
        const username = req.params.username;
        const products = await SellerService.getProducts(username);

        res.status(200).json(products);
    } catch (error) {
        if (
            error.message === "Seller Not Found" ||
            error.message === "Products Not Found"
        ) {
            res.status(400).json({ error: error.message });
        } else {
            res.status(500).json({ error: error.message });
        }
    }
};

exports.getProductById = async (req, res) => {
  try {
    const username = req.params.username;
    const productId = req.params.productId;
    const product = await SellerService.getProductById(
      username,
      productId
    );
    res.status(200).json(product);
  } catch (error) {
    if (
      error.message === "Seller Not Found" ||
      error.message === "Products Not Found"
    ) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
};

exports.editProfile = async (req, res) => {
  try {
    const username = req.params.username;
    const profile = req.body;

    const updatedProfile = await SellerService.updateProfile(username, profile);
    res.status(200).json(updatedProfile);
  } catch (error) {
    if (error.message === "Seller Not Found") {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
}
