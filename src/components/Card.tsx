import { CardType } from "../logic"
import "./Card.css"

export default function Card({name, dmg, img}: CardType) {
    return <div className="card">
        <p className="card-name">{name}</p>
        <img className="card-img" src={img}/>
        <p className="card-dmg">{dmg}</p>
    </div>
}