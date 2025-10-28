import { musicStore } from "@/entities/store/music-store";
import { useImageUpload } from "../useImageUpload";
import { useForm } from "react-hook-form";
import { AlbumCreateSchema } from "@/features/ValidateSchema/AlbumCreateSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import toast from "react-hot-toast";

export const useAlbumCreateForm = (onClose: () => void) => {
     const { isLoading, createAlbum } = musicStore;
     const imageUpload = useImageUpload();

     const form = useForm<z.infer<typeof AlbumCreateSchema>>({
       resolver: zodResolver(AlbumCreateSchema),
       mode: "onChange",
       values: {
         title: "",
         artist: "",
         releaseYear: new Date().getFullYear(),
         imageFile: null,
       },
     });

     const onSubmit = async (data: z.infer<typeof AlbumCreateSchema>) => {
       if (!imageUpload.selectedFile) {
         toast.error("Image is required");
         return;
       }

       const formData = new FormData();
       formData.append("title", data.title);
       formData.append("artist", data.artist);
       formData.append("releaseYear", data.releaseYear.toString());
       formData.append("imageFile", imageUpload.selectedFile);

       try {
         await createAlbum(formData);
         onClose();
         form.reset({
           title: "",
           artist: "",
           releaseYear: new Date().getFullYear(),
           imageFile: null,
         });
         imageUpload.removeImage();
       } catch (error) {}
     };
     
  return {isLoading, form, onSubmit, imageUpload}
};