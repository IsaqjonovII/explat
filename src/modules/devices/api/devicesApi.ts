import { apiService } from "@/services/api";
import type { IDevice, IDeviceListResponse } from "@/types/devices";

export interface ICreateDeviceData {
  name: string;
  model: string;
  phone_number: string;
  carrier: string;
  latitude?: string;
  longitude?: string;
}

export interface IUpdateDeviceData extends Partial<ICreateDeviceData> {
  status?: "active" | "inactive" | "maintenance" | "offline";
  is_available?: boolean;
}

export const devicesApi = {
  // Get all devices
  getDevices: async (
    params?: Record<string, string>
  ): Promise<IDeviceListResponse> => {
    return apiService.$get<IDeviceListResponse>("/explat/devices/", {
      params,
    });
  },

  // Get single device
  getDevice: async (uid: string): Promise<IDevice> => {
    return apiService.$get<IDevice>(`/explat/devices/${uid}/`);
  },

  // Create new device
  createDevice: async (data: ICreateDeviceData): Promise<IDevice> => {
    return apiService.$post<IDevice>("/explat/devices/", data);
  },

  // Update device
  updateDevice: async (
    uid: string,
    data: IUpdateDeviceData
  ): Promise<IDevice> => {
    return apiService.$put<IDevice>(`/explat/devices/${uid}/`, data);
  },

  // Partial update device
  patchDevice: async (
    uid: string,
    data: IUpdateDeviceData
  ): Promise<IDevice> => {
    return apiService.$patch<IDevice>(`/explat/devices/${uid}/`, data);
  },

  // Delete device
  deleteDevice: async (uid: string): Promise<void> => {
    return apiService.$delete<void>(`/explat/devices/${uid}/`);
  },

  // Device health check
  healthCheck: async (uid: string): Promise<IDevice> => {
    return apiService.$post<IDevice>(`/explat/devices/${uid}/healthcheck/`);
  },

  // Send SMS to device
  sendSMS: async (
    uid: string,
    data: { phone_number: string; message: string }
  ): Promise<any> => {
    return apiService.$post(`/explat/devices/${uid}/sms-message/`, data);
  },
};
