import "./DisplayGroup.css";
import Player from "./Player";

export default function DisplayGroup(){
    return <section className="display-group">
        <Player name="Player 1" turn/>
        <Player name="Player 2"/>
        <Player name="Player 3"/>
    </section>
}