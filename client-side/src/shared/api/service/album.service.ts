import type { IAlbums } from "@/entities/types/type";
import { axiosInstance } from "../axios";
import { API_URL } from "../config/api.config";

class AlbumService {
  async getAlbums() {
    const { data } = await axiosInstance<IAlbums[]>({
      url: API_URL.albums(),
      method: "GET",
    });
    return data;
  }
  async getAlbumsById(id: string) {
    const { data } = await axiosInstance<IAlbums>({
      url: API_URL.albums(`/${id}`),
      method: "GET",
    });
    return data;
  }
  async deleteAlbumById(id: string) {
    const { data } = await axiosInstance<IAlbums>({
      url: API_URL.adminAlbums(`/${id}`),
      method: "DELETE",
    });
    return data;
  }
  async createAlbum(formData: FormData) {
    const { data } = await axiosInstance<IAlbums>({
      url: API_URL.adminAlbums(),
      method: "POST",
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return data;
  }
}

export const albumService = new AlbumService();
