import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import CoverPage from './components/pages/coverPage/CoverPage'

function App() {

  return (
    <>
      <CoverPage />
      <Dashboard/>
    </>
  )
}

export default App
