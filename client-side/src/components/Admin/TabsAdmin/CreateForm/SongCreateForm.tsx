import { Button } from '@/components/kit/button'
import {
	Field,
	FieldError,
	FieldGroup,
	FieldLabel,
} from '@/components/kit/field'
import { Input } from '@/components/kit/input'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectSeparator,
	SelectTrigger,
	SelectValue,
} from '@/components/kit/select'
import { musicStore } from '@/entities/store/music-store'
import { AudioUpload } from '@/features/AudioUpload/AudioUpload'
import { ImageUpload } from '@/features/ImageUpload/ImageUpload'
import { SongCreateSchema } from '@/features/ValidateSchema/SongCreateSchema'
import { useAudioUpload } from '@/shared/hooks/useAudioUpload'
import { useImageUpload } from '@/shared/hooks/useImageUpload'
import { zodResolver } from '@hookform/resolvers/zod'
import { observer } from 'mobx-react-lite'
import { Controller, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import * as z from 'zod'

interface SongCreateFormProps {
	onClose: () => void
}

export const SongCreateForm = observer(({ onClose }: SongCreateFormProps) => {
	const { isLoading, createSong, albums } = musicStore
	const imageUpload = useImageUpload()
	const audioUpload = useAudioUpload()

	const form = useForm<z.infer<typeof SongCreateSchema>>({
		resolver: zodResolver(SongCreateSchema),
		mode: 'onChange',
		values: {
			title: '',
			artist: '',
			albumId: '',
			duration: '0',
			imageFile: null,
			audioFile: null,
		},
	})

	const onSubmit = async (data: z.infer<typeof SongCreateSchema>) => {
		if (!imageUpload.selectedFile || !audioUpload.selectedFile) {
			toast.error('Please upload both audio and image files')
			return
		}

		const formData = new FormData()
		formData.append('title', data.title)
		formData.append('artist', data.artist)
		formData.append('duration', data.duration)
		if (data.albumId) formData.append('albumId', data.albumId)
		formData.append('imageFile', imageUpload.selectedFile)
		formData.append('audioFile', audioUpload.selectedFile)

		try {
			await createSong(formData)
			onClose()
			form.reset({
				title: '',
				artist: '',
				albumId: '',
				duration: '0',
				audioFile: null,
				imageFile: null,
			})
			imageUpload.removeImage()
			audioUpload.removeAudio()
		} catch (error) {}
	}

	return (
		<form onSubmit={form.handleSubmit(onSubmit)}>
			<FieldGroup>
				<div className='space-y-4 py-4'>
					<ImageUpload isLoading={isLoading} uploadState={imageUpload} />
				</div>
				<AudioUpload isLoading={isLoading} uploadState={audioUpload} />
				<Controller
					name='title'
					control={form.control}
					render={({ field, fieldState }) => (
						<Field data-invalid={fieldState.invalid}>
							<FieldLabel htmlFor='title'>Title</FieldLabel>
							<Input
								{...field}
								id='title'
								aria-invalid={fieldState.invalid}
								type='text'
								autoComplete='off'
								placeholder='Enter song title'
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
					name='albumId'
					control={form.control}
					render={({ field, fieldState }) => (
						<Field data-invalid={fieldState.invalid}>
							<FieldLabel htmlFor='albumId'>Album (optional)</FieldLabel>
							<Select
								value={field.value}
								disabled={isLoading}
								onValueChange={field.onChange}
							>
								<SelectTrigger id='albumId' aria-invalid={fieldState.invalid}>
									<SelectValue placeholder='Select album' />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value='auto'>No Album (Single)</SelectItem>
									<SelectSeparator />
									{albums.map(album => (
										<SelectItem key={album._id} value={album._id}>
											{album.title}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
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
