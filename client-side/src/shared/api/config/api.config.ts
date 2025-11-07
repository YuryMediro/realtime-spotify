const getBaseUrl = () =>
  import.meta.env.MODE === "development" ? "http://localhost:5000/api" : "/api";

export const BASE_URL = getBaseUrl();

export const API_URL = {
  root: (url = "") => `${url ? url : ""}`,

  admin: () => API_URL.root("/admin/check"),

  albums: (url = "") => API_URL.root(`/albums${url}`),
  adminAlbums: (url = "") => API_URL.root(`/admin/albums${url}`),

  songs: (url = "") => API_URL.root(`/songs${url}`),
  adminSongs: (url = "") => API_URL.root(`/admin/songs${url}`),

  featuredSongs: () => API_URL.root("/songs/featured"),
  madeForYouSongs: () => API_URL.root("/songs/made-for-you"),
  trendingSongs: () => API_URL.root("/songs/trending"),
  madeForYouSongsAll: () => API_URL.root("/songs/made-for-you-all"),
  trendingSongsAll: () => API_URL.root("/songs/trending-all"),

  stats: () => API_URL.root('/stats')
};
