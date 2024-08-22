import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import GridBackGround from './components/ui/GridBackGround.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <GridBackGround>
        <App />
      </GridBackGround>
    </BrowserRouter>
  </StrictMode>,
)
