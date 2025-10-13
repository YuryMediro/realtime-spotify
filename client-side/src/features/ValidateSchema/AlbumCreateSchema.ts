import * as z from 'zod'

export const AlbumCreateSchema = z.object({
	title: z
		.string()
		.min(1, { message: 'Title is required' })
		.max(20, { message: 'Max 20 characters' })
		.refine(value => value.trim().length > 0, {
			message: 'Title cannot consist only of spaces',
		}),
	artist: z
		.string()
		.min(1, { message: 'Artist is required' })
		.max(20, { message: 'Max 20 characters' })
		.refine(value => value.trim().length > 0, {
			message: 'Artist cannot consist only of spaces',
		}),
	releaseYear: z
		.number()
		.min(1900, { message: 'The year cannot be less than 1900' })
		.max(new Date().getFullYear(), {
			message: 'The year cannot be greater than the current year',
		}),
	imageFile: z.instanceof(File).nullable(),
})
