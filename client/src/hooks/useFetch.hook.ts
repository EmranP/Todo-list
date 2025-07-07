/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useState } from 'react'
import { IHookFetch, IHookFetchReturnType } from '../types/types.hooks'

export const useFetch = <T>({
	url,
	options,
	enabledCache = false,
	immediate = true,
}: IHookFetch & { immediate?: boolean }): IHookFetchReturnType<T> => {
	const [data, setData] = useState<T | null>(null)
	const [error, setError] = useState<Error | null>(null)
	const [isLoading, setIsLoading] = useState<boolean>(false)

	const fetchData = useCallback(async () => {
		if (!url) return

		setIsLoading(true)
		setError(null)

		try {
			const cachedData = sessionStorage.getItem(url)
			if (cachedData && enabledCache && options?.method === 'GET') {
				setData(JSON.parse(cachedData))
			} else {
				const res = await fetch(url, options)

				if (!res.ok) {
					throw new Error(`Ошибка запроса: ${res.status} ${res.statusText}`)
				}

				const responseData = await res.json()
				setData(responseData)

				if (enabledCache && options?.method === 'GET') {
					sessionStorage.setItem(url, JSON.stringify(responseData))
				}
			}
		} catch (err) {
			if (err instanceof Error) {
				setError(err)
			} else {
				setError(new Error('Неизвестная ошибка'))
			}
		} finally {
			setIsLoading(false)
		}
	}, [url, JSON.stringify(options), enabledCache])

	useEffect(() => {
		if (immediate) {
			fetchData()
		}
	}, [fetchData, immediate])

	return { data, error, isLoading, refetch: fetchData }
}
