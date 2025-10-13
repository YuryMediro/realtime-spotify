import { Button } from '@/components/kit/button'
import {
	FieldGroup,
	Field,
	FieldLabel,
	FieldError,
} from '@/components/kit/field'
import { Input } from '@/components/kit/input'
import { musicStore } from '@/entities/store/music-store'
import { ImageUpload } from '@/features/ImageUpload/ImageUpload'
import { AlbumCreateSchema } from '@/features/ValidateSchema/AlbumCreateSchema'
import { useImageUpload } from '@/shared/hooks/useImageUpload'
import { zodResolver } from '@hookform/resolvers/zod'
import { observer } from 'mobx-react-lite'
import { Controller, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import * as z from 'zod'

interface AlbumCreateFormProps {
	onClose: () => void
}

export const AlbumCreateForm = observer(({ onClose }: AlbumCreateFormProps) => {
	const { isLoading, createAlbum } = musicStore
	const fileUpload = useImageUpload()

	const form = useForm<z.infer<typeof AlbumCreateSchema>>({
		resolver: zodResolver(AlbumCreateSchema),
		mode: 'onChange',
		values: {
			title: '',
			artist: '',
			releaseYear: new Date().getFullYear(),
			imageFile: null,
		},
	})

	const onSubmit = async (data: z.infer<typeof AlbumCreateSchema>) => {
		if (!fileUpload.selectedFile) {
			toast.error('Image is required')
			return
		}

		const formData = new FormData()
		formData.append('title', data.title)
		formData.append('artist', data.artist)
		formData.append('releaseYear', data.releaseYear.toString())
		formData.append('imageFile', fileUpload.selectedFile)

		try {
			await createAlbum(formData)
			onClose()
			form.reset({
				title: '',
				artist: '',
				releaseYear: new Date().getFullYear(),
				imageFile: null,
			})
			fileUpload.removeImage()
		} catch (error) {}
	}
	return (
		<form onSubmit={form.handleSubmit(onSubmit)}>
			<FieldGroup>
				<div className='space-y-4 py-4'>
					<ImageUpload isLoading={isLoading} uploadState={fileUpload} />
				</div>
				<Controller
					name='title'
					control={form.control}
					render={({ field, fieldState }) => (
						<Field data-invalid={fieldState.invalid}>
							<FieldLabel htmlFor='title'>Album Title</FieldLabel>
							<Input
								{...field}
								id='title'
								aria-invalid={fieldState.invalid}
								type='text'
								autoComplete='off'
								placeholder='Enter album title'
								disabled={isLoading}
							/>
							{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
						</Field>
					)}
				/>
				<Controller
					name='artist'
					control={form.control}
					render={({ field, fieldState }) => (
						<Field data-invalid={fieldState.invalid}>
							<FieldLabel htmlFor='artist'>Artist</FieldLabel>
							<Input
								{...field}
								id='artist'
								aria-invalid={fieldState.invalid}
								type='text'
								autoComplete='off'
								placeholder='Enter artist name'
								disabled={isLoading}
							/>
							{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
						</Field>
					)}
				/>
				<Controller
					name='releaseYear'
					control={form.control}
					render={({ field, fieldState }) => (
						<Field data-invalid={fieldState.invalid}>
							<FieldLabel htmlFor='releaseYear'>Release Year</FieldLabel>
							<Input
								{...field}
								id='releaseYear'
								aria-invalid={fieldState.invalid}
								type='number'
								autoComplete='off'
								placeholder='Enter release year'
								onChange={e => field.onChange(parseInt(e.target.value))}
								disabled={isLoading}
							/>
							{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
						</Field>
					)}
				/>
				<div className={'flex justify-end gap-3'}>
					<Button
						type='button'
						variant='outline'
						disabled={isLoading}
						onClick={onClose}
					>
						Cancel
					</Button>
					<Button
						type='submit'
						className='bg-violet-500 hover:bg-violet-600 text-white'
						disabled={isLoading}
					>
						{isLoading ? 'Creating...' : 'Save changes'}
					</Button>
				</div>
			</FieldGroup>
		</form>
	)
})
