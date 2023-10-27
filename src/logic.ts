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
  actionCard: (params: { cardId: number; cardIndex: number }) => void;
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

function newRandomCard(cards: CardType[]) {
  return cards[Math.floor(Math.random() * cards.length)];
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
  actions: {
    actionCard: (
      { cardId, cardIndex }: { cardId: number; cardIndex: number },
      { game, playerId }: { game: GameState; playerId: string }
    ) => {
      const card = cards.find((c) => c.id === cardId);
      if (card) {
        if (card.dmg > 0) {
          game.playersObj[playerId].hp += card.dmg;
        } else {
          game.monsters[game.monsterZone].hp =
            game.monsters[game.monsterZone].hp + card.dmg;
          if (game.monsters[game.monsterZone].hp <= 0) {
            game.monsterZone++;
          }
        }
        game.playersObj[playerId].hand[cardIndex] = newRandomCard(cards);
      }
    },
  },
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
