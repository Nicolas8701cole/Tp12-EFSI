import { useContext } from "react"
import { GameContext } from "../context/GameContext"

function ScoreBoard() {
    const { score } = useContext(GameContext)

    return (
        <h2>Puntaje: {score}</h2>
    )
}
export default ScoreBoard