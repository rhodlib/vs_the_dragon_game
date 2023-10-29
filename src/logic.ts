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
}

interface Winner {
  [key: string]: number | "WON" | "LOST";
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
      monsterAttack: false,
      hitMonster: false,
      lastDamage: "",
      players: {},
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
        if (card.dmg > 0) {
          game.playersObj[playerId].hp += card.dmg;
          game.lastDamage = "";
        } else {
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
  update: ({ game, allPlayerIds }) => {
    if ((Rune.gameTime() / 1000) % 5 === 0) {
      game.monsterAttack = !game.hitMonster ? true : false;
      const playerId =
        allPlayerIds[Math.floor(Math.random() * allPlayerIds.length)];
      game.playersObj[playerId].hp =
        game.playersObj[playerId].hp - game.monsters[game.monsterZone].dmg;

      const players = Object.values(game.playersObj);
      if (players.some((p) => p.hp < 0)) {
        Rune.gameOver();
      }
    } else {
      game.monsterAttack = false;
      game.hitMonster = false;
    }
  },
});
