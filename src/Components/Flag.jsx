import { useContext } from "react"
import { GameContext } from "../context/GameContext"

function Flag() {
    const { currentCountry, loading, error } = useContext(GameContext)
    let devuelve
    if (loading) {
        devuelve = <p>CARGANDO países, cuidado con 🇵🇪...</p>
    }
    else if (error != "") {
        devuelve = <p>{error}</p>
    }
    else if (currentCountry === null) {
        devuelve = null
    }
    else {
        devuelve =
            (
                <div className="flag-zone">
                    <img
                        src={currentCountry.flag}
                        alt="Bandera para adivinar"
                    />
                </div>
            )

    }
    return devuelve
}
export default Flag