import fs from "fs";
import {
    CreateCartError,
    CartNotFoundError,
    GetCartByIdError,
    LoadFromFileError,
    SaveToFileError,
} from "../utils/errors.js";
import { Cart } from "./Cart.js";
import { ProductManager } from "./ProductManager.js";

export class CartManager {
    constructor() {
        this.carts = [];
        this.path = "./src/JSON/Carts.json";
    }

    #nextId() {
        let maxId = 0;
        for (const cart of this.carts) {
            if (cart.id > maxId) {
                maxId = cart.id;
            }
        }
        return maxId + 1;
    }

    async #loadFromFile() {
        try {
            if (fs.existsSync(this.path)) {
                const data = await fs.promises.readFile(this.path, "utf8");
                this.carts = data.trim() ? JSON.parse(data) : [];
                return;
            }
            await fs.promises.writeFile(this.path, "[]");
            this.carts = [];
        } catch (error) {
            throw new LoadFromFileError(
                "Failed to load products from file",
                error
            );
        }
    }

    async #saveToFile() {
        const data = JSON.stringify(this.carts, null, 2);
        try {
            await fs.promises.writeFile(this.path, data);
            console.log("Products have been saved to file.");
        } catch (error) {
            throw new SaveToFileError("Failed to save products to file.");
        }
    }

    async createCart() {
        try {
            await this.#loadFromFile();
            const newCartId = this.#nextId();
            const newCart = new Cart(newCartId);
            this.carts.push(newCart);
            await this.#saveToFile();
            return { message: "CART has been created successfully" };
        } catch (error) {
            if (error instanceof LoadFromFileError) {
                throw error;
            } else if (error instanceof SaveToFileError) {
                throw error;
            }
            throw new CreateCartError("Failed to create cart", error);
        }
    }

    async getCartById(id) {
        try {
            await this.#loadFromFile();
            const cart = this.carts.find((cart) => cart.id === Number(id));
            if (!cart) {
                throw new CartNotFoundError("Not Found");
            }
            return cart;
        } catch (error) {
            if (error instanceof LoadFromFileError) {
                throw error;
            } else if (error instanceof CartNotFoundError) {
                throw error;
            }
            throw new GetCartByIdError("Failed to get cart by id", error);
        }
    }

    async addProductToCart(cartId, productId) {
        const manager = new ProductManager();
        try {
            await this.#loadFromFile();
            const cart = await this.getCartById(cartId);
            const producto = await manager.getProductById(productId);

            const existingProductIndex = cart.products.findIndex(
                (item) => item.id === producto.id
            );

            if (existingProductIndex !== -1) {
                cart.products[existingProductIndex].quantity += 1;
            } else {
                const dataProduct = {
                    id: producto.id,
                    quantity: 1,
                };
                cart.products.push(dataProduct);
            }

            await this.#saveToFile();

            return { message: "PRODUCTO TO CART has been added successfully" };
        } catch (error) {
            if (error instanceof LoadFromFileError) {
                throw error;
            } else if (error instanceof ProductNotFoundError) {
                throw error;
            }
        }
    }
    async getProductsInCart(id) {
        try {
            const cart = await this.getCartById(id);

            if (!cart) {
                throw new CartNotFoundError("Cart not found");
            }
            return cart.products;
        } catch (error) {
            if (error instanceof LoadFromFileError) {
                throw error;
            } else if (error instanceof CartNotFoundError) {
                throw error;
            }
        }
    }
}
