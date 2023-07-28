import { ProductManager } from "../classes/ProductManager.js";
const manager = new ProductManager();
// Obtener todos los productos o los primeros por "limit" productos
//~> |GET
export const getProducts = async (req, res) => {
    try {
        const productsAll = await manager.getProducts();
        const limit = req.query.limit || productsAll.length;
        const limitedProducts = productsAll.slice(0, limit);
        res.json(limitedProducts);
    } catch {
        return res.status(500).json({ message: "Something went wrong" });
    }
};

// Obtener un producto por su ID
//~> |GET
export const getProductById = async (req, res) => {
    try {
        const productId = req.params.pid;
        const product = await manager.getProductById(productId);
        if (product === "Not Found")
            return res.status(404).json({ message: "Product not found" });
        res.send(product);
    } catch {
        return res.status(500).json({ message: "Something went wrong" });
    }
};

//Agregar nuevo Producto
//~> |POST
export const addProduct = async (req, res) => {
    try {
        const newProduct = req.body;
        await manager.addProduct(newProduct);
        res.json({ message: "Product has been successfully added" });
    } catch (error) {
        if (error.message === "Duplicated Product") {
            return res.status(404).json({ message: "Duplicated Product" });
        }
        return res.status(500).json({ message: "Something went wrong" });
    }
};

//Actualizar propiedades del Producto
//~> |PUT
export const updateProduct = async (req, res) => {
    try {
        const productId = req.params.pid;
        const newData = req.body;

        await manager.updateProduct(productId, newData);

        res.json({ message: "Product has been successfully updated" });
    } catch (error) {
        if (error.message === "Not Found") {
            return res.status(404).json({ message: "Product not found" });
        }
        return res.status(500).json({ message: "Something went wrong" });
    }
};

//Eliminar un Producto
//~> |DELETE
export const deleteProduct = async (req, res) => {
    try {
        const productId = req.params.pid;
        await manager.deleteProduct(productId);
        res.send({ message: "Product has been deleted successfully" });
    } catch (error) {
        if (error.message === "Not Found") {
            return res.status(404).json({ message: "Product not found" });
        }
        return res.status(500).json({ message: "Something went wrong" });
    }
};
