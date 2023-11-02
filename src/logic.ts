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
  maxHp: number;
  dmg: number;
  crit: number;
  img: string;
};

export type PlayerObj = {
  hp: number;
  hand: CardType[];
  id: string;
};

export interface GameState {
  monsters: MonsterType[];
  cards: CardType[];
  playersObj: Record<string, PlayerObj>;
  turn: string;
  lastDamage: string;
  monsterAttack: boolean;
  hitMonster: boolean;
  monsterZone: number;
  players: Players;
  counter: number;
}

interface Winner {
  [key: string]: number | "WON" | "LOST";
}

type GameActions = {
  actionCard: (params: { cardId: number; cardIndex: number }) => void;
  healCard: (params: { cardId: number; cardIndex: number }) => void;
  monsterAttack: (params: { cardId: number; cardIndex: number }) => void;
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
      monsterAttack: false,
      hitMonster: false,
      lastDamage: "",
      players: {},
      counter: 0,
    };
    for (const playerId of allPlayerIds) {
      if (!game.playersObj[playerId]) {
        game.playersObj[playerId] = { hp: 0, hand: [], id: "" };
        game.playersObj[playerId].hp = 100;
        game.playersObj[playerId].hand = getRandomCards(cards);
        game.playersObj[playerId].id = playerId;
      }
    }
    if (Object.values(game.playersObj).length !== 0) {
      game.turn = Object.values(game.playersObj)[0].id;
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
        game.hitMonster = true;
        game.monsters[game.monsterZone].hp =
          game.monsters[game.monsterZone].hp + card.dmg;
        if (game.monsters[game.monsterZone].hp <= 0) {
          if (game.monsters[game.monsterZone + 1] === undefined) {
            const players: Winner = {};

            Object.values(game.playersObj).forEach((player) => {
              players[player.id] = "WON";
            });

            Rune.gameOver({
              players,
            });
          } else {
            game.monsterZone++;
          }
        }
        if (game.counter == 3) {
          game.counter = 0;
        } else {
          game.counter++;
        }
        game.lastDamage = `${playerId}:${card.dmg}`;
      }
      game.playersObj[playerId].hand[cardIndex] = newRandomCard(cards);
      const playerArray = Object.values(game.playersObj);
      const playerIndex = playerArray.findIndex((p) => p.id === playerId);

      if (playerArray[playerIndex + 1] !== undefined) {
        game.turn = playerArray[playerIndex + 1].id;
      } else {
        game.turn = Object.values(game.playersObj)[0].id;
      }
    },
    healCard: (
      { cardId, cardIndex }: { cardId: number; cardIndex: number },
      { game, playerId }: { game: GameState; playerId: string }
    ) => {
      const card = cards.find((c) => c.id === cardId);
      if (card) {
        game.playersObj[playerId].hp += card.dmg;
        game.lastDamage = "";
        game.playersObj[playerId].hand[cardIndex] = newRandomCard(cards);
        const playerArray = Object.values(game.playersObj);
        const playerIndex = playerArray.findIndex((p) => p.id === playerId);

        if (playerArray[playerIndex + 1] !== undefined) {
          game.turn = playerArray[playerIndex + 1].id;
        } else {
          game.turn = Object.values(game.playersObj)[0].id;
        }
      }
    },
    monsterAttack: (
      { cardId, cardIndex }: { cardId: number; cardIndex: number },
      { game, playerId }: { game: GameState; playerId: string }
    ) => {
      game.monsterAttack = !game.hitMonster ? true : false;
      const players = Object.values(game.playersObj);
      const randomPlayer = [...players?.map((p) => p.id)][
        Math.floor(Math.random() * [...players?.map((p) => p.id)].length)
      ];
      game.playersObj[randomPlayer].hp =
        game.playersObj[randomPlayer].hp - game.monsters[game.monsterZone].dmg;

      if (players.some((p) => p.hp < 0)) {
        Rune.gameOver();
      }
    },
  },
  events: {
    playerJoined: (playerId, { game }) => {
      game.playersObj[playerId] = { hp: 0, hand: [], id: "" };
      game.playersObj[playerId].hp = 100;
      game.playersObj[playerId].hand = getRandomCards(cards);
      game.playersObj[playerId].id = playerId;
    },
    playerLeft: (playerId, { game }) => {
      delete game.playersObj[playerId];
    },
  },
});
