import { errorFactory } from "./errorHandler.js";

// Products Errors

export const DuplicatedProductError = errorFactory("DuplicatedProductError");
export const ProductNotFoundError = errorFactory("ProductNotFound");
export const DeleteProductError = errorFactory("DeleteProductError");
export const UpdateProductError = errorFactory("UpdateProductError");
export const GetProductByIdError = errorFactory("GetProductByIdError");
export const GetProductError = errorFactory("GetProductError");
export const SaveToFileError = errorFactory("SaveToFileError");
export const LoadFromFileError = errorFactory("LoadFromFileError");

// Carts Errors
export const GetCartByIdError = errorFactory("GetCartByIdError");
export const CreateCartError = errorFactory("CreateCartError");
export const CartNotFoundError = errorFactory("CartNotFoundError");
