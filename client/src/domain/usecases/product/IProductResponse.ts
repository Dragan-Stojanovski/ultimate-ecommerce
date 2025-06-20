export interface IProductResponse {
  id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  category: string;
  createdAt?: string;
  updatedAt?: string;
}