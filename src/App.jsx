import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import './index.css'
import { Outlet } from 'react-router-dom'

import { useEffect } from 'react'
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
   
      
    <Navbar/>
    <main className='min-h-screen mx-w-screen-2xl mx-auto px-4 py-6'>
        <Outlet/>
        
        </main>
    <Footer/>   
  

 
      

    </>
  )
}

export default App
