import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { ThemeContextProvider } from './components/theme/ThemeContextProvider.jsx';
import "./components/theme/themes.css"


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeContextProvider>
    <App />
    </ThemeContextProvider>
  </StrictMode>,
)
