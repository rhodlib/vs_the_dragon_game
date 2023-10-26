import "./DisplayGroup.css";
import Player from "./Player";
import { Players } from "rune-games-sdk";

type DisplayType = {
    players: Players;
    playersHp: Record<string, number>;
}

export default function DisplayGroup({players, playersHp}: DisplayType ){

    return <section className="display-group">
        {
            Object.entries(playersHp).map(([k,v]) => <Player key={k} name={players[k].displayName} hp={v} maxHp={100}/>)
        }
    </section>
}