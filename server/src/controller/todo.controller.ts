import type { RequestHandler } from 'express'
import { todoService } from '../service/todo.service'

interface ITodoRequestBody {
	title: string
	is_completed: boolean
}
// Get
export const getTodoController: RequestHandler = async (
	req,
	res,
	next
): Promise<void> => {
	try {
		const getTodo = await todoService.getTodo()

		res.status(200).json(getTodo)
	} catch (error) {
		next(error)
	}
}

export const getTodoByIdController: RequestHandler = async (
	req,
	res,
	next
): Promise<void> => {
	try {
		const { todoId } = req.params

		if (!todoId) {
			res.status(404).json({ message: 'Todo not founed' })
			return
		}

		const getTodoItem = await todoService.getTodoById(todoId)

		if (!getTodoItem) {
			res.status(400).json({ message: 'Something was wrong' })
			return
		}

		res.status(200).json(getTodoItem)
	} catch (error) {
		next(error)
	}
}

// Post
export const addTodoController: RequestHandler = async (
	req,
	res,
	next
): Promise<void> => {
	try {
		const { title, is_completed } = req.body as ITodoRequestBody

		const newTodo = await todoService.addTodo(title, is_completed)

		if (!newTodo) {
			res.status(400).json({ message: 'Error from controller' })
			return
		}

		res.status(201).json(newTodo)
	} catch (error) {
		next(error)
	}
}

export const deleteTodoController: RequestHandler = async (
	req,
	res,
	next
): Promise<void> => {
	try {
		const { todoId } = req.params

		if (!todoId) {
			res.status(404).json({ message: 'Todo for remove not founed' })
			return
		}

		const removeTodoData = await todoService.removeTodo(todoId)

		if (!removeTodoData) {
			res
				.status(400)
				.json({ message: 'Something was wrong from delete controller' })
			return
		}

		res.status(201).json(removeTodoData)
	} catch (error) {
		next(error)
	}
}
