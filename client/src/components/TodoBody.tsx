import { FC } from 'react'
import { Link } from 'react-router-dom'
import { ITodoBodyProps } from '../types/types.components'
import { ErrorMessage } from '../ui/ErrorMessage'
import { List } from '../ui/List.component'
import { Loader } from '../ui/Loader.component'

export const TodoBody: FC<ITodoBodyProps> = ({ refreshTodoFetch }) => {
	const { data, error, isLoading } = refreshTodoFetch

	if (isLoading) return <Loader />

	if (error) return <ErrorMessage error={error?.message} />

	return (
		<div className='todo-list'>
			<ul>
				{data?.length ? (
					data?.map(todo => (
						<Link
							key={todo.id}
							to={`/todo/${todo.id}`}
							style={{ flex: '1 1 auto' }}
						>
							<List
								id={todo.id}
								title={todo.title}
								isCompleted={todo.isCompleted}
							/>
						</Link>
					))
				) : (
					<div style={{ textAlign: 'center' }}>
						<ErrorMessage error='List let' />
					</div>
				)}
			</ul>
		</div>
	)
}
