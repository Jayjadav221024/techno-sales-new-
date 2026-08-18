import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
// Uncomment once the licensed Neue Montreal .woff2 files are in public/fonts/.
// Enabling it before the files exist makes the SPA fallback answer the font
// requests with index.html, which the browser reports as an OTS parsing error.
// import './fonts.css'
import './index.css'
import './pages.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
