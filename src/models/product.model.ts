export interface Product {
  product_id: number;
  product_name: string;
  description: string;
  size: string;
  color: string;
  image_url: string;
  galleries?: string[];
  status: 'In Stock' | 'Out of Stock';
  price: number;
  product_quantity: number;
  category_id: number;
}
