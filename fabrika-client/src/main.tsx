import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from './app/router.tsx'
import './index.css'

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<BrowserRouter />
	</StrictMode>
)
