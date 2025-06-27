export interface User {
  id: string;
  name: string;
  email: string;
  role: 'buyer' | 'seller';
  avatar?: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  images: string[];
  category: string;
  colors: string[];
  sizes: string[];
  tags: string[];
  sellerId: string;
  sellerName: string;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  trending?: boolean;
  new?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
  customization?: string;
}

export interface SellerStats {
  totalSales: number;
  totalOrders: number;
  totalProducts: number;
  avgRating: number;
  monthlyRevenue: number[];
  topProducts: Product[];
}

export interface Order {
  id: string;
  buyerId: string;
  sellerId: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: string;
  shippingAddress: {
    name: string;
    address: string;
    city: string;
    zipCode: string;
    country: string;
  };
}