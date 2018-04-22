export default class CharStatus {
  constructor(s, a, e, i, w, lv, exp) {
    this.strength = s?s:1;
    this.agile = a?a:1;
    this.endurence = e?e:1;
    this.intelligence = i?i:1;
    this.wisdom = w?w:1;
    this.lv = lv?lv:1;
    this.exp = exp?exp:0;

  }

  calculateStatus() {
    // calculate:
    this.phyAtt = Math.round(this.strength * 2);
    this.magAtt = Math.round(this.intelligence * 2.5);
    this.phyDef = Math.round(this.endurence);
    this.magDef = Math.round((this.wisdom + this.endurence)/2);
    this.maxHp = Math.round(this.endurence * 10);
    this.maxMp = Math.round(this.wisdom * 15);
  }
  recoverStatus() {
    this.curHp = this.maxHp;
    this.curMp = this.maxMp;
  }
}
