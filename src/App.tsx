import { useEffect, useState } from "react"
import "./App.css"
import {  GameState } from "./logic.ts"
import DisplayGroup from "./components/DisplayGroup.tsx"
import Hand from "./components/Hand.tsx"
import CombatSection from "./components/CombatSection.tsx"
import ReactHowler from 'react-howler';
import monster_punch from "./sounds/monster_punch.wav"
import player_punch from "./sounds/player_punch.wav"
import potion_sound from "./sounds/potion_drink_long.wav"


function App() {
  const [game, setGame] = useState<GameState>()
  const [playerId, setPlayerId] = useState<string>("")
  const [hitMonster, setHitMonster] = useState(false);
  const [hitPlayer, setHitPlayer] = useState(false);
  const [potionSound, setPotionSound] = useState(false);


  useEffect(() => {
   import("./logic.ts").then( () => { Rune.initClient({
      onChange: ({ game, yourPlayerId, players, action }) => {
        setGame({...game, players})
        if(yourPlayerId){
          setPlayerId(yourPlayerId)
        }
        if(action?.action === "actionCard"){
          setHitMonster(true)
        }
        if(action?.action === "healCard"){
          setPotionSound(true)
        }
      },
    }) })
  }, [])
  
  useEffect(() => {
    if(game?.monsterAttack){
      setHitPlayer(true)
    }
  },[game?.monsterAttack])

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
        <ReactHowler
          src={monster_punch}
          playing={hitPlayer}
          onEnd={() => setHitPlayer(false)}
        />
        <ReactHowler
          src={player_punch}
          playing={hitMonster}
          onEnd={() => setHitMonster(false)}
        />
        <ReactHowler
          src={potion_sound}
          playing={potionSound}
          onEnd={() => setPotionSound(false)}
        />
      </main>
  )
}

export default App
