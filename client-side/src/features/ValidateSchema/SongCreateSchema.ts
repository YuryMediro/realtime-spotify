import * as z from "zod";

export const SongCreateSchema = z.object({
  title: z
    .string()
    .min(1, { message: "Title is required" })
    .max(20, { message: "Max 20 characters" })
    .refine((value) => value.trim().length > 0, {
      message: "Title cannot consist only of spaces",
    }),
  artist: z
    .string()
    .min(1, { message: "Artist is required" })
    .max(20, { message: "Max 20 characters" })
    .refine((value) => value.trim().length > 0, {
      message: "Artist cannot consist only of spaces",
    }),
  imageFile: z.instanceof(File).nullable(),
  audioFile: z.instanceof(File).nullable(),
  albumId: z.string().optional(),
  duration: z.string(),
});
