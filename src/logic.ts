import type { Players, RuneClient } from "rune-games-sdk/multiplayer";
import monsters from "./monsters.json";

export type MonsterType = {
  name: string;
  hp: number;
  dmg: number;
  crit: number;
  img: string;
};

export interface GameState {
  monsters: MonsterType[];
  playersHp: Record<string, number>;
  turn: string;
  monsterZone: number;
  players: Players;
}

type GameActions = {
  //increment: (params: { amount: number }) => void;
};

declare global {
  const Rune: RuneClient<GameState, GameActions>;
}

Rune.initLogic({
  minPlayers: 2,
  maxPlayers: 4,
  setup: (allPlayerIds: string[]): GameState => {
    const game: GameState = {
      monsters,
      playersHp: {},
      turn: "",
      monsterZone: 0,
      players: {},
    };
    for (const playerId of allPlayerIds) {
      game.playersHp[playerId] = 100;
    }
    return game;
  },
  actions: {},
});
