import { api } from './api'; // ✅ This will now work

// Define the shape of the data coming from the server
export type AppConfig = {
  buildings: string[];
  departments: string[];
  assetTypes: Array<{
    value: string;
    label: string;
    category: string;
  }>;
};

export const ConfigService = {
  async getConfig(): Promise<AppConfig> {
    const response = await api.get<AppConfig>('/config');
    return response.data;
  }
};