import { Button } from '@/components/kit/button'
import { useImageUpload } from '@/shared/hooks/useImageUpload'
import { Upload } from 'lucide-react'

interface ImageUploadProps {
	isLoading?: boolean
	uploadState: ReturnType<typeof useImageUpload>
}

export const ImageUpload = ({
	isLoading = false,
	uploadState,
}: ImageUploadProps) => {
	const {
		fileInputRef,
		handleButtonClick,
		previewUrl,
		removeImage,
	} = uploadState
	return (
		<>
			<input
				type='file'
				ref={fileInputRef}
				onChange={uploadState.handleFileSelect}
				accept='image/*'
				className='hidden'
			/>
			{previewUrl ? (
				<div className='relative border-2 border-dashed border-zinc-700 rounded-lg'>
					<img
						src={previewUrl}
						alt='Preview'
						className='w-full max-h-64 object-contain rounded-lg'
					/>
					<Button
						type='button'
						size='sm'
						variant='destructive'
						className='absolute top-2 right-2'
						onClick={removeImage}
						disabled={isLoading}
					>
						Remove
					</Button>
				</div>
			) : (
				<div
					className='flex items-center justify-center p-6 border-2 border-dashed border-zinc-700 rounded-lg cursor-pointer'
					onClick={handleButtonClick}
				>
					<div className='text-center'>
						<div className='p-3 bg-zinc-800 rounded-full inline-block mb-2'>
							<Upload className='h-6 w-6 text-zinc-400' />
						</div>
						<div className='text-sm text-zinc-400 mb-2'>
							Upload album artwork
						</div>
						<Button
							variant='outline'
							size='sm'
							className='text-xs'
							disabled={isLoading}
						>
							Choose File
						</Button>
					</div>
				</div>
			)}
		</>
	)
}
