import { Pagination } from "@/types/common";

export class SelectService {
  static async getOptions(api: string, pagination: Pagination) {
    try {
      const response = await fetch(api, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        // Add any authentication headers if needed
        // headers: {
        //   'Authorization': `Bearer ${token}`,
        //   'Content-Type': 'application/json',
        // },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching options:", error);
      throw error;
    }
  }
}
