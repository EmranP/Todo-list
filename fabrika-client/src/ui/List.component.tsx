import { FC } from 'react'
import { IResponseTodoApi } from '../types/types.api'

export const List: FC<IResponseTodoApi> = ({ id, title, isCompleted }) => {
	return (
		<li>
			<span>{id}.</span>
			{title}
			<span className='todo-list__completed'>
				{isCompleted ? (
					'✔'
				) : (
					<span className='todo-list__not__completed'>❌</span>
				)}{' '}
			</span>
		</li>
	)
}
