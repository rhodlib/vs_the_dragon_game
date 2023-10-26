import { MonsterType } from "../logic";
import "./CombatSection.css";
import Monster from "./Monster";

type CombatSection = {
    monsterZone: number;
    monsters: MonsterType[];
}

export default function CombatSection({monsterZone, monsters}:CombatSection){
    const monster = monsters[monsterZone]
    return <section className="combat-section">
        <Monster name={monster.name} img={monster.img} hp={monster.hp} maxHp={monster.hp} dmg={monster.dmg}/>
    </section>
}