import Router from "express";
import {
    addProduct,
    deleteProduct,
    getProductById,
    getProducts,
    updateProduct,
} from "../controllers/product.controller.js";
import {
    getCart,
    getCartById,
    postCartProduct,
} from "../controllers/carts.controller.js";

const router = Router();

router.get("/products", getProducts);
router.get("/products/:pid", getProductById);
router.post("/products", addProduct);
router.put("/products/:pid", updateProduct);
router.delete("/products/:pid", deleteProduct);

router.get("/carts", getCart);
router.get("/carts/:pid", getCartById);
router.post("/carts", postCartProduct);

export default router;
