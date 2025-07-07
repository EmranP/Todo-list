import cors from 'cors'
import express, { type Express } from 'express'

export const defaultMiddleware = (
	app: Express,
	expressInstance: typeof express
): void => {
	app.use(expressInstance.json())
	app.use(
		cors({
			credentials: true,
			origin: process.env.CLIENT_URL,
		})
	)

	app.use(
		expressInstance.urlencoded({
			extended: true,
		})
	)
}
