import "./Monster.css";
import classNames from 'classnames'

type Monster = {
    hp: number;
    maxHp: number;
    dmg: number;
    name: string;
    img: string;
    monsterAttack: boolean;
    hitMonster: boolean
}

export default function Monster({name, hp, maxHp, img , dmg, monsterAttack, hitMonster}:Monster){
    return <div className="monster-container">
        <img src={img} className={classNames("monster-img", monsterAttack ? "bounce2" : "", hitMonster ? "wobble" : "")}/>
        <div className="monster-status">
            <span className="monster-name">{name}</span>
            <span>{`${hp}/${maxHp}`}</span>
        </div>
    </div>
}