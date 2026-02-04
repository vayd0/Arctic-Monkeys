import { useState } from 'react'
import './App.css'
import Intro from "../Intro/Intro"

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Intro />
    </>
  )
}

export default App