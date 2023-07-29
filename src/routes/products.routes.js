import Router from "express";
import {
    addProduct,
    deleteProduct,
    getProductById,
    getProducts,
    updateProduct,
} from "../controllers/products.controller.js";

const router = Router();

router.get("/products", getProducts);
router.get("/products/:pid", getProductById);
router.post("/products", addProduct);
router.put("/products/:pid", updateProduct);
router.delete("/products/:pid", deleteProduct);

export default router;
