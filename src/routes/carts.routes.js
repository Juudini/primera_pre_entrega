import Router from "express";
import {
    addProduct,
    createCart,
    getProducts,
} from "../controllers/carts.controller.js";

const router = Router();

router.get("/carts/:cid", getProducts);
router.post("/carts/:cid/product/:pid", addProduct);
router.post("/carts", createCart);

export default router;
