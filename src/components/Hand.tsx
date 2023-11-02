import "./Hand.css";
import Card from "./Card";
import { CardType } from "../logic";
import { useCallback } from "react";

type HandType = {
    playerHand:  CardType[];
    yourTurn: boolean;
}

export default function Hand({playerHand, yourTurn}:HandType){

    const handleActionClick = useCallback((c: CardType ,i: number) => {
        if(yourTurn){
            if ( c.dmg > 0 ) {
                Rune.actions.healCard({cardId: c.id, cardIndex: i})
            } else {
                Rune.actions.actionCard({cardId: c.id, cardIndex: i})
            }
        }
    },[yourTurn])

    return <section className="hand">
        {
            playerHand?.map((c, i) => <Card key={i} id={c.id} dmg={c.dmg} img={c.img} onDblClick={() => handleActionClick(c,i)}/>)
        }
    </section>
}