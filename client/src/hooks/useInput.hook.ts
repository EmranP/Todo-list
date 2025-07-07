import { ChangeEvent, useState } from 'react'
import { IHookInput } from '../types/types.hooks'

export const useInput = (initialValue: string = ''): IHookInput => {
	const [value, setValue] = useState(initialValue)

	const onChange = (e: ChangeEvent<HTMLInputElement>) =>
		setValue(e.target.value)

	return { value, onChange }
}
