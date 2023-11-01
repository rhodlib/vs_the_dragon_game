const sounds = {
  hitMonster: new Audio("sounds/monster_punch.wav"),
  playerPunch: new Audio("sounds/player_punch.wav"),
  potion: new Audio("sounds/potion_drink_long.wav"),
};

export const playSound = (name: keyof typeof sounds) => {
  const sound = sounds[name];
  try {
    sound.play();
  } catch (_e) {
    // Sounds may be blocked by browser
  }
};
