import { makeAutoObservable } from 'mobx'
import type { IUser } from '../types/type'
import { usersApi } from '@/entities/endpoints/chat-api'

class ChatStore {
	users: IUser[] = []
	isLoading = true
	error = ''

	constructor() {
		makeAutoObservable(this)
	}

	setUsers = (users: IUser[]) => {
		this.users = users
	}
	setLoading = (loading: boolean) => {
		this.isLoading = loading
	}
	setError = (error: string) => {
		this.error = error
	}

	fetchUsers = async () => {
		this.setLoading(true)
		this.setError('')

		try {
			const users = await usersApi.getUsers()
			this.setUsers(users)
		} catch (error: any) {
			this.setError(error.response?.data?.message || error.message)
		} finally {
			this.setLoading(false)
		}
	}
}

export const chatStore = new ChatStore()
