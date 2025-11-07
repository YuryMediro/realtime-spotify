import { songService } from "@/shared/api/service/song.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useGetSongs = () => {
  const { data: songs, isLoading } = useQuery({
    queryKey: ["get songs"],
    queryFn: () => songService.getSongs(),
  });
  return { songs, isLoading };
};

export const useGetFeaturedSongs = () => {
  const { data: featuredSongs, isLoading } = useQuery({
    queryKey: ["get featured songs"],
    queryFn: () => songService.getFeaturedSongs(),
  });
  return { featuredSongs, isLoading };
};

export const useGetMadeForYouSongs = () => {
  const { data: madeForYouSongs, isLoading } = useQuery({
    queryKey: ["get made for you songs"],
    queryFn: () => songService.getMadeForYouSongs(),
  });
  return { madeForYouSongs, isLoading };
};

export const useGetTrendingSongs = () => {
  const { data: trendingSongs, isLoading } = useQuery({
    queryKey: ["get trending songs"],
    queryFn: () => songService.getTrendingSongs(),
  });
  return { trendingSongs, isLoading };
};

export const useGetMadeForYouSongsAll = () => {
  const { data: madeForYouSongsAll, isLoading } = useQuery({
    queryKey: ["get made for you songs all"],
    queryFn: () => songService.getMadeForYouSongsAll(),
  });
  return { madeForYouSongsAll, isLoading };
};

export const useGetTrendingSongsAll = () => {
  const { data: trendingSongsAll, isLoading } = useQuery({
    queryKey: ["get trending songs all"],
    queryFn: () => songService.getTrendingSongsAll(),
  });
  return { trendingSongsAll, isLoading };
};

export const useDeleteSong = () => {
  const queryClient = useQueryClient();

  const { mutate: deleteSong, isPending: isLoadingDelete } = useMutation({
    mutationKey: ["delete song"],
    mutationFn: (id: string) => songService.deleteSong(id),
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["get songs"],
      });
      toast.success("Song deleted successfully");
    },
    onError() {
      toast.error("Error deleting song");
    },
  });
  return { deleteSong, isLoadingDelete };
};

export const useCreateSong = () => {
  const queryClient = useQueryClient();

  const { mutate: createSong, isPending: isLoadingCreate } = useMutation({
    mutationKey: ["create song"],
    mutationFn: (formData: FormData) => songService.createSong(formData),
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["get songs"],
      });
      toast.success("Song creating successfully");
    },
    onError() {
      toast.error("Error deleting song");
    },
  });
  return { createSong, isLoadingCreate };
};
