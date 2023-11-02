import { CardType } from "../logic"
import sword from "../assets/sword.png";
import pot from "../assets/pot.png";
import mace from "../assets/mace.png";
import bow from "../assets/bow.png";
import fireball from "../assets/fireball.png";

import "./Card.css"

const selectImage = (source: string)  => ({
    sword,
    pot,
    mace,
    bow,
    fireball,
}[source])||""

type ActionType = {
    onDblClick: () => void;
}

type CardHandType = ActionType & CardType

export default function Card({ img, onDblClick}: CardHandType) {
    return <div className="card" onDoubleClick={onDblClick}>
        <img className="card-img" src={selectImage(img)}/>
    </div>
}