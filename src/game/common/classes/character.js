import CharStatus from './charStatus';

export default class Character {
  constructor(status, name, skills, talent, lv) {
    this.status = new CharStatus(status.s, status.a, status.e, status.i, status.w, lv);
    this.name = name;
    this.skills = skills;
    this.talent = talent;
  }
}
