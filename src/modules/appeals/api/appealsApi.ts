import { apiService } from "@/services/api";

// Appeal interfaces based on API schema
export interface IAppeal {
  id: number;
  uid: string;
  status: "in_review" | "rejected" | "accepted";
  text: string;
  file: string | null;
  action_time: string | null;
  payment_instrument_json: any | null;
  created_at: string;
  updated_at: string;
}

export interface IAppealListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: IAppeal[];
}

export const appealsApi = {
  // Get all appeals
  getAppeals: async (
    params?: Record<string, string>
  ): Promise<IAppealListResponse> => {
    return apiService.$get<IAppealListResponse>("/explat/appeals/", {
      params,
    });
  },

  // Get single appeal
  getAppeal: async (uid: string): Promise<IAppeal> => {
    return apiService.$get<IAppeal>(`/explat/appeals/${uid}/`);
  },

  // Approve appeal (update status to accepted)
  approveAppeal: async (uid: string): Promise<IAppeal> => {
    return apiService.$patch<IAppeal>(`/explat/appeals/${uid}/`, {
      status: "accepted",
    });
  },

  // Reject appeal (update status to rejected)
  rejectAppeal: async (uid: string): Promise<IAppeal> => {
    return apiService.$patch<IAppeal>(`/explat/appeals/${uid}/`, {
      status: "rejected",
    });
  },
};
