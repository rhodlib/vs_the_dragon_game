import "./Monster.css";
import slime from '../assets/slime.png';
import skeleton from '../assets/skeleton.png';
import goblin from '../assets/goblin.png';
import dragon from '../assets/dragon.png';

import classNames from 'classnames'

const selectMonster = (monster: string) => ({
    slime,
    skeleton,
    goblin,
    dragon,
}[monster]||"")

type Monster = {
    hp: number;
    maxHp: number;
    dmg: number;
    name: string;
    img: string;
    monsterAttack: boolean;
    hitMonster: boolean
}

export default function Monster({name, hp, maxHp, img , monsterAttack, hitMonster}:Monster){
    return <div className="monster-container">
        <img src={selectMonster(img)} className={classNames("monster-img", monsterAttack ? "bounce2" : "", hitMonster ? "wobble" : "")}/>
        <div className="monster-status">
            <span className="monster-name">{name}</span>
            <span>{`${hp}/${maxHp}`}</span>
        </div>
    </div>
}