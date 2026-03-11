import { Order, OrderItem, OrderStatus, MenuItem } from "../../../shared/types";
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
    const response = (await axiosWrapper("get", `${API_BASE_URL}/orders/${_id}`)) as ApiResponse<Order>;
    if (!response.success) {
      throw new Error(response.message || "Failed to fetch order");
    }
    return response.data;
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

export const menuApi = {
  async getMenu(): Promise<MenuItem[]> {
    const response = (await axiosWrapper(
      "get",
      `${API_BASE_URL}/menu`,
    )) as ApiResponse<MenuItem[]>;

    if (!response.success || !Array.isArray(response.data)) {
      throw new Error(response.message || "Failed to fetch menu");
    }

    return response.data;
  },
};

type ChartJsDataset = {
  label: string;
  data: number[];
};

type ChartJsData = {
  labels: string[];
  datasets: ChartJsDataset[];
};

export type AdminDashboardStats = {
  countStats: {
    users: number;
    orders: number;
    menu: number;
  };
  dataStats: {
    pieChartData: ChartJsData;
    barChartData: ChartJsData;
  };
};

export const adminApi = {
  async getDashboard(): Promise<AdminDashboardStats> {
    const response = (await axiosWrapper(
      "get",
      `${API_BASE_URL}/admin/dashboard`,
    )) as ApiResponse<AdminDashboardStats>;

    if (!response.success) {
      throw new Error(response.message || "Failed to fetch dashboard");
    }

    return response.data;
  },
};

export const userApi = {
  async getOrders(): Promise<Order[]> {
    const response = (await axiosWrapper(
      "get",
      `${API_BASE_URL}/user/orders`,
    )) as ApiResponse<Order[]>;

    if (!response.success || !Array.isArray(response.data)) {
      throw new Error(response.message || "Failed to fetch user orders");
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
