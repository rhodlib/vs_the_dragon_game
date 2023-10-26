import "./Hand.css";
import Card from "./Card";
import { CardType } from "../logic";

type HandType = {
    cards:  CardType[]
}

export default function Hand({cards}:HandType){
    return <section className="hand">
        {
            cards?.map(c => <Card key={c.name} name={c.name} dmg={c.dmg} img={c.img}/>)
        }
    </section>
}