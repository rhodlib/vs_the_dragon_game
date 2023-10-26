import { useEffect, useState } from "react"
import "./App.css"
import { GameState } from "./logic.ts"
import DisplayGroup from "./components/DisplayGroup.tsx"
import Hand from "./components/Hand.tsx"
import CombatSection from "./components/CombatSection.tsx"
import Player from "./components/Player.tsx"

/*
  <button onClick={() => Rune.actions.increment({ amount: 1 })}>
    count is {game.count}
  </button>
*/
function App() {
  const [game, setGame] = useState<GameState>()
  useEffect(() => {
    Rune.initClient({
      onChange: ({ game }) => {
        setGame(game)
      },
    })
  }, [])

  if (!game) {
    return <div>Loading...</div>
  }
  
  return (
      <main>
        <DisplayGroup playerIds={game.playersHp}/>
        <CombatSection monsterZone={game.monsterZone} monsters={game.monsters}/>
        <Hand/>
      </main>
  )
}

export default App
