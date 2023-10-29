import { MonsterType } from "../logic";
import "./CombatSection.css";
import DisplayDamage from "./DisplayDamage";
import {useState, useEffect} from "react";
import Monster from "./Monster";

type CombatSection = {
    monsterZone: number;
    monsters: MonsterType[];
    displayDmg: string;
    monsterAttack: boolean;
    hitMonster: boolean;
}

export default function CombatSection({monsterZone, monsters, displayDmg, monsterAttack, hitMonster}:CombatSection){
    const monster = monsters[monsterZone]

    const [showDmg, setShowDmg] = useState(false)

    useEffect(() => {
        if(displayDmg){
            setShowDmg(true);
        }else {
            setShowDmg(false);
        }
    },[displayDmg])

    useEffect(() => {
        if(showDmg){
            setTimeout(() => {
                setShowDmg(false)
            }, 1000)
        }
    },[showDmg])

    return <section className="combat-section">
        <Monster hitMonster={hitMonster} monsterAttack={monsterAttack} name={monster.name} img={monster.img} hp={monster.hp} maxHp={monster.hp} dmg={monster.dmg}/>
        {showDmg && <DisplayDamage displayDmg={displayDmg}/>}
    </section>
}