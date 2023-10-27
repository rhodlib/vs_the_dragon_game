import type { Players, RuneClient } from "rune-games-sdk/multiplayer";
import monsters from "./monsters.json";
import cards from "./cards.json";

export type CardType = {
  id: number;
  dmg: number;
  img: string;
};

export type MonsterType = {
  name: string;
  hp: number;
  dmg: number;
  crit: number;
  img: string;
};

export type PlayerObj = {
  hp: number;
  hand: CardType[];
};

export interface GameState {
  monsters: MonsterType[];
  cards: CardType[];
  playersObj: Record<string, PlayerObj>;
  turn: string;
  monsterZone: number;
  players: Players;
}

type GameActions = {
  //increment: (params: { amount: number }) => void;
};

function getRandomCards(cards: CardType[]) {
  const newHand: CardType[] = [];
  let cardCounter = 0;
  while (cardCounter < 3) {
    newHand.push(cards[Math.floor(Math.random() * cards.length)]);
    cardCounter++;
  }
  return newHand;
}

declare global {
  const Rune: RuneClient<GameState, GameActions>;
}

Rune.initLogic({
  minPlayers: 2,
  maxPlayers: 4,
  setup: (allPlayerIds: string[]): GameState => {
    const game: GameState = {
      monsters,
      cards,
      playersObj: {},
      turn: "",
      monsterZone: 0,
      players: {},
    };
    for (const playerId of allPlayerIds) {
      game.playersObj[playerId] = { hp: 0, hand: [] };
      game.playersObj[playerId].hp = 100;
      game.playersObj[playerId].hand = getRandomCards(cards);
    }
    return game;
  },
  actions: {},
  events: {
    playerJoined: (playerId, { game }) => {
      game.playersObj[playerId] = { hp: 0, hand: [] };
      game.playersObj[playerId].hp = 100;
      game.playersObj[playerId].hand = getRandomCards(cards);
    },
    playerLeft: (playerId, { game }) => {
      delete game.playersObj[playerId];
    },
  },
});
