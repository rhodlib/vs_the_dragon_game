import type { RuneClient } from "rune-games-sdk/multiplayer";

export interface GameState {
  count: number;
  players: string[];
}

type GameActions = {
  increment: (params: { amount: number }) => void;
};

declare global {
  const Rune: RuneClient<GameState, GameActions>;
}

export function getCount(game: GameState) {
  return game.count;
}

Rune.initLogic({
  minPlayers: 2,
  maxPlayers: 4,
  setup: (allPlayersIds: string[]): GameState => {
    return { players: allPlayersIds, count: 0 };
  },
  actions: {
    increment: ({ amount }, { game }) => {
      game.count += amount;
    },
  },
});
