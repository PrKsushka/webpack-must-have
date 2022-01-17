import axios from "axios";
import { TopProduct } from "@/types/productsCommon.types";

export const deleteProduct = (id: number) => axios.delete(`/api/products/${id}`);
export const updatedProduct = (formData: TopProduct, id: number | undefined) =>
  axios.put(`/api/products`, { formData, id });
export const addNewProduct = (formData: TopProduct) => axios.post(`/api/products`, formData);
