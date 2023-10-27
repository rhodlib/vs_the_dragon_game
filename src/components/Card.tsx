import { CardType } from "../logic"
import "./Card.css"

export default function Card({id, dmg, img}: CardType) {
    return <div className="card">
        <img className="card-img" src={img}/>
    </div>
}