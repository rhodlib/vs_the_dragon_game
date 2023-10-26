import "./Monster.css";

type Monster = {
    hp: number;
    maxHp: number;
    dmg: number;
    name: string;
    img: string;
}

export default function Monster({name, hp, maxHp, img , dmg}:Monster){
    return <div className="monster-container">
        <img src={img} className="monster-img"/>
        <div className="monster-status">
            <span className="monster-name">{name}</span>
            <span>{`${hp}/${maxHp}`}</span>
        </div>
    </div>
}