import { readFile } from 'fs/promises'
import path from 'path'
import { pool } from '../config/db.config'

export const initializeDatabase = async () => {
	try {
		const initSql = await readFile(
			path.join(__dirname, './migrations/init.sql'),
			'utf-8'
		)

		await pool.query(initSql)
		console.log('✅ База данных успешно проинициализирована')
	} catch (error) {
		console.error('❌ Ошибка инициализации базы данных:', error)
		throw error
	}
}
