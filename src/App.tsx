import { useEffect, useState } from "react"
import "./App.css"
import { GameState } from "./logic.ts"
import DisplayGroup from "./components/DisplayGroup.tsx"
import Hand from "./components/Hand.tsx"
import CombatSection from "./components/CombatSection.tsx"

function App() {
  const [game, setGame] = useState<GameState>()

  useEffect(() => {
    Rune.initClient({
      onChange: ({ game, players }) => {
        setGame({...game, players})
      },
    })
  }, [])

  if (!game) {
    return <div>Loading...</div>
  }
  
  return (
      <main>
        <DisplayGroup players={game.players} playersHp={game.playersHp}/>
        <CombatSection monsterZone={game.monsterZone} monsters={game.monsters}/>
        <Hand/>
      </main>
  )
}

export default App
