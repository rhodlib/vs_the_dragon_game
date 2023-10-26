import "./DisplayGroup.css";
import Player from "./Player";

type DisplayGroup = {
    playerIds: Record<string,number>
}

export default function DisplayGroup({ playerIds }:DisplayGroup){
    return <section className="display-group">
        {
            Object.entries(playerIds).map(([k,v]) => <Player key={k} name={""}/>)
        }
    </section>
}