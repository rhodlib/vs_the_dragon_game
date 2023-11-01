import "./Hand.css";
import Card from "./Card";
import { CardType } from "../logic";

type HandType = {
    playerHand:  CardType[];
    yourTurn: boolean;
}

export default function Hand({playerHand, yourTurn}:HandType){

    return <section className="hand">
        {
            playerHand?.map((c, i) => <Card key={i} id={c.id} dmg={c.dmg} img={c.img} onDblClick={() => yourTurn && c.dmg > 0 ? Rune.actions.healCard({cardId: c.id, cardIndex: i}) : Rune.actions.actionCard({cardId: c.id, cardIndex: i})}/>)
        }
    </section>
}