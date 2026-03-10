import { Order, OrderStatus } from "../../../shared/types";
import axiosWrapper from "../api/ApiWrapper";

// API base URL - candidates will use this when implementing their API calls
const API_BASE_URL = import.meta.env.VITE_API_URL;

interface ApiResponse {
  success: boolean;
  data: LoginResponse;
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
  async getOrders(_status?: OrderStatus): Promise<Order[]> {
    // TODO: Implement this function
    // 1. Build the URL with optional status query param
    // 2. Make a GET request to /api/orders
    // 3. Handle errors appropriately
    // 4. Return the parsed JSON response
    // Example: const url = status ? `${API_BASE_URL}/orders?status=${status}` : `${API_BASE_URL}/orders`;

    throw new Error("Not implemented yet");
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
  async updateOrderStatus(_id: string, _status: OrderStatus): Promise<Order> {
    // TODO: Implement this function
    // 1. Make a PATCH request to /api/orders/:id
    // 2. Send the new status in the request body
    // 3. Handle errors appropriately
    // 4. Return the updated order
    // Example: fetch(`${API_BASE_URL}/orders/${id}`, { method: 'PATCH', body: JSON.stringify({ status }) })

    throw new Error("Not implemented yet");
  },

  /**
   * Create a new order (for testing)
   */
  async createOrder(_order: Omit<Order, "id" | "createdAt">): Promise<Order> {
    // TODO: Implement this function
    // 1. Make a POST request to /api/orders
    // 2. Send the order data in the request body
    // 3. Handle validation errors
    // 4. Return the created order
    // Example: fetch(`${API_BASE_URL}/orders`, { method: 'POST', body: JSON.stringify(order) })

    throw new Error("Not implemented yet");
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
    })) as ApiResponse;
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
    )) as ApiResponse;
    if (!response.success) {
      throw new Error(response.message || "Registration failed");
    }
    return response.data;
  },
};
