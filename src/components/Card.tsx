import { CardType } from "../logic"
import "./Card.css"

type ActionType = {
    onDblClick: () => void;
}

type CardHandType = ActionType & CardType

export default function Card({id, dmg, img, onDblClick}: CardHandType) {
    return <div className="card" onDoubleClick={onDblClick}>
        <img className="card-img" src={img}/>
    </div>
}