import { useEffect, useState } from "react"
import "./App.css"
import {  GameState } from "./logic.ts"
import DisplayGroup from "./components/DisplayGroup.tsx"
import Hand from "./components/Hand.tsx"
import CombatSection from "./components/CombatSection.tsx"
import { playSound } from "./sounds.ts"

function App() {
  const [game, setGame] = useState<GameState>()
  const [playerId, setPlayerId] = useState<string>("")

  useEffect(() => {
    Rune.initClient({
      onChange: ({ game, yourPlayerId, players, action }) => {
        setGame({...game, players})
        if(yourPlayerId){
          setPlayerId(yourPlayerId)
        }
        console.log(action?.name)
        if(action?.name === "actionCard"){
          playSound("playerPunch")
        }
        if(action?.name === "healCard"){
          playSound("potion")
        }
      },
    })
  }, [])

  if (!game) {
    return <div>Loading...</div>
  }
  
  const [user,dmg] = game.lastDamage.split(":");
  let displayDmg = ""
  if(user && dmg){
    displayDmg = `${game.players[user].displayName} ${dmg}`
  }else {
    displayDmg = ""
  }
  
  return (
      <main>
        <DisplayGroup turn={game.turn} players={game.players} playersObj={game.playersObj}/>
        <CombatSection hitMonster={game.hitMonster} monsterAttack={game.monsterAttack} displayDmg={displayDmg} monsterZone={game.monsterZone} monsters={game.monsters}/>
        <Hand yourTurn={game.turn === playerId} playerHand={game.playersObj[playerId].hand}/>
      </main>
  )
}

export default App
