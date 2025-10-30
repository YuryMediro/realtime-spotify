import { User } from '../models/user.model.js'

export const authCallback = async (req, res, next) => {


	try {
		const { id, firstName, lastName, imageUrl, email } = req.body

		if (!id) {
			console.log('ERROR: Missing clerkId')
			return res.status(400).json({
				success: false,
				error: 'User ID (clerkId) is required',
			})
		}

		console.log('Searching for user with clerkId:', id)
		const user = await User.findOne({ clerkId: id })

		if (!user) {
			console.log('User not found, creating new user...')

			let fullName
			if (firstName || lastName) {
				fullName = `${firstName || ''} ${lastName || ''}`.trim()
			} else if (email) {
				const username = email.split('@')[0]
				fullName = `${username} User`
			} else {
				fullName = 'User'
			}

			console.log('Generated fullName:', fullName)

			const newUserData = {
				clerkId: id,
				fullName,
				imageUrl: imageUrl || '/default-avatar.png',
				email: email || null,
			}

			console.log('Creating user with data:', newUserData)

			const newUser = await User.create(newUserData)
			console.log('User created successfully:', newUser._id)
		} else {
			console.log('User found:', user._id)

			let updated = false
			if (!user.email && email) {
				console.log('Updating email from', user.email, 'to', email)
				user.email = email
				updated = true
			}

			if (updated) {
				await user.save()
				console.log('User updated successfully')
			} else {
				console.log('No updates needed')
			}
		}

		console.log('=== AUTH CALLBACK SUCCESS ===')
		res.status(200).json({
			success: true,
			message: 'Authentication processed successfully',
		})
	} catch (error) {
		console.log('=== AUTH CALLBACK ERROR ===')
		console.log('Error name:', error.name)
		console.log('Error message:', error.message)
		console.log('Error code:', error.code)
		console.log('Error stack:', error.stack)

		if (error.name === 'ValidationError') {
			console.log('Validation errors:', error.errors)
			return res.status(400).json({
				success: false,
				error: 'Validation failed',
				details: Object.values(error.errors).map(err => err.message),
			})
		}

		if (error.code === 11000) {
			console.log('Duplicate key error')
			return res.status(400).json({
				success: false,
				error: 'User already exists',
				details: 'A user with this clerkId already exists',
			})
		}

		if (error.name === 'CastError') {
			console.log('Cast error - invalid data type')
			return res.status(400).json({
				success: false,
				error: 'Invalid data format',
			})
		}

		res.status(500).json({
			success: false,
			error: 'Internal server error',
			message: error.message,
		})
	}
}
