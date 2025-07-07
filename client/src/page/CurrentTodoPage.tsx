import { FC } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { GET_TODO, REMOVE_TODO } from '../app/api.constant'
import { useFetch } from '../hooks/useFetch.hook'
import { IResponseTodoApi } from '../types/types.api'
import { Button } from '../ui/Button.component'
import { Loader } from '../ui/Loader.component'

export const CurrentTodoPage: FC = () => {
	const navigate = useNavigate()
	const params = useParams<{ id: string }>()
	const dataTodoById = useFetch<IResponseTodoApi>({
		url: `${GET_TODO}/${params.id}`,
		enabledCache: true,
		immediate: true,
	})
	const removeTodo = useFetch<{ message: string }>({
		url: `${REMOVE_TODO}/${dataTodoById.data?.id}`,
		options: {
			method: 'DELETE',
		},
		immediate: false,
		enabledCache: false,
	})

	if (dataTodoById.isLoading) return <Loader />

	const removeTodoHandler = () => {
		removeTodo.refetch()
		setTimeout(() => {
			navigate('/')
		}, 500)
	}

	console.log(params)

	return (
		<section className='container'>
			<div className='current-todo__row'>
				<div
					style={{ cursor: 'pointer', width: 100 }}
					onClick={() => navigate(-1)}
				>
					<h2>🚪 Back</h2>
				</div>
				<div style={{ textAlign: 'center' }}>
					<h1>Todo ID: {params.id}</h1>
					<h2>Todo name: {dataTodoById.data?.title}</h2>
					<h3>
						Todo completed:{' '}
						<span className='todo-list__completed'>
							{dataTodoById.data?.isCompleted ? (
								'✔'
							) : (
								<span className='todo-list__not__completed'>❌</span>
							)}{' '}
						</span>
					</h3>
				</div>
				<Button title='Remove todo' onClick={removeTodoHandler} />
			</div>
		</section>
	)
}
