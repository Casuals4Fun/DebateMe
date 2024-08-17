import './globals.css'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { registerLicense } from '@syncfusion/ej2-base'
import App from './App.tsx'

registerLicense(import.meta.env.VITE_SYNCFUSION_KEY)

ReactDOM.createRoot(document.getElementById('root')!).render(<BrowserRouter><App /></BrowserRouter>)