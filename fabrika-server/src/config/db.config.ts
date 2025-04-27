import { Pool } from 'pg'
import { DB_CONFIG } from './config'

export const pool = new Pool(DB_CONFIG)

export const checkDB = async () => {
	try {
		const res = await pool.query('SELECT NOW();')

		console.log('Database connected:', res.rows[0])
	} catch (error) {
		console.error('Database connection error:', error)
	}
}
