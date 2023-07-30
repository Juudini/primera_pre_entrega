import { CartManager } from "../classes/CartManager.js";
import { CartNotFoundError } from "../utils/errors.js";
const manager = new CartManager();

export const getProducts = async (req, res) => {
    try {
        const cartId = req.params.cid;
        const responseCart = await manager.getProductsInCart(cartId);
        res.send(responseCart);
    } catch (error) {
        if (error instanceof CartNotFoundError) {
            return res.status(404).json({ message: "Cart not found" });
        }
        return res.status(500).json({
            message: "Something goes wrong",
        });
    }
};

export const createCart = async (req, res) => {
    try {
        const response = await manager.createCart();
        res.json(response);
    } catch (error) {
        return res.status(500).json({
            message: "Something goes wrong",
        });
    }
};

export const addProduct = async (req, res) => {
    try {
        const cartId = req.params.cid;
        const productId = req.params.pid;
        const response = await manager.addProductToCart(cartId, productId);
        res.send(response);
    } catch (error) {
        return res.status(500).json({
            message: "Something goes wrong",
        });
    }
};
