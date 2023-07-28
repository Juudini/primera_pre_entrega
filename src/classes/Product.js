export class Product {
    constructor(title, description, price, thumbnail, code, stock) {
        if (
            typeof title !== "string" ||
            title.trim() === "" ||
            typeof description !== "string" ||
            description.trim() === "" ||
            typeof price !== "number" ||
            isNaN(price) ||
            typeof thumbnail !== "string" ||
            typeof code !== "string" ||
            code.trim() === "" ||
            typeof stock !== "number" ||
            isNaN(stock)
        ) {
            throw new Error("Error: Invalid argument values");
        }
        this.id = 0;
        this.title = title;
        this.description = description;
        this.price = price;
        this.thumbnail = thumbnail;
        this.code = code;
        this.stock = stock;
    }
}
