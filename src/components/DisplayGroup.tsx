import { PlayerObj } from "../logic";
import "./DisplayGroup.css";
import Player from "./Player";
import { Players } from "rune-games-sdk";

type DisplayType = {
    players: Players;
    playersObj: Record<string, PlayerObj>;
    turn: string;
}

export default function DisplayGroup({players, playersObj, turn}: DisplayType ){

    return <section className="display-group">
        {
            Object.entries(playersObj).map(([k,v]) => <Player key={k} turn={turn === k} name={players[k]?.displayName} avatar={players[k]?.avatarUrl} hp={v?.hp} maxHp={100}/>)
        }
    </section>
}