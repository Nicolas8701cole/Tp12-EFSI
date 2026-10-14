import { useEffect, useState } from "react"
import './App.css'
import Flag from "./components/Flag"
import ScoreBoard from "./components/ScoreBoard"
import GuessForm from "./components/GuessForm"

function App() {
  const [batalla, setBatalla] = useState({
    ratones: [],
    disparos: []
  })

  useEffect(function () {
    actualizarBatalla()

    const intervalo = setInterval(function () {
      actualizarBatalla()
    }, 4000)

    return function () {
      clearInterval(intervalo)
    }
  }, [])

  function actualizarBatalla() {
    setBatalla(function (actual) {
      const ratones = [...actual.ratones]
      const disparos = [...actual.disparos]

      if (ratones.length < 3 && Math.random() < 0.7) {
        let fila = Math.floor(Math.random() * 12) + 1
        let ocupada = true

        while (ocupada) {
          ocupada = false

          for (let i = 0; i < ratones.length; i++) {
            if (ratones[i].fila === fila) {
              ocupada = true
              fila = Math.floor(Math.random() * 12) + 1
            }
          }
        }

        ratones.push({
          id: Date.now() + Math.random(),
          fila: fila,
          muriendo: false,
          tiempoMuerte: 0
        })
      }

      if (disparos.length < 2) {
        const posibles = []

        for (let i = 0; i < ratones.length; i++) {
          let yaLeDisparan = false

          for (let j = 0; j < disparos.length; j++) {
            if (disparos[j].ratonId === ratones[i].id) {
              yaLeDisparan = true
            }
          }

          if (!ratones[i].muriendo && !yaLeDisparan) {
            posibles.push(ratones[i])
          }
        }

        if (posibles.length > 0) {
          const objetivo = posibles[
            Math.floor(Math.random() * posibles.length)
          ]

          disparos.push({
            id: Date.now() + Math.random(),
            fila: objetivo.fila,
            ratonId: objetivo.id,
            demora: 1 + Math.random()
          })
        }
      }

      return {
        ratones: ratones,
        disparos: disparos
      }
    })
  }

  function golpearRaton(ratonId, disparoId) {
    const tiempoMuerte = Math.floor(Math.random() * 5) + 2

    setBatalla(function (actual) {
      const nuevosRatones = []

      for (let i = 0; i < actual.ratones.length; i++) {
        const raton = actual.ratones[i]

        if (raton.id === ratonId) {
          nuevosRatones.push({
            ...raton,
            muriendo: true,
            tiempoMuerte: tiempoMuerte
          })
        }
        else {
          nuevosRatones.push(raton)
        }
      }

      const nuevosDisparos = actual.disparos.filter(function (disparo) {
        return disparo.id !== disparoId
      })

      return {
        ratones: nuevosRatones,
        disparos: nuevosDisparos
      }
    })

    setTimeout(function () {
      setBatalla(function (actual) {
        const nuevosRatones = actual.ratones.filter(function (raton) {
          return raton.id !== ratonId
        })

        return {
          ratones: nuevosRatones,
          disparos: actual.disparos
        }
      })
    }, tiempoMuerte * 1000)
  }

  const filasBatalla = []

  for (let fila = 1; fila <= 12; fila++) {
    let ratonFila = null
    let disparoFila = null

    for (let i = 0; i < batalla.ratones.length; i++) {
      if (batalla.ratones[i].fila === fila) {
        ratonFila = batalla.ratones[i]
      }
    }

    for (let i = 0; i < batalla.disparos.length; i++) {
      if (batalla.disparos[i].fila === fila) {
        disparoFila = batalla.disparos[i]
      }
    }

    let claseGato = "gato"
    let estiloGato = {}

    if (disparoFila !== null) {
      claseGato = "gato disparando"
      estiloGato = {
        animationDelay: disparoFila.demora + "s"
      }
    }

    let ratonElemento = null

    if (ratonFila !== null) {
      let claseRaton = "raton"

      if (ratonFila.muriendo) {
        claseRaton = "raton muriendo"
      }

      ratonElemento = (
        <div
          className={ratonFila.muriendo ? "raton-movimiento frenado" : "raton-movimiento"}
        >
          <img
            src="/RatonSinFondo.png"
            className={claseRaton}
            alt=""
            style={{
              animationDuration: ratonFila.tiempoMuerte + "s"
            }}
          />
        </div>
      )
    }

    let disparoElemento = null

    if (disparoFila !== null) {
      disparoElemento = (
        <img
          src="/rainbow-cat-rainbow.gif"
          className="disparo"
          alt=""
          style={{
            animationDelay: disparoFila.demora + "s"
          }}
          onAnimationEnd={function () {
            golpearRaton(
              disparoFila.ratonId,
              disparoFila.id
            )
          }}
        />
      )
    }

    filasBatalla.push(
      <div className="fila-batalla" key={fila}>
        <img
          src="/gatoSinFondo.png"
          className={claseGato}
          style={estiloGato}
          alt=""
        />

        {disparoElemento}
        {ratonElemento}
      </div>
    )
  }

  return (
    <>
      <div className="batalla">
        {filasBatalla}
      </div>
      <main>
        <h1>Adiviná la bandera</h1>
        <ScoreBoard />
        <Flag />
        <GuessForm />
      </main>

    </>
  )
}

export default App
