import { Button } from "@/components/kit/button";
import { ConfirmModal } from "@/components/kit/modals/ConfirmModal";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/kit/table";
import {
  useDeleteAlbumById,
  useGetAlbums,
} from "@/shared/hooks/ApiHooks/useAlbums/useAlbums";
import { Calendar, Music, Trash2 } from "lucide-react";

export const AlbumsTable = () => {
  const { albums } = useGetAlbums();
  const { deleteAlbum, isLoadingDelete } = useDeleteAlbumById();
  return (
    <Table>
      <TableHeader>
        <TableRow className="hover:bg-transparent">
          <TableHead className="w-[50px]"></TableHead>
          <TableHead className="text-sm text-zinc-400">Title</TableHead>
          <TableHead className="text-sm text-zinc-400">Artist</TableHead>
          <TableHead className="text-sm text-zinc-400">Release Year</TableHead>
          <TableHead className="text-sm text-zinc-400">Songs</TableHead>
          <TableHead className="text-zinc-400 text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {albums?.map((album) => (
          <TableRow key={album._id} className="hover:bg-zinc-800/50">
            <TableCell className="flex items-center gap-2">
              <img
                src={album.imageUrl}
                alt={album.title}
                className="size-10 rounded object-cover"
              />
            </TableCell>
            <TableCell className="font-medium">{album.title}</TableCell>
            <TableCell>{album.artist}</TableCell>
            <TableCell>
              <span className="flex items-center gap-1 text-zinc-400">
                <Calendar className="h-4 w-4" />
                {album.releaseYear}
              </span>
            </TableCell>
            <TableCell>
              <span className="inline-flex items-center gap-1 text-zinc-400">
                <Music className="h-4 w-4" />
                {album.songs.length} {album.songs.length > 1 ? "songs" : "song"}
              </span>
            </TableCell>
            <TableCell className="text-right">
              <ConfirmModal handleClick={() => deleteAlbum(album._id)}>
                <Button
                  variant={"ghost"}
                  size={"sm"}
                  disabled={isLoadingDelete}
                  className="text-red-400 hover:text-red-300 hover:bg-red-400/10"
                >
                  <Trash2 className="size-4" />
                </Button>
              </ConfirmModal>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
