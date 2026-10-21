import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './styles.css'
import './editorial.css'
import './hacker.css'

createRoot(document.getElementById('root')!).render(<React.StrictMode><BrowserRouter><App /></BrowserRouter></React.StrictMode>)
