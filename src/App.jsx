//import { useState } from 'react'
import './App.css'
import Flag from "./components/Flag"
import ScoreBoard from "./components/ScoreBoard"
import GuessForm from "./components/GuessForm"

function App() {
  //const [count, setCount] = useState(0)

  return (
    <main>
      <h1>Adiviná la bandera</h1>
      <ScoreBoard/>
      <Flag />
      <GuessForm />
    </main>
  )
}

export default App
