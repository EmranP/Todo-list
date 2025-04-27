import dotenv from 'dotenv'
import express from 'express'
import { checkDB } from './config/db.config'
import { initializeDatabase } from './db/initDB'
import { defaultMiddleware } from './middleware/appMiddleware'
import router from './routes/router'

dotenv.config()

const app = express()
const port = process.env.PORT

// Инициализация default middlewares
defaultMiddleware(app, express)

// Routes =================
app.use('/api', router)

// Start Server ===========
const startApp = async (): Promise<void> => {
	try {
		// Проверка подключение к базе данных
		await checkDB()
		await initializeDatabase()

		// Запуск сервера
		app.listen(port, () => {
			console.log(`🚀 Сервер запущен на http://localhost:${port}`)
		})
	} catch (error) {
		console.error(`❌ Ошибка запуска сервера: ${error}`)
		process.exit(1)
	}
}

startApp()
