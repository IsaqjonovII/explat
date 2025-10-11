import { apiService } from "@/services/api";

export interface ISMSMessage {
  id: number;
  uid: string;
  secret_key: string;
  device: {
    id: number;
    uid: string;
    name: string | null;
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
  from_number: string;
  body: string;
  device_received_at: string;
  recognized_amount: number | null;
  parse_status: "recognized" | "unrecognized" | "partial" | "unknown";
  created_at: string;
  updated_at: string;
}

export interface ISMSMessageListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: ISMSMessage[];
}

export const notificationApi = {
  // Get all device SMS messages
  getSMSMessages: async (
    params?: Record<string, string>
  ): Promise<ISMSMessageListResponse> => {
    return apiService.$get<ISMSMessageListResponse>(
      "/explat/device-sms-messages/",
      { params }
    );
  },

  // Get single SMS message
  getSMSMessage: async (uid: string): Promise<ISMSMessage> => {
    return apiService.$get<ISMSMessage>(`/explat/device-sms-messages/${uid}/`);
  },

  // Send SMS message to device
  sendSMSMessage: async (
    deviceUid: string,
    data: { phone_number: string; message: string }
  ): Promise<ISMSMessage> => {
    return apiService.$post<ISMSMessage>(
      `/explat/devices/${deviceUid}/sms-message/`,
      data
    );
  },
};
