import { Button } from "@/components/kit/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/kit/field";
import { Input } from "@/components/kit/input";
import { ScrollArea } from "@/components/kit/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/kit/select";
import { AudioUpload } from "@/features/AudioUpload/AudioUpload";
import { ImageUpload } from "@/features/ImageUpload/ImageUpload";
import { useSongCreateForm } from "@/shared/hooks/useForm/useSongCreateForm";
import { formatDuration } from "@/shared/lib/format/formatDuration";
import { observer } from "mobx-react-lite";
import { Controller } from "react-hook-form";

interface SongCreateFormProps {
  onClose: () => void;
}

export const SongCreateForm = observer(({ onClose }: SongCreateFormProps) => {
  const { albums, audioUpload, form, imageUpload, isLoading, onSubmit } =
    useSongCreateForm(onClose);

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <ScrollArea className="h-[calc(100vh-190px)]">
        <FieldGroup className="px-3 mb-3">
          <ImageUpload isLoading={isLoading} uploadState={imageUpload} />
          <AudioUpload isLoading={isLoading} uploadState={audioUpload} />
          <Controller
            name="title"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="title">Title</FieldLabel>
                <Input
                  {...field}
                  id="title"
                  aria-invalid={fieldState.invalid}
                  type="text"
                  autoComplete="off"
                  placeholder="Enter song title"
                  disabled={isLoading}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="artist"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="artist">Artist</FieldLabel>
                <Input
                  {...field}
                  id="artist"
                  aria-invalid={fieldState.invalid}
                  type="text"
                  autoComplete="off"
                  placeholder="Enter artist name"
                  disabled={isLoading}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="duration"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="duration">Duration</FieldLabel>
                <Input
                  {...field}
                  id="duration"
                  aria-invalid={fieldState.invalid}
                  type="string"
                  placeholder="Duration will be set automatically"
                  disabled={true}
                  value={formatDuration(audioUpload.duration)}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="albumId"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="albumId">Album (optional)</FieldLabel>
                <Select
                  value={field.value}
                  disabled={isLoading}
                  onValueChange={field.onChange}
                >
                  <SelectTrigger
                    className="cursor-pointer"
                    id="albumId"
                    aria-invalid={fieldState.invalid}
                  >
                    <SelectValue placeholder="Select album" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="auto" className="cursor-pointer">
                      No Album (Single)
                    </SelectItem>
                    <SelectSeparator />
                    {albums.map((album) => (
                      <SelectItem
                        key={album._id}
                        value={album._id}
                        className="cursor-pointer"
                      >
                        {album.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <div className={"flex justify-end gap-3"}>
            <Button
              type="button"
              variant="outline"
              disabled={isLoading}
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-violet-500 hover:bg-violet-600 text-white"
              disabled={isLoading}
            >
              {isLoading ? "Creating..." : "Save changes"}
            </Button>
          </div>
        </FieldGroup>
      </ScrollArea>
    </form>
  );
});
