import { Router } from 'express'
import {
	addTodoController,
	deleteTodoController,
	getTodoByIdController,
	getTodoController,
} from '../controller/todo.controller'

const todoRouter = Router({ mergeParams: true })

todoRouter.get('/', getTodoController)
todoRouter.get('/:todoId', getTodoByIdController)
todoRouter.post('/add', addTodoController)
todoRouter.delete('/remove/:todoId', deleteTodoController)

export default todoRouter
