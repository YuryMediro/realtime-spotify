import { Button } from "@/components/kit/button";
import {
  FieldGroup,
  Field,
  FieldLabel,
  FieldError,
} from "@/components/kit/field";
import { Input } from "@/components/kit/input";
import { ScrollArea } from "@/components/kit/scroll-area";
import { ImageUpload } from "@/features/ImageUpload/ImageUpload";
import { useAlbumCreateForm } from "@/shared/hooks/useForm/useAlbumCreateForm";
import { observer } from "mobx-react-lite";
import { Controller } from "react-hook-form";

interface AlbumCreateFormProps {
  onClose: () => void;
}

export const AlbumCreateForm = observer(({ onClose }: AlbumCreateFormProps) => {
  const { form, isLoading, onSubmit, imageUpload } =
    useAlbumCreateForm(onClose);

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <ScrollArea className="h-[calc(100vh-457px)] mb-4">
        <FieldGroup className="px-3 gap-4">
          <ImageUpload isLoading={isLoading} uploadState={imageUpload} />
          <Controller
            name="title"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="title">Album Title</FieldLabel>
                <Input
                  {...field}
                  id="title"
                  aria-invalid={fieldState.invalid}
                  type="text"
                  autoComplete="off"
                  placeholder="Enter album title"
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
            name="releaseYear"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="releaseYear">Release Year</FieldLabel>
                <Input
                  {...field}
                  id="releaseYear"
                  aria-invalid={fieldState.invalid}
                  type="number"
                  autoComplete="off"
                  placeholder="Enter release year"
                  onChange={(e) => field.onChange(parseInt(e.target.value))}
                  disabled={isLoading}
                  className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>
      </ScrollArea>
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
    </form>
  );
});
