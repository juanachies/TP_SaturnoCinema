import {BrowserRouter, Routes, Route, Router} from 'react-router-dom'
import './App.css'
import Dashboard from './pages/dashboard/Dashboard'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Dashboard/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
