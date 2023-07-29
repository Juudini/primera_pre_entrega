import { CartManager } from "../classes/CartManager.js";
import { CartNotFoundError } from "../utils/errors.js";
const cart = new CartManager();

export const getCartById = async (req, res) => {
    try {
        const cartId = req.params.cid;
        const responseCart = await cart.getCartById(cartId);
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
        const response = await cart.addNewCart();
        res.json(response);
    } catch (error) {
        return res.status(500).json({
            message: "Something goes wrong",
        });
    }
};
