import { useState } from 'react'
import { IHookToggle } from '../types/types.hooks'

export const useToggle = (initialValue: boolean = false): IHookToggle => {
	const [toggle, setToggle] = useState(initialValue)

	const toggleHandler = () => setToggle(prev => !prev)

	return { toggle, toggleHandler }
}
