import { useImageUpload } from "../useImageUpload";
import { useAudioUpload } from "../useAudioUpload";
import { useForm } from "react-hook-form";
import { SongCreateSchema } from "@/features/ValidateSchema/SongCreateSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import toast from "react-hot-toast";
import { useCreateSong } from "../ApiHooks/useSongs/useSongs";
import { useGetAlbums } from "../ApiHooks/useAlbums/useAlbums";

export const useSongCreateForm = (onClose: () => void) => {
  const {createSong,isLoadingCreate} = useCreateSong()
  const {albums} = useGetAlbums()
  const imageUpload = useImageUpload();
  const audioUpload = useAudioUpload();

  const form = useForm<z.infer<typeof SongCreateSchema>>({
    resolver: zodResolver(SongCreateSchema),
    mode: "onChange",
    values: {
      title: "",
      artist: "",
      albumId: "",
      duration: audioUpload.duration,
      imageFile: null,
      audioFile: null,
    },
  });

  const onSubmit = async (data: z.infer<typeof SongCreateSchema>) => {
    if (!imageUpload.selectedFile || !audioUpload.selectedFile) {
      toast.error("Please upload both audio and image files");
      return;
    }

    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("artist", data.artist);
    formData.append("duration", data.duration.toString());
    if (data.albumId) formData.append("albumId", data.albumId);
    formData.append("imageFile", imageUpload.selectedFile);
    formData.append("audioFile", audioUpload.selectedFile);

    try {
      await createSong(formData);
      onClose();
      form.reset({
        title: "",
        artist: "",
        albumId: "",
        duration: 0,
        audioFile: null,
        imageFile: null,
      });
      imageUpload.removeImage();
      audioUpload.removeAudio();
    } catch (error) {}
  };

  return {
    isLoading: isLoadingCreate,
    albums: albums || [],
    onSubmit,
    form,
    imageUpload,
    audioUpload,
  };
};
