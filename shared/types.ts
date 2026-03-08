/**
 * Shared TypeScript types for Restaunax Order Management
 * These types are used by both frontend and backend for type safety
 */

export type OrderStatus = 'pending' | 'preparing' | 'ready' | 'delivered';

export type OrderType = 'delivery' | 'pickup';

export interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

/**
 * Order entity
 * NOTE: This structure has customer data embedded directly in the order
 * Consider whether this is the best data modeling approach
 */
export interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerRewardPoints: number;
  orderType: OrderType;
  status: OrderStatus;
  items: OrderItem[];
  total: number;
  createdAt: string; // ISO 8601 date string
}

// API Response types
export interface ApiError {
  error: string;
  message?: string;
}

// Request body types
export interface CreateOrderRequest {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  orderType: OrderType;
  items: Omit<OrderItem, 'id'>[];
}

export interface UpdateOrderStatusRequest {
  status: OrderStatus;
}
