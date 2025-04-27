import { FC } from 'react'
import { IInput } from '../types/types.components'

export const Input: FC<IInput> = ({ inputTodo }) => {
	return <input className='todo-input' {...inputTodo} />
}
