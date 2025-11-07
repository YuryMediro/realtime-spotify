import { albumService } from "@/shared/api/service/album.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

export const useGetAlbums = () => {
  const { data: albums, isLoading } = useQuery({
    queryKey: ["get albums"],
    queryFn: () => albumService.getAlbums(),
  });
  return { albums, isLoading };
};

export const useGetAlbumsById = () => {
  const { id } = useParams<{ id: string }>();

  const { data: albums, isLoading } = useQuery({
    queryKey: ["get album by id", id],
    queryFn: () => albumService.getAlbumsById(id!),
    enabled: !!id,
  });
  return { albums, isLoading };
};

export const useDeleteAlbumById = () => {
  const queryClient = useQueryClient();

  const { mutate: deleteAlbum, isPending: isLoadingDelete } = useMutation({
    mutationKey: ["delete album"],
    mutationFn: (id: string) => albumService.deleteAlbumById(id),
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["get albums"],
      });
      queryClient.invalidateQueries({
        queryKey: ["get stats"],
      });
      toast.success("Album deleted successfully");
    },
    onError() {
      toast.error("Error deleting album");
    },
  });
  return { deleteAlbum, isLoadingDelete };
};

export const useCreateAlbum = () => {
  const queryClient = useQueryClient();

  const { mutateAsync: createAlbum, isPending: isLoadingCreate } = useMutation({
    mutationKey: ["create album"],
    mutationFn: (formData: FormData) => albumService.createAlbum(formData),
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["get albums"],
      });
      queryClient.invalidateQueries({
        queryKey: ["get stats"],
      });
      toast.success("Album created successfully");
    },
    onError() {
      toast.error("Error created album");
    },
  });
  return { createAlbum, isLoadingCreate };
};
