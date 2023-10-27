import { useEffect, useState } from "react"
import "./App.css"
import {  GameState } from "./logic.ts"
import DisplayGroup from "./components/DisplayGroup.tsx"
import Hand from "./components/Hand.tsx"
import CombatSection from "./components/CombatSection.tsx"

function App() {
  const [game, setGame] = useState<GameState>()
  const [playerId, setPlayerId] = useState<string>("")

  useEffect(() => {
    Rune.initClient({
      onChange: ({ game, players, yourPlayerId }) => {
        setGame({...game, players})

        if(yourPlayerId){
          setPlayerId(yourPlayerId)
        }

      },
    })
  }, [])

  if (!game) {
    return <div>Loading...</div>
  }
  
  return (
      <main>
        <DisplayGroup players={game.players} playersObj={game.playersObj}/>
        <CombatSection monsterZone={game.monsterZone} monsters={game.monsters}/>
        <Hand playerHand={game.playersObj[playerId].hand}/>
      </main>
  )
}

export default App
