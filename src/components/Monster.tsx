import "./Monster.css";

type Monster = {
    hp: number;
    maxHp: number;
    damage: number;
}

export default function Monster({hp, maxHp, damage}:Monster){
    return <div className="monster-container">
        <img src="./slime.png" className="monster-img"/>
        <div className="monster-status">
            <span>{`${hp}/${maxHp}`}</span>
        </div>
    </div>
}