import "./Hand.css";
import Card from "./Card";
import { CardType } from "../logic";

type HandType = {
    playerHand:  CardType[];
}

export default function Hand({playerHand}:HandType){
    return <section className="hand">
        {
            playerHand?.map((c, i) => <Card key={i} id={c.id} dmg={c.dmg} img={c.img} onDblClick={() => Rune.actions.actionCard({cardId: c.id, cardIndex: i})}/>)
        }
    </section>
}