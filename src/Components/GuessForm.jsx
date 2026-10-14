import { useContext } from "react"
import { GameContext } from "../context/GameContext"

function GuessForm() {
    const { answer, changeAnswer, guess, result } = useContext(GameContext)
    let devuelveResultado
    if (result === true) {
        devuelveResultado = <p>Correcto +10</p>
    }
    else if (result === false) {
        devuelveResultado = <p>Incorrecto -1</p>
    }
    else {
        devuelveResultado = null
    }
    return (
        <div>
            <input type="text" value={answer} placeholder="Escribí el país" onChange={(event) => changeAnswer(event.target.value)} />
            <button onClick={guess}>Comprobar</button>
            {devuelveResultado}
        </div>

    )

}

export default GuessForm