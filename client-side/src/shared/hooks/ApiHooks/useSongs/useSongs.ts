import { songService } from "@/shared/api/service/song.service";
import { useQuery } from "@tanstack/react-query";

export default function useGetSongs() {
  const { data: songs, isLoading } = useQuery({
    queryKey: ["get songs"],
    queryFn: () => songService.getSongs(),
  });
  return { songs, isLoading };
}
