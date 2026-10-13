import { useContext } from "react"
import { GameContext } from "../context/GameContext"

function GuessForm() {
    const { answer, changeAnswer } = useContext(GameContext)

    return (
        <input type="text" value={answer} placeholder="Escribí el país" onChange={(event) => changeAnswer(event.target.value)} />
    )
}

export default GuessForm