import type { IStatistics } from "@/entities/types/type";
import { axiosInstance } from "../axios";
import { API_URL } from "../config/api.config";

class StatsService {
  async getStatistics() {
    const { data } = await axiosInstance<IStatistics>({
      url: API_URL.stats(),
      method: "GET",
    });
    return data;
  }
}

export const statsService = new StatsService();
