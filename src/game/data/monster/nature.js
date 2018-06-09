import spritePosition from '../spritePosition';

const natureData = {
  mouse: {
    id: 'monster_nature_mouse',
    name: 'mouse',
    class: 'nature',
    attackType: 'melee',
    attackRange: [1],
    img: ['','','',''],
    status: {
      strength: 3,
      perception: 3,
      endurance: 3,
      charisma: 1,
      intelligence: 1,
      agility: 5,
      luck: 2
    },
    skills: [],
    spriteImg: {
      url: "/imgs/monster/4Dir/001.png", 
      imgPosX: spritePosition[1][0].x, 
      imgPosY: spritePosition[1][0].y
    },
  },
  spider: {
    id: 'monster_nature_spider',
    name: 'spider',
    class: 'nature',
    attackType: 'range',
    attackRange: [2],
    img: ['','','',''],
    status: {
      strength: 2,
      perception: 3,
      endurance: 3,
      charisma: 1,
      intelligence: 1,
      agility: 6,
      luck: 1
    },
    skills: [],
    spriteImg: {
      url: "/imgs/monster/4Dir/001.png", 
      imgPosX: spritePosition[1][2].x, 
      imgPosY: spritePosition[1][2].y, 
    },
  },
  wolf: {
    id: 'monster_nature_wolf',
    name: 'wolf',
    class: 'nature',
    attackType: 'melee',
    attackRange: [1],
    img: ['','','',''],
    status: {
      strength: 4,
      perception: 3,
      endurance: 4,
      charisma: 1,
      intelligence: 1,
      agility: 4,
      luck: 2
    },
    skills: [],
  },
  arrowMouse: {
    id: 'monster_nature_arrowMouse',
    name: 'arrowMouse',
    class: 'nature',
    attackType: 'range',
    attackRange: [2],
    img: ['','','',''],
    status: {
      strength: 1,
      perception: 4,
      endurance: 2,
      charisma: 1,
      intelligence: 1,
      agility: 4,
      luck: 2
    },
    skills: [],
  },
};

export default natureData;
