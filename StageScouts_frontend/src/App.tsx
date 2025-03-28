import { useEffect, useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'

function App() {
  const [scrollPosition, setScrollPosition] = useState(0);

  window.addEventListener('scroll', () => {setScrollPosition(window.scrollY)}) ;

  return (
    <div className='flex justify-center'>
      <div className='w-7xl'>
          <Navbar />
       </div>
    </div>
  )
}

export default App
