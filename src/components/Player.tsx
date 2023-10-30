import "./Player.css";
import avatarDefault from "../assets/avatar.png"
import turnImage from "../assets/turn.png"

export default function Player({avatar=avatarDefault, name="Prueba", hp = 100, maxHp = 100, turn = false}){
    return <div className="player">
        <img src={avatar} className="avatar"></img>
        <div className="status">
            <div>{name}</div>
            <div>{`${hp}/${maxHp}`}</div>
        </div>
        {
            turn && <img src={turnImage} className="turn"></img>
        }
    </div>
}