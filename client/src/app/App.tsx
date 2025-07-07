import { FC, useState } from 'react'
import { TodoBody } from '../components/TodoBody'
import { TodoHeader } from '../components/TodoHeader'
import { useFetch } from '../hooks/useFetch.hook'
import { useInput } from '../hooks/useInput.hook'
import { IResponseTodoApi } from '../types/types.api'
import { ADD_TODO, GET_TODO } from './api.constant'
import './App.css'

export const App: FC = () => {
	const [isCompletedTodo, setIsCompletedTodo] = useState(false)
	const todoInput = useInput()

	const addTodoFetch = useFetch<IResponseTodoApi>({
		url: ADD_TODO,
		options: {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				title: todoInput.value,
				is_completed: isCompletedTodo,
			}),
		},
		enabledCache: false,
		immediate: false,
	})

	const refreshTodoFetch = useFetch<IResponseTodoApi[]>({
		url: GET_TODO,
		enabledCache: true,
		immediate: true,
	})

	const addTodoHandler = () => addTodoFetch.refetch()
	const refreshTodoHandler = () => refreshTodoFetch.refetch()

	return (
		<div className='container'>
			<TodoHeader
				todoInput={todoInput}
				addTodoFetch={addTodoFetch}
				isCompletedTodo={isCompletedTodo}
				refreshTodoHandler={refreshTodoHandler}
				addTodoHandler={addTodoHandler}
				setIsCompletedTodo={setIsCompletedTodo}
			/>
			<TodoBody refreshTodoFetch={refreshTodoFetch} />
		</div>
	)
}
