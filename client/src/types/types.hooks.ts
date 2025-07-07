import { ChangeEvent } from 'react'

export interface IHookFetch {
	url: string
	enabledCache: boolean
	options?: RequestInit | undefined
}

export interface IHookFetchReturnType<T> {
	data: T | null
	error: Error | null
	isLoading: boolean
	refetch: () => Promise<void>
}

export interface IHookInput {
	value: string
	onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

export interface IHookToggle {
	toggle: boolean
	toggleHandler: () => void
}
