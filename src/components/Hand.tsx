import "./Hand.css";
import Card from "./Card";
import { PlayerObj } from "../logic";

type HandType = {
    player:  PlayerObj
}

export default function Hand({player}:HandType){
    const cards = player.hand;
    
    return <section className="hand">
        {
            cards?.map(c => <Card key={c.id} id={c.id} dmg={c.dmg} img={c.img}/>)
        }
    </section>
}