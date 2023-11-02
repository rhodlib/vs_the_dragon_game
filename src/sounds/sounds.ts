import { Howl } from "howler";

export const sounds = {
  hitMonster: new Howl({ src: ["sounds/monster_punch.wav"] }),
  playerPunch: new Howl({ src: ["sounds/player_punch.wav"] }),
  potion: new Howl({ src: ["sounds/potion_drink_long.wav"] }),
};
