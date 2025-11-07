import { musicApi } from "@/entities/endpoints/music-api";
import type { IAlbums, ISongs} from "@/entities/types/type";
import { makeAutoObservable } from "mobx";

class MusicStore {
  songs: ISongs[] = [];
  albums: IAlbums[] = [];
  isLoading: boolean = false;
  error: string | null = null;
  featuredSongs: ISongs[] = [];
  madeForYouSongs: ISongs[] = [];
  trendingSongs: ISongs[] = [];
 
  constructor() {
    makeAutoObservable(this);
  }

  setSongs = (songs: ISongs[]): void => {
    this.songs = songs;
  };
  setAlbums = (albums: IAlbums[]): void => {
    this.albums = albums;
  };
 
  setLoading = (loading: boolean): void => {
    this.isLoading = loading;
  };
  setError = (error: string | null): void => {
    this.error = error;
  };
  setFeaturedSongs = (songs: ISongs[]): void => {
    this.featuredSongs = songs;
  };
  setMadeForYouSongs = (songs: ISongs[]): void => {
    this.madeForYouSongs = songs;
  };
  setTrendingSongs = (songs: ISongs[]): void => {
    this.trendingSongs = songs;
  };

  fetchSongs = async (): Promise<void> => {
    this.setLoading(true);
    this.setError(null);

    try {
      const songs = await musicApi.getSongs();
      this.setSongs(songs);
    } catch (error: any) {
      this.setError(error.response?.data?.message || error.message);
    } finally {
      this.setLoading(false);
    }
  };

  fetchFeaturedSongs = async (): Promise<void> => {
    this.setLoading(true);
    this.setError(null);

    try {
      const songs = await musicApi.getFeaturedSongs();
      this.setFeaturedSongs(songs);
    } catch (error: any) {
      this.setError(error.response?.data?.message || error.message);
    } finally {
      this.setLoading(false);
    }
  };

  fetchMadeForYouSongs = async (): Promise<void> => {
    this.setLoading(true);
    this.setError(null);

    try {
      const songs = await musicApi.getMadeForYouSongs();
      this.setMadeForYouSongs(songs);
    } catch (error: any) {
      this.setError(error.response?.data?.message || error.message);
    } finally {
      this.setLoading(false);
    }
  };

  fetchTrendingSongs = async (): Promise<void> => {
    this.setLoading(true);
    this.setError(null);

    try {
      const songs = await musicApi.getTrendingSongs();
      this.setTrendingSongs(songs);
    } catch (error: any) {
      this.setError(error.response?.data?.message || error.message);
    } finally {
      this.setLoading(false);
    }
  };
}

export const musicStore = new MusicStore();
