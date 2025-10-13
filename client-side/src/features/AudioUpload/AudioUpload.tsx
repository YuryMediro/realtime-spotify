import { Button } from '@/components/kit/button'
import { Label } from '@/components/kit/label'
import type { useAudioUpload } from '@/shared/hooks/useAudioUpload'
import { formatDuration } from '@/shared/lib/format/formatDuration'

interface AudioUploadProps {
	isLoading?: boolean
	uploadState: ReturnType<typeof useAudioUpload>
}

export const AudioUpload = ({
	isLoading = false,
	uploadState,
}: AudioUploadProps) => {
	const {
		handleButtonClick,
		selectedFile,
		removeAudio,
		fileInputRef,
		duration,
	} = uploadState
	return (
		<>
			<input
				type='file'
				accept='audio/*'
				className='hidden'
				disabled={isLoading}
				onChange={uploadState.handleFileSelect}
				ref={fileInputRef}
			/>
			<div className='space-y-2'>
				<Label className='text-sm font-medium'>Audio File</Label>
				<div className='flex items-center gap-2'>
					{selectedFile ? (
						<div className='flex flex-col gap-2 w-full'>
							<Button
								type='button'
								variant='outline'
								className='w-full truncate'
								disabled={isLoading}
							>
								<span className='truncate'>{selectedFile.name}</span>
							</Button>
							<Button
								type='button'
								size='sm'
								variant='destructive'
								onClick={removeAudio}
								disabled={isLoading}
							>
								Remove
							</Button>
						</div>
					) : (
						<Button
							type='button'
							variant='outline'
							className='w-full'
							disabled={isLoading}
							onClick={handleButtonClick}
						>
							Choose Audio File
						</Button>
					)}
				</div>
				{duration > 0 && (
					<div className='text-xs text-zinc-400'>
						Duration: {formatDuration(duration)}
					</div>
				)}
			</div>
		</>
	)
}
