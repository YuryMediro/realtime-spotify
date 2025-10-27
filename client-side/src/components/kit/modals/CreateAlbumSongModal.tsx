import { useState, type PropsWithChildren } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../dialog";
import { AlbumCreateForm } from "@/components/Admin/TabsAdmin/CreateForm/AlbumCreateForm";
import { SongCreateForm } from "@/components/Admin/TabsAdmin/CreateForm/SongCreateForm";

interface CreateAlbumSongModalProps {
  title: string;
  subTitle: string;
  type: "song" | "album";
}

export const CreateAlbumSongModal = ({
  children,
  title,
  subTitle,
  type,
}: PropsWithChildren<CreateAlbumSongModalProps>) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="bg-zinc-900 border-zinc-700">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{subTitle}</DialogDescription>
        </DialogHeader>

        {type === "album" ? (
          <AlbumCreateForm onClose={() => setIsOpen(false)} />
        ) : (
          <SongCreateForm onClose={() => setIsOpen(false)} />
        )}
      </DialogContent>
    </Dialog>
  );
};
