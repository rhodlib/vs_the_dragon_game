import { PlayerObj } from "../logic";
import "./DisplayGroup.css";
import Player from "./Player";
import { Players } from "rune-games-sdk";

type DisplayType = {
    players: Players;
    playersObj: Record<string, PlayerObj>;
}

export default function DisplayGroup({players, playersObj}: DisplayType ){

    return <section className="display-group">
        {
            Object.entries(playersObj).map(([k,v]) => <Player key={k} name={players[k].displayName} hp={v.hp} maxHp={100}/>)
        }
    </section>
}