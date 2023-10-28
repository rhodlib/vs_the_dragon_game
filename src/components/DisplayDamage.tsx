import "./DisplayDamage.css";

export default function DisplayDamage ({displayDmg}: {displayDmg: string}){
    return <div className="dmg-label">{displayDmg}</div>
}