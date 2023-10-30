import sword from "./assets/sword.png";
import pot from "./assets/pot.png";
import mace from "./assets/mace.png";
import bow from "./assets/bow.png";
import fireball from "./assets/fireball.png";
import { CardType } from "./logic";

export const cards: CardType[] = [
  {
    id: 0,
    dmg: -8,
    img: sword,
  },
  {
    id: 1,
    dmg: 10,
    img: pot,
  },
  {
    id: 2,
    dmg: -10,
    img: mace,
  },
  {
    id: 2,
    dmg: -12,
    img: bow,
  },
  {
    id: 2,
    dmg: -15,
    img: fireball,
  },
];
