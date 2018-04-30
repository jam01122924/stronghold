const heroServices = {
  createRandomHero: createRandomHero,
  getExpRequired: getExpRequired,
  getExpGained: getExpGained,
};



function createRandomHero() {
  let id = '_' + Math.random().toString(36).substr(2, 9);
  // ......
}

function getExpRequired(lv) {
  return 30*(lv*lv*lv + 5*lv) - 80;
}

function getExpGained(monsterLv, monsterExp, playerLv) {
  return Math.floor(monsterLv * monsterExp/playerLv);
}
