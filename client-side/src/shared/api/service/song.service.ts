import type { ISongs } from "@/entities/types/type";
import { axiosInstance } from "../axios";
import { API_URL } from "../config/api.config";

class SongService {
  async getSongs() {
    const { data } = await axiosInstance<ISongs[]>({
      url: API_URL.songs(),
      method: "GET",
    });
    return data;
  }
  async getFeaturedSongs() {
    const { data } = await axiosInstance<ISongs[]>({
      url: API_URL.featuredSongs(),
      method: "GET",
    });
    return data;
  }
  async getMadeForYouSongs() {
    const { data } = await axiosInstance<ISongs[]>({
      url: API_URL.madeForYouSongs(),
      method: "GET",
    });
    return data;
  }
  async getTrendingSongs() {
    const { data } = await axiosInstance<ISongs[]>({
      url: API_URL.trendingSongs(),
      method: "GET",
    });
    return data;
  }
  async getMadeForYouSongsAll() {
    const { data } = await axiosInstance<ISongs[]>({
      url: API_URL.madeForYouSongsAll(),
      method: "GET",
    });
    return data;
  }
  async getTrendingSongsAll() {
    const { data } = await axiosInstance<ISongs[]>({
      url: API_URL.trendingSongsAll(),
      method: "GET",
    });
    return data;
  }
  async deleteSong(id: string) {
    const { data } = await axiosInstance<ISongs[]>({
      url: API_URL.adminSongs(`/${id}`),
      method: "DELETE",
    });
    return data;
  }
  async createSong(formData: FormData) {
    const { data } = await axiosInstance<ISongs>({
      url: API_URL.adminSongs(),
      method: "POST",
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return data;
  }
}

export const songService = new SongService();
