import { FC } from 'react'
import { IButton } from '../types/types.components'

export const Button: FC<IButton> = ({ title, onClick }) => {
	return <button onClick={onClick}>{title}</button>
}
