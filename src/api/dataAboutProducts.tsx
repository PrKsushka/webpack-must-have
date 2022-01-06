import axios from "axios";

export const getProducts = () => axios.get("/api/products");
export const getProductsByType = (param: string, value: string) => axios.get(`/api/products?${param}=${value}`);
export const getProductsByGenre = (value: string) => axios.get(`/api/products?genre=${value}`);
export const getProductsByAge = (value: string) => axios.get(`/api/products?userAge=${value}`);
