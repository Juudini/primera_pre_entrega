import Router from "express";
import { createCart, getCartById } from "../controllers/carts.controller.js";

const router = Router();

router.get("/carts/:cid", getCartById);
router.post("/carts/:cid/product/:pid");
router.post("/carts", createCart);

export default router;
