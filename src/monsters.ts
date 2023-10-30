import slime from "./assets/slime.png";
import skeleton from "./assets/skeleton.png";
import goblin from "./assets/goblin.png";
import dragon from "./assets/dragon.png";
import { MonsterType } from "./logic";

export const monsters: MonsterType[] = [
  {
    name: "Slime",
    hp: 500,
    maxHp: 500,
    dmg: 5,
    crit: 20,
    img: slime,
  },
  {
    name: "Skeleton",
    hp: 800,
    maxHp: 800,
    dmg: 8,
    crit: 15,
    img: skeleton,
  },
  {
    name: "Goblin",
    hp: 1000,
    maxHp: 1000,
    dmg: 10,
    crit: 50,
    img: goblin,
  },
  {
    name: "Dragon",
    hp: 1500,
    maxHp: 1500,
    dmg: 12,
    crit: 20,
    img: dragon,
  },
];
