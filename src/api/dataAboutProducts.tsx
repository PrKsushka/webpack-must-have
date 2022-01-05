import axios from "axios";

export const dataAboutProducts = () => axios.get("/api/products");
export const sortDataByType=(param:string, value:string)=>axios.get(`/api/products?${param}=${value}`);
export const sortDataByGenre = (value: string) => axios.get(`/api/products?genre=${value}`);
export const sortDataByAge=(value:string)=>axios.get(`/api/products?userAge=${value}`);
