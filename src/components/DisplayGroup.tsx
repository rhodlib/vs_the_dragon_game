import "./DisplayGroup.css";
import Player from "./Player";

type DisplayGroup = {
    players: string[]
}

export default function DisplayGroup({ players }:DisplayGroup){
    console.log(players)
    return <section className="display-group">
        <Player name="Player 1" turn/>
        <Player name="Player 2"/>
        <Player name="Player 3"/>
    </section>
}