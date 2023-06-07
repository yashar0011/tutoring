import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

const el = document.getElementById('root') as HTMLElement

const root = ReactDOM.createRoot(el)

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
