import fs from "fs";
import { Product } from "./Product.js";
import { DuplicatedError, ProductNotFound } from "../utils/errors.js";

export class ProductManager {
    constructor() {
        this.products = [];
        this.path = "./src/JSON/Products.json";
    }
    async #loadFromFile() {
        try {
            if (fs.existsSync(this.path)) {
                const data = await fs.promises.readFile(this.path, "utf8");
                this.products = data.trim() ? JSON.parse(data) : [];
            } else {
                await fs.promises.writeFile(this.path, "[]");
                this.products = [];
            }
        } catch (error) {
            throw new Error("Error loading products from file:", error);
        }
    }

    async #saveToFile() {
        const data = JSON.stringify(this.products, null, 2);
        try {
            await fs.promises.writeFile(this.path, data);
            console.log("Products have been saved to file.");
        } catch (error) {
            throw new Error("Error saving products to file.");
        }
    }
    #nextId() {
        let maxId = 0;
        for (const product of this.products) {
            if (product.id > maxId) {
                maxId = product.id;
            }
        }
        return maxId;
    }

    async addProduct(newProduct) {
        try {
            await this.#loadFromFile();
            const sameCode = this.products.some((element) => {
                return element.code === newProduct.code;
            });

            if (sameCode) {
                throw new DuplicatedError("Duplicated Product");
            }

            const product = new Product(
                newProduct.title,
                newProduct.description,
                newProduct.code,
                newProduct.price,
                newProduct.status,
                newProduct.stock,
                newProduct.category,
                newProduct.thumbnail
            );

            product.id = this.#nextId() + 1;

            this.products.push(product);
            await this.#saveToFile();
        } catch (error) {
            if (error instanceof DuplicatedError) {
                throw error;
            }
            throw new Error("Error: Failed to add the new product");
        }
    }

    async getProducts() {
        await this.#loadFromFile();
        return this.products;
    }
    async getProductById(id) {
        try {
            await this.#loadFromFile();
            const product = this.products.find(
                (product) => product.id === Number(id)
            );
            if (!product) {
                throw new ProductNotFound(`Product with ID ${id} not found`);
            }
            return product;
        } catch (error) {
            if (error instanceof ProductNotFound) {
                throw error;
            }
        }
    }

    async updateProduct(id, newData) {
        try {
            await this.#loadFromFile();

            const productToUpdate = this.products.find(
                (product) => product.id === Number(id)
            );

            if (!productToUpdate) {
                throw new ProductNotFound("Not Found");
            }

            const validKeys = [
                "title",
                "description",
                "code",
                "price",
                "status",
                "stock",
                "category",
                "thumbnail",
            ];

            const updatedData = Object.fromEntries(
                Object.entries(newData).filter(([key]) =>
                    validKeys.includes(key)
                )
            );

            Object.assign(productToUpdate, updatedData);

            await this.#saveToFile();
            return productToUpdate;
        } catch (error) {
            if (error instanceof ProductNotFound) {
                throw error;
            }
            throw new Error("Failed to update the product");
        }
    }

    async deleteProduct(id) {
        try {
            await this.#loadFromFile();
            const index = this.products.findIndex(
                (product) => product.id === Number(id)
            );
            if (index === -1) {
                throw new Error("Not Found");
            }

            this.products.splice(index, 1);

            await this.#saveToFile();
        } catch (error) {
            if (error.message === "Not Found") {
                throw new Error("Not Found");
            }
            throw new Error("Error: Failed to delete the product");
        }
    }
}
