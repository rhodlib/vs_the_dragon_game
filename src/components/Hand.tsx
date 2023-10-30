import "./Hand.css";
import Card from "./Card";
import { CardType } from "../logic";
import { useEffect, useState } from "react";
import potionDrink from "../assets/potion_drink_long.wav";
import playerPunch from "../assets/player_punch.wav";


type HandType = {
    playerHand:  CardType[];
    yourTurn: boolean;
}

export default function Hand({playerHand, yourTurn}:HandType){
    const [activeSound, setActiveSound] = useState("");

    const onDoubleClick = (id: number, index: number, dmg: number) => {
        yourTurn && Rune.actions.actionCard({cardId: id, cardIndex: index})
        if(dmg < 0){
            setActiveSound("punch");
        }else{
            setActiveSound("pot")
        }
    }

    useEffect(() => {
        setTimeout(() => {
            setActiveSound("")
        },1500)
    },[activeSound])

    return <section className="hand">
        {
            playerHand?.map((c, i) => <Card key={i} id={c.id} dmg={c.dmg} img={c.img} onDblClick={() => onDoubleClick(c.id, i, c.dmg)}/>)
        }
        {activeSound === "pot" && <audio src={potionDrink} autoPlay></audio>}
        {activeSound === "punch" && <audio src={playerPunch} autoPlay></audio>}
    </section>
}