/*jshint esversion: 6 */
import heroServices from '../../services/heroServices/heroServices';

let heroReducerInit = {
  team: [
    {
      index: 0,
      member: [],
    }
  ],
  hired: [],
  inTavern: [
    {
      id: 'heroID0001',
      name: 'Test Hero',
      class: 'warrior',
      lv: 1,
      quality: 'c',
      rate: 0,
      energy: 100,
      status: {
        strength: 10,
        perception: 6,
        endurance: 10,
        charisma: 4,
        intelligence: 4,
        agility: 6,
        luck: 5
      },
      grow: {
        strength: 3,
        perception: 1,
        endurance: 3,
        charisma: 1,
        intelligence: 1,
        agility: 2,
        luck: 2
      },
      extraGrow: {
        strength: 3,
        perception: 1,
        endurance: 3,
        charisma: 1,
        intelligence: 1,
        agility: 2,
        luck: 2
      },
      talent: [],
      faceImg: '',
      mapImg: [],
      equipment: [
        {
          id: 'easdf111',
          class: 'sword',
          type: 'weapon',
          name: 'shortSword',
          weight: 3,
          position: ['rightHand', 'leftHand'],
          quality: 'a',
          weaponPower: 10,
          lv: 4,
          requiredLv: 0,
          bonus: [
            {
              attr: 'endurance',
              num: 4,
            },
            {
              attr: 'strength',
              num: 4,
            },
          ],
        }
      ],
      calculatedStatus: {
        strength: 10,
        perception: 6,
        endurance: 10,
        charisma: 4,
        intelligence: 4,
        agility: 6,
        luck: 5,


        hp: 0,
        maxHp: 0,
        hpRecover: 0,
        hpAbsorb: 0,
        mp: 0,
        maxMp: 0,
        mpRecover: 0,
        mpAbsorb: 0,
        criticalRate: 0,
        criticalDamageTimer: 1.5,
        weaponPower: 20,
        phyMeleeAtt: 0,
        phyRangeAtt: 0,
        phyDef: 0,
        phyAttTimer: 1,
        magAtt: 0,
        magDef: 0,
        magAttTimer: 1,
        healTimer: 1,
        healReceiveTimer: 1,
        movementRange: 3,
        speed: 100,
        speech: 100,
        dodgeRate: 10,
        blockRate: 0,
        parryRate: 0,
      },
    }
  ],
  inGrave: [],
  special: [],
  inAdvanture: [],
  inFarming: [],
  teamSize: 4,
  teamNum: 1,
  advantureFood: 0,
};

const heroReducer = (state = heroReducerInit, action) => {
  switch (action.type) {
    case 'ADD_HERO_TO_TAVERN': {
      let newState = Object.assign({}, state);
      newState.inTavern = state.inTavern.slice(0);
      newState.inTavern.push(action.data);
      return newState;
    }
    case 'CLEAN_HERO_IN_TAVERN': {
      let newState = Object.assign({}, state);
      newState.inTavern = [];
      return newState;
    }
    case 'HIRE_HERO': {
      let newState = Object.assign({}, state);
      newState.inTavern = state.inTavern.slice(0);
      newState.hired.push(Object.assign({}, state.inTavern[action.index]));
      newState.inTavern.splice(action.index, 1);
      return newState;
    }
    case 'CHANGE_HERO': {
      let newState = Object.assign({}, state);
      newState.hired = state.hired.slice(0);
      newState.hired[action.index] = action.data;
      return newState;
    }
    case 'FIRE_HERO': {
      let newState = Object.assign({}, state);
      newState.hired = state.hired.slice(0);
      newState.hired.splice(action.index, 1);
      return newState;
    }
    case 'ADD_HERO_TO_TEAM': {
      let newState = Object.assign({}, state);
      newState.team = state.team.slice(0);
      newState.team[action.teamIndex].member = state.team[action.teamIndex].member.slice(0);
      newState.team[action.teamIndex].member.push(action.hero);
      return newState;
    }
    case 'REMOVE_HERO_FROM_TEAM': {
      let newState = Object.assign({}, state);
      newState.team = state.team.slice(0);
      newState.team[action.teamIndex].member = state.team[action.teamIndex].member.slice(0);
      let index = heroServices.getHeroIndexById(newState.team[action.teamIndex].member, action.hero.id);
      newState.team[action.teamIndex].member.splice(index, 1);
      return newState;
    }
    case 'ADD_NEW_TEAM': {
      let newState = Object.assign({}, state);
      newState.team = state.team.slice(0);
      newState.team.push({
        index: newState.team.length,
        member: [],
      });
      newState.teamNum++;
      return newState;
    }
    case 'SEND_HERO_TO_ADVANTURE': {
      let newState = Object.assign({}, state);
      newState.inAdvanture.push(action.data);
      return newState;
    }

    default:
      return state;
  }
};

export default heroReducer;
