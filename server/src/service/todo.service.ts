import {
	createTodoByIdModel,
	deleteTodoModel,
	getTodoByIdModel,
	getTodoModel,
} from '../model/todo.model'
import { TodoDTO, type ITodoDTO } from '../utils/dtos'

class TodoService {
	async getTodo(): Promise<ITodoDTO[] | null> {
		const todoData = await getTodoModel()

		if (!todoData?.length) {
			return null
		}

		const todoDTO = todoData.map(todo => new TodoDTO(todo))
		const plainTodo = todoDTO.map(dto => dto.toPlain())

		return plainTodo
	}
	async getTodoById(
		todoId: string | number | null
	): Promise<ITodoDTO | null | void> {
		if (!todoId) {
			return
		}

		const todoItemData = await getTodoByIdModel(todoId as number)

		if (!todoItemData) return

		const todoByIdDTO = new TodoDTO(todoItemData).toPlain()

		return todoByIdDTO
	}
	async addTodo(
		title: string,
		isCompleted: boolean
	): Promise<ITodoDTO | null | void> {
		if (!title) return

		const newTodo = await createTodoByIdModel(title, isCompleted)

		if (!newTodo) return

		const newTodoDTO = new TodoDTO(newTodo).toPlain()

		return newTodoDTO
	}
	async removeTodo(todoId: number | string): Promise<{ message: string }> {
		if (!todoId) return { message: 'Todo id not founded' }

		const deleteData = await deleteTodoModel(todoId as number)

		if (!deleteData) {
			return { message: 'Error delete todo (' }
		}

		return deleteData
	}
}

export const todoService = new TodoService()
