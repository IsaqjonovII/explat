import { apiService } from "@/services/api";

// Order interfaces based on API schema
export interface IOrder {
  id: number;
  uid: string;
  status: "created" | "performed" | "expired";
  order_ttl: number;
  purpose: "payment" | "card_activation";
  amount: number;
  external_id: string;
  perform_time: string | null;
  created_at: string;
  updated_at: string;
}

export interface IOrderListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: IOrder[];
}

export const ordersApi = {
  // Get all orders
  getOrders: async (
    params?: Record<string, string>
  ): Promise<IOrderListResponse> => {
    return apiService.$get<IOrderListResponse>("/explat/orders/", {
      params,
    });
  },

  // Get single order
  getOrder: async (uid: string): Promise<IOrder> => {
    return apiService.$get<IOrder>(`/explat/orders/${uid}/`);
  },
};
