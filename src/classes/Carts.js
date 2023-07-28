import fs from "fs";

export class Carts {
    constructor(id, quantity) {
        this.products = [];
        this.path = "./src/JSON/Carts.json";
        this.id = id;
        this.quantity = quantity;
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
    async #loadFromFile() {
        try {
            if (fs.existsSync(this.path)) {
                const data = await fs.promises.readFile(this.path, "utf8");
                this.products = JSON.parse(data) || [];
            } else {
                await fs.promises.writeFile(this.path, "[]");
                this.products = [];
            }
        } catch (err) {
            throw new Error("Error loading products from file: " + err.message);
        }
    }

    async getProducts() {
        await this.#loadFromFile();
        return this.products;
    }
    async getProductById(id) {
        try {
            return (
                this.products.find((product) => product.id === id) ||
                "Not Found"
            );
        } catch (error) {
            console.log("error getproductby id");
        }
    }

    async addProduct(product) {
        try {
            await this.#loadFromFile();
            const existingProduct = this.products.find(
                (p) => p.id === product.id
            );

            if (existingProduct) {
                existingProduct.quantity += product.quantity;
            } else {
                this.products.push({
                    id: (product.id = this.#nextId + 1),
                    quantity: product.quantity,
                });
            }

            await this.saveToFile();
        } catch (error) {
            console.log("Error adding product to cart:", error);
        }
    }
    async saveToFile() {
        const data = JSON.stringify(this.products, null, 2);
        try {
            await fs.promises.writeFile(this.path, data);
            console.log("Cart has been saved to file.");
        } catch (err) {
            throw new Error("Error saving cart to file:", err);
        }
    }
}
