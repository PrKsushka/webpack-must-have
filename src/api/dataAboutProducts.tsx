import axios from "axios";

export const dataAboutProducts = ({ data }: any) => axios.get("/api/getProducts", data);
