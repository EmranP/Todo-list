import { pool } from '../config/db.config'

export interface ITodo {
	id: number
	title: string
	is_completed: boolean
}
// GET
export const getTodoModel = async (): Promise<ITodo[] | null> => {
	try {
		const sqlQuery = `SELECT * FROM todo`
		const sqlResult = await pool.query<ITodo>(sqlQuery)

		return sqlResult.rows || null
	} catch (error) {
		if (error instanceof Error) {
			console.log(error.message)
		} else {
			throw new Error('Error gets todo list :(')
		}
		return null
	}
}

export const getTodoByIdModel = async (
	todoId: number
): Promise<ITodo | null> => {
	try {
		const sqlQuery = `SELECT * FROM todo WHERE id = $1`
		const sqlResult = await pool.query(sqlQuery, [todoId])

		return sqlResult.rows[0] || null
	} catch (error) {
		if (error instanceof Error) {
			console.log(error.message)
		} else {
			throw new Error('Error get by id todo :(')
		}
		return null
	}
}
// POST
export const createTodoByIdModel = async (
	title: string,
	isCompleted: boolean
): Promise<ITodo | void> => {
	try {
		const sqlQuery = `INSERT INTO todo (title, is_completed) VALUES($1, $2) RETURNING *`
		const sqlResult = await pool.query(sqlQuery, [title, isCompleted])

		return sqlResult.rows[0]
	} catch (error) {
		if (error instanceof Error) {
			console.log(error.message)
		}
		return
	}
}

// DELETE
export const deleteTodoModel = async (
	todoId: number
): Promise<{ message: string } | void> => {
	const client = await pool.connect()
	try {
		await client.query('BEGIN')

		const checkQuery = `SELECT * FROM todo WHERE id = $1`
		const checkResult = await pool.query(checkQuery, [todoId])

		if (checkResult.rowCount === 0) {
			console.log('This todo not founded')
			return { message: 'This todo not founded' }
		}

		const sqlQuery = `DELETE FROM todo WHERE id = $1`
		await pool.query(sqlQuery, [todoId])
		await client.query('COMMIT')

		return { message: `Todo is has success delete id ${todoId}` }
	} catch (error) {
		await client.query('ROLLBACK')
		if (error instanceof Error) {
			console.log(error.message)
			return { message: error.message }
		} else {
			throw new Error('Error delete todo')
		}
	} finally {
		client.release()
	}
}
