import type { IAlbums, ISongs} from "@/entities/types/type";
import { axiosInstance } from "../../shared/api/axios";

export const musicApi = {
  // Альбомы
  getAlbumsById: (id: string): Promise<IAlbums> =>
    axiosInstance.get<IAlbums>(`/albums/${id}`).then((res) => res.data),

  createAlbum: (formData: FormData): Promise<IAlbums> =>
    axiosInstance
      .post<IAlbums>("/admin/albums", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => res.data),

  // Песни
  getFeaturedSongs: (): Promise<ISongs[]> =>
    axiosInstance.get<ISongs[]>("/songs/featured").then((res) => res.data),

  getMadeForYouSongs: (): Promise<ISongs[]> =>
    axiosInstance.get<ISongs[]>("/songs/made-for-you").then((res) => res.data),

  getTrendingSongs: (): Promise<ISongs[]> =>
    axiosInstance.get<ISongs[]>("/songs/trending").then((res) => res.data),

  getMadeForYouSongsAll: (): Promise<ISongs[]> =>
    axiosInstance
      .get<ISongs[]>("/songs/made-for-you-all")
      .then((res) => res.data),

  getTrendingSongsAll: (): Promise<ISongs[]> =>
    axiosInstance.get<ISongs[]>("/songs/trending-all").then((res) => res.data),

  getSongs: (): Promise<ISongs[]> =>
    axiosInstance.get<ISongs[]>("/songs").then((res) => res.data),

  deleteSong: (id: string): Promise<ISongs[]> =>
    axiosInstance
      .delete<ISongs[]>(`/admin/songs/${id}`)
      .then((res) => res.data),

  createSong: (formData: FormData): Promise<ISongs> =>
    axiosInstance
      .post<ISongs>("/admin/songs", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => res.data),
};
