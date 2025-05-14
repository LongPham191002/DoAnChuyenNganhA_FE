export interface Product {
  product_id: number;
  product_name: string;
  description: string;
  price: number;
  size: string;
  color: string;
  image_url: string;
  status: 'In Stock' | 'Out of Stock';
  product_quantity: number;
  category_id: number;
  update_date: string;
}
