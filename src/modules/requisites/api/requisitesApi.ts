import { apiService } from "@/services/api";

export interface IRequisite {
  id: number;
  uid: string;
  device: {
    id: number;
    uid: string;
    name: string;
    status: "active" | "inactive";
    user_id: number;
    battery: number | null;
    model: string | null;
    phone_number: string | null;
    carrier: string | null;
    latitude: string | null;
    longitude: string | null;
    is_available: boolean;
    healthcheck_at: string | null;
    created_at: string;
    updated_at: string;
  };
  device_id: number;
  bank: {
    id: number;
    name: string;
  };
  bank_id: number;
  payment_method: {
    id: number;
    code: string;
    name: string;
  };
  payment_method_id: number;
  status: "activated" | "deactivated" | "testing";
  min_amount: number;
  max_amount: number;
  owner_full_name: string;
  phone_number: string;
  card_number: string;
  account_number: string;
  created_at: string;
  updated_at: string;
}

export interface IRequisiteListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: IRequisite[];
}

export interface IBank {
  id: number;
  name: string;
}

export interface IPaymentMethod {
  id: number;
  code: string;
  name: string;
}

export const requisitesApi = {
  // Get all payment instruments (requisites)
  getRequisites: async (
    params?: Record<string, string>
  ): Promise<IRequisiteListResponse> => {
    return apiService.$get<IRequisiteListResponse>(
      "/explat/payment-instruments/",
      { params }
    );
  },

  // Get single payment instrument
  getRequisite: async (uid: string): Promise<IRequisite> => {
    return apiService.$get<IRequisite>(`/explat/payment-instruments/${uid}/`);
  },

  // Create new payment instrument
  createRequisite: async (data: Partial<IRequisite>): Promise<IRequisite> => {
    return apiService.$post<IRequisite>("/explat/payment-instruments/", data);
  },

  // Update payment instrument
  updateRequisite: async (
    uid: string,
    data: Partial<IRequisite>
  ): Promise<IRequisite> => {
    return apiService.$put<IRequisite>(
      `/explat/payment-instruments/${uid}/`,
      data
    );
  },

  // Partial update payment instrument
  patchRequisite: async (
    uid: string,
    data: Partial<IRequisite>
  ): Promise<IRequisite> => {
    return apiService.$patch<IRequisite>(
      `/explat/payment-instruments/${uid}/`,
      data
    );
  },

  // Delete payment instrument
  deleteRequisite: async (uid: string): Promise<void> => {
    return apiService.$delete<void>(`/explat/payment-instruments/${uid}/`);
  },

  // Activate payment instrument
  activateRequisite: async (uid: string): Promise<IRequisite> => {
    return apiService.$post<IRequisite>(
      `/explat/payment-instruments/${uid}/activate/`
    );
  },

  // Get banks list
  getBanks: async (): Promise<IBank[]> => {
    return apiService.$get<IBank[]>("/explat/banks/");
  },

  // Get single bank
  getBank: async (id: number): Promise<IBank> => {
    return apiService.$get<IBank>(`/explat/banks/${id}/`);
  },

  // Get payment methods
  getPaymentMethods: async (): Promise<IPaymentMethod[]> => {
    return apiService.$get<IPaymentMethod[]>("/explat/payment-methods/");
  },

  // Get single payment method
  getPaymentMethod: async (id: number): Promise<IPaymentMethod> => {
    return apiService.$get<IPaymentMethod>(`/explat/payment-methods/${id}/`);
  },
};
