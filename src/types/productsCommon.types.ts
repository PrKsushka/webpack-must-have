export interface Rating {
  rate: number;
}
export interface TopProduct {
  id?: number;
  title?: string;
  price?: number;
  description?: string;
  category?: string;
  genres?: string;
  age?: string;
  image?: string;
  date?: string;
  quantity?: number;
  count?: number;
  rating?: Rating;
}
export interface dataForm {
  name: string;
  password: string;
}
export interface Product {
  userId: number;
  id: number;
  title: string;
  body: string;
}
