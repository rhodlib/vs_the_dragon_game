import "./CombatSection.css";
import Monster from "./Monster";

export default function CombatSection(){
    return <section className="combat-section">
        <Monster hp={1000} maxHp={1000} damage={5}/>
    </section>
}