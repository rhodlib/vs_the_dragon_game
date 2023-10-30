import "./Player.css";

export default function Player({avatar="../avatar.png", name="Prueba", hp = 100, maxHp = 100, turn = false}){
    return <div className="player">
        <img src={avatar} className="avatar"></img>
        <div className="status">
            <div>{name}</div>
            <div>{`${hp}/${maxHp}`}</div>
        </div>
        {
            turn && <img src="../assets/turn.png" className="turn"></img>
        }
    </div>
}