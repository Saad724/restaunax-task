// Shared TypeScript types for Restaunax Order Management

export type OrderStatus = "pending" | "preparing" | "ready" | "delivered" | "cancelled";
export type OrderType = "delivery" | "pickup";

export interface User {
  id: string;
  name: string | null;
  email: string;
  phone: string;
  rewardPoints: number;
  role: string;
  createdAt: Date;
}

/** Order item */
export interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number; // float
  createdAt: Date; // ISO string
  orderId?: string; // optional link to order
}
export interface MenuItem {
  id?: string;
  name: string;
  image?: string;
  price: number; // float
  createdAt: Date; // ISO string
}

/** Order entity */
export interface Order {
  id: string;
  userId: string; // link to a User
  user?: User;
  orderType: OrderType;
  status: OrderStatus;
  items: OrderItem[];
  total: number; // float
  createdAt: Date; // ISO 8601 string
}

/** API Response types */
export interface ApiError {
  error: string;
  message?: string;
}

/** Request body types */
export interface CreateOrderRequest {
  userId: string;
  orderType: OrderType;
  items: Omit<OrderItem, "id" | "createdAt">[];
}

export interface UpdateOrderStatusRequest {
  status: OrderStatus;
}
