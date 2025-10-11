export interface IDevice {
  id: number;
  uid: string;
  name: string | null;
  status: DeviceStatus;
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
}

export type DeviceStatus = "active" | "inactive";

export interface IDeviceListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: IDevice[];
}
