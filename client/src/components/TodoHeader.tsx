import { FC } from 'react'
import { ITodoHeaderProps } from '../types/types.components'
import { Button } from '../ui/Button.component'
import { ErrorMessage } from '../ui/ErrorMessage'
import { Input } from '../ui/Input.component'

export const TodoHeader: FC<ITodoHeaderProps> = ({
	addTodoFetch,
	todoInput,
	addTodoHandler,
	refreshTodoHandler,
	setIsCompletedTodo,
}) => {
	const clickTodoCompletedHandler = () => setIsCompletedTodo(true)
	const clickTodoNotCompletedHandler = () => setIsCompletedTodo(false)

	return (
		<section className='section'>
			<h1>Fabrika-todo</h1>
			{addTodoFetch.error && (
				<div style={{ textAlign: 'center' }}>
					<ErrorMessage error={addTodoFetch.error.message} />
				</div>
			)}
			<div className='wrapper-input'>
				<Button title='Refresh data' onClick={refreshTodoHandler} />
				<Input inputTodo={todoInput} />
				<Button title='Add todo' onClick={addTodoHandler} />
			</div>
			<div className='panel-completed'>
				<Button title='Completed' onClick={clickTodoCompletedHandler} />
				<Button title='Not-completed' onClick={clickTodoNotCompletedHandler} />
			</div>
		</section>
	)
}
