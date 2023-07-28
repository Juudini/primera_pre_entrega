import fs from "fs";
import { Product } from "./Product.js";
import {
    DuplicatedProductError,
    DeleteProductError,
    GetProductByIdError,
    GetProductError,
    LoadFromFileError,
    ProductNotFoundError,
    SaveToFileError,
    UpdateProductError,
} from "../utils/errors.js";

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
                return;
            }
            await fs.promises.writeFile(this.path, "[]");
            this.products = [];
        } catch (error) {
            throw new LoadFromFileError(
                "Failed to loading products from file:",
                error
            );
        }
    }

    async #saveToFile() {
        const data = JSON.stringify(this.products, null, 2);
        try {
            await fs.promises.writeFile(this.path, data);
            console.log("Products have been saved to file.");
        } catch (error) {
            throw new SaveToFileError(
                "Failed to saving products to file.",
                error
            );
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
                throw new DuplicatedProductError("Duplicated Product");
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
            return { message: "Product has been successfully added" };
        } catch (error) {
            if (error instanceof LoadFromFileError) {
                throw error;
            } else if (error instanceof DuplicatedProductError) {
                throw error;
            } else if (error instanceof SaveToFileError) {
                throw error;
            }
            throw new GetProductError("Failed to add the new product", error);
        }
    }

    async getProducts() {
        try {
            await this.#loadFromFile();
            return this.products;
        } catch (error) {
            if (error instanceof LoadToFileError) {
                throw error;
            }
            throw new GetProductError("Failed to get product");
        }
    }
    async getProductById(id) {
        try {
            await this.#loadFromFile();
            const product = this.products.find(
                (product) => product.id === Number(id)
            );
            if (!product) {
                throw new ProductNotFound(
                    `Product with ID ${Number(id)} not found`
                );
            }
            return product;
        } catch (error) {
            if (error instanceof LoadFromFileError) {
                throw error;
            } else if (error instanceof ProductNotFound) {
                throw error;
            }
            throw new GetProductByIdError("Failed to get product by id", error);
        }
    }

    async updateProduct(id, newData) {
        try {
            await this.#loadFromFile();

            const productToUpdate = this.products.find(
                (product) => product.id === Number(id)
            );

            if (!productToUpdate) {
                throw new ProductNotFoundError("Not Found");
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
            return { message: "Product has been successfully updated" };
        } catch (error) {
            if (error instanceof LoadFromFileError) {
                throw error;
            } else if (error instanceof ProductNotFoundError) {
                throw error;
            } else if (error instanceof SaveToFileError) {
                throw error;
            }
            throw new UpdateProductError("Failed to update the product", error);
        }
    }

    async deleteProduct(id) {
        try {
            await this.#loadFromFile();
            const index = this.products.findIndex(
                (product) => product.id === Number(id)
            );
            if (index === -1) {
                throw new ProductNotFoundError("Not Found");
            }

            this.products.splice(index, 1);

            await this.#saveToFile();
            return { message: "Product has been deleted successfully" };
        } catch (error) {
            if (error instanceof LoadFromFileError) {
                throw error;
            } else if (error instanceof ProductNotFoundError) {
                throw error;
            } else if (error instanceof SaveToFileError) {
                throw error;
            }
            throw new DeleteProductError("Failed to delete the product", error);
        }
    }
}
