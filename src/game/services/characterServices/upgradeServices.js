/*jshint esversion: 6 */
const upgradeServices = {
  getExpRequired: getExpRequired,
  getExpGained: getExpGained,
};

function getExpRequired(lv) {
  return 30*(lv*lv*lv + 5*lv) - 80;
}

function getExpGained(monsterLv, monsterExp, playerLv) {
  return Math.floor(monsterLv * monsterExp/playerLv);
}
