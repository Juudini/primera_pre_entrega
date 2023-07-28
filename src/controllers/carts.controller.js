import { Carts } from "../classes/Carts.js";
const cart = new Carts();

export const getCart = async (req, res) => {
    try {
        const product = await cart.getProducts();
        res.send(product);
    } catch (error) {
        return res.status(500).json({
            message: "Something goes wrong",
        });
    }
};

export const getCartById = async (req, res) => {
    try {
        const productCartId = parseInt(req.params.pid);
        const productCard = await cart.getProductById(productCartId);

        if (productCard === "Not Found")
            return res.status(404).json({ message: "Product not found" });
        res.send(productCard);
    } catch (error) {
        return res.status(500).json({
            message: "Something goes wrong",
        });
    }
};

export const postCartProduct = async (req, res) => {
    try {
        const { id, quantity } = req.body;
        const product = await cart.addProduct(quantity);
        res.send(product);
    } catch (error) {
        return res.status(500).json({
            message: "Something goes wrong",
        });
    }
};
