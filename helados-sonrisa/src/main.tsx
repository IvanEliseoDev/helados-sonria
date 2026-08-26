import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { HSonrisasApp } from './HSonrisas-App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HSonrisasApp />
  </StrictMode>,
)
