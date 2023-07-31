import { InvalidArgValuesError } from "../utils/errors.js";

export class Product {
    constructor(
        title,
        description,
        code,
        price,
        status,
        stock,
        category,
        thumbnail
    ) {
        if (
            typeof title !== "string" ||
            title.trim() === "" ||
            typeof description !== "string" ||
            description.trim() === "" ||
            typeof code !== "string" ||
            typeof price !== "number" ||
            isNaN(price) ||
            code.trim() === "" ||
            typeof status !== "boolean" ||
            typeof stock !== "number" ||
            typeof category !== "string" ||
            isNaN(stock) ||
            !Array.isArray(thumbnail) ||
            !thumbnail.every((item) => typeof item === "string")
        ) {
            throw new InvalidArgValuesError("Invalid argument values");
        }
        this.id = 0;
        this.title = title;
        this.description = description;
        this.code = code;
        this.price = price;
        this.status = status;
        this.stock = stock;
        this.category = category;
        this.thumbnail = thumbnail;
    }
}
