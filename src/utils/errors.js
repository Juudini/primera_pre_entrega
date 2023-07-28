import { errorFactory } from "./errorHandler.js";

export const DuplicatedError = errorFactory("DuplicatedError");
export const ProductNotFoundError = errorFactory("ProductNotFound");
export const DeleteProductError = errorFactory("DeleteProductError");
export const UpdateProductError = errorFactory("UpdateProductError");
export const GetProductByIdError = errorFactory("GetProductByIdError");
export const GetProductError = errorFactory("GetProductError");
export const SaveToFileError = errorFactory("SaveToFileError");
export const LoadFromFileError = errorFactory("LoadFromFileError");
