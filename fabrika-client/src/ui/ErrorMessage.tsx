import { FC } from 'react'
import { IErrorMessage } from '../types/types.components'

export const ErrorMessage: FC<IErrorMessage> = ({ error }) => {
	return (
		<div className='error-message'>
			<h2>{error}</h2>
		</div>
	)
}
