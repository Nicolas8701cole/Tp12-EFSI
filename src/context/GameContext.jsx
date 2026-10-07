import { createContext, useEffect } from "react";
import { useState } from "react";

export const GameContext = createContext()

export function GameProvider({ children }) {
    const [countries, setCountries] = useState([])
    const [currentCountry, setCurrentCountry] = useState(null)
    const [score, setScore] = useState(0)
    const [answer, setAnswer] = useState("") //nos da
    const [result, setResult] = useState(null) //damos
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("") //damos

    useEffect(function () {
        loadCountries()
    }, []) //[] es al arrancar

    async function loadCountries() {
        try {
            const response = await fetch("https://countriesnow.space/api/v0.1/countries/flag/images")
            const result = await response.json()
            setCountries(result.data)

            const number = Math.floor(Math.random() * result.data.length)
            //Math.floor no decimales
            //Math.random * algo genera algo de 0 a algo con comas
            setCurrentCountry(result.data[number])
            //y no
            //setCurrentCountry(countries[number])
            //porque puede no haber cambiado aún el useState
        }
        catch (error) {
            setError("No se pudieron cargar los países")
        }
        finally {
            setLoading(false)
        }
    }

    return (
        <GameContext.Provider
            value={{
                countries,
                currentCountry,
                score,
                answer,
                result,
                loading,
                error,
            }}>
            {children}
        </GameContext.Provider>
    )
}