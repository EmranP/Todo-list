import type { ITodo } from '../model/todo.model'

export interface ITodoDTO extends Omit<ITodo, 'is_completed'> {
	isCompleted: boolean
}

export class TodoDTO {
	id: number
	title: string
	isCompleted: boolean

	constructor(model: ITodo) {
		this.id = model.id
		this.title = model.title
		this.isCompleted = model.is_completed
	}

	toPlain(): ITodoDTO {
		return {
			id: this.id,
			title: this.title,
			isCompleted: this.isCompleted,
		}
	}
}
