import { FC } from 'react'
import {
	createBrowserRouter,
	RouterProvider,
	useRouteError,
} from 'react-router-dom'
import { CurrentTodoPage } from '../page/CurrentTodoPage'
import { NotFoundPage } from '../page/NotFoundPage'
import { App } from './App'

const BubbleError: FC = () => {
	const errorRoutes = useRouteError() as unknown

	let errorMessage = 'Unknown error'

	if (
		errorRoutes &&
		typeof errorRoutes === 'object' &&
		'message' in errorRoutes
	) {
		errorMessage = (errorRoutes as { message: string }).message
	}
	return <h1 className='bubble-error'>Error: {errorMessage}</h1>
}

const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		errorElement: <BubbleError />,
	},
	{
		path: '/todo/:id',
		element: <CurrentTodoPage />,
		errorElement: <BubbleError />,
	},
	{
		path: '*',
		element: <NotFoundPage />,
	},
])

export const BrowserRouter: FC = () => {
	return <RouterProvider router={router} />
}
