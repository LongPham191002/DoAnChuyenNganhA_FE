export interface Product {
  product_Id: number;
  productName: string;
  description: string;
  price: number;
  size: string;
  color: string;
  imageUrl: string;
  status: 'In Stock' | 'Out of Stock';
  productQuantity: number;
  categoryId: number;
  updateDate: string;
}
