import { Dispatch, SetStateAction } from 'react'
import { IResponseTodoApi } from './types.api'
import { IHookFetchReturnType, IHookInput } from './types.hooks'

export interface IButton {
	title: string
	onClick: () => void
}

export interface IInput {
	inputTodo: IHookInput
}

export interface IErrorMessage {
	error: string | undefined
}

export interface ITodoHeaderProps {
	todoInput: IHookInput
	isCompletedTodo: boolean
	setIsCompletedTodo: Dispatch<SetStateAction<boolean>>
	addTodoHandler: () => void
	refreshTodoHandler: () => void
	addTodoFetch: IHookFetchReturnType<IResponseTodoApi>
}

export interface ITodoBodyProps {
	refreshTodoFetch: IHookFetchReturnType<IResponseTodoApi[]>
}
