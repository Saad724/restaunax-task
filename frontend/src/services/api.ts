import { Order, OrderItem, OrderStatus } from "../../../shared/types";
import axiosWrapper from "../api/ApiWrapper";

// API base URL - candidates will use this when implementing their API calls
const API_BASE_URL = import.meta.env.VITE_API_URL;

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message: string;
}

/**
 * API service for interacting with the backend
 * TODO: Implement these functions to call your backend endpoints
 */

export const ordersApi = {
  /**
   * Fetch all orders, optionally filtered by status
   */
  async getOrders(status?: OrderStatus): Promise<Order[]> {
    const url = status
      ? `${API_BASE_URL}/orders?status=${status}`
      : `${API_BASE_URL}/orders`;
    const response = (await axiosWrapper("get", url)) as ApiResponse<Order[]>;
    if (!response.success || !Array.isArray(response.data)) {
      throw new Error(response.message || "Failed to fetch orders");
    }
    return response.data;
  },

  /**
   * Fetch a single order by ID
   */
  async getOrderById(_id: string): Promise<Order> {
    // TODO: Implement this function
    // 1. Make a GET request to /api/orders/:id
    // 2. Handle 404 errors
    // 3. Return the parsed JSON response
    // Example: const response = await fetch(`${API_BASE_URL}/orders/${id}`);

    throw new Error("Not implemented yet");
  },

  /**
   * Update an order's status
   */
  async updateOrderStatus(id: string, status: OrderStatus): Promise<Order> {
    const response = (await axiosWrapper("patch", `${API_BASE_URL}/orders/${id}`, {
      status,
    })) as ApiResponse<Order>;
    if (!response.success) {
      throw new Error(response.message || "Failed to update order status");
    }
    return response.data;
  },

  /**
   * Create a new order (for testing)
   */
  async createOrder(orderType: string, items: OrderItem[]): Promise<Order> {
    const response = (await axiosWrapper("post", `${API_BASE_URL}/orders`, {
      orderType: orderType,
      items: items?.map((item) => ({
        name: item?.name,
        quantity: item?.quantity,
        price: item?.price,
      })),
    })) as ApiResponse<Order>;
    if (!response.success) {
      throw new Error(response.message || "Order not created");
    }
    return response.data;
  },
};

export interface LoginResponse {
  user: {
    id: string;
    name: string | null;
    email: string;
    phone: string;
    role: string;
  };
  token: string;
}

export const authApi = {
  async login(email: string, password: string): Promise<LoginResponse> {
    const response = (await axiosWrapper("post", `${API_BASE_URL}/auth/login`, {
      email,
      password,
    })) as ApiResponse<LoginResponse>;
    if (!response.success) {
      throw new Error(response.message || "Login failed");
    }
    return response.data;
  },

  async register(body: {
    name: string;
    email: string;
    password: string;
    phone: string;
  }): Promise<LoginResponse> {
    const response = (await axiosWrapper(
      "post",
      `${API_BASE_URL}/auth/register`,
      body,
    )) as ApiResponse<LoginResponse>;
    if (!response.success) {
      throw new Error(response.message || "Registration failed");
    }
    return response.data;
  },
};
