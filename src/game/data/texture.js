const textureData = {
  terrain: [
    {
      name: 'terrain',
      data: ['mud', 'dryMud', 'sand', 'grass', 'stone', 'ice', 'fire'],
      move: [1, 1, 2, 1, 1, 3, 4],
      value: [0, 0, 0, 0, 0, 0, 0],
    },
  ],
  geomorphology: [
    {
      name: 'tree',
      data: ['tree-plain', 'tree-grassland', 'tree-forest', 'tree-mountain', 'tree-swamp-1', 'tree-swamp-2', 'tree-swamp-3', 'tree-desert', 'tree-burned'],
      move: ['noPass', 'noPass', 'noPass', 'noPass', 'noPass', 'noPass', 'noPass', 'noPass', 'noPass'],
      value: [0,0,0,0,0,0,0,0,0],
    },
    {
      name: 'water-shallow',
      data: ['water-shallow', 'water-shallow-left-edge', 'water-shallow-right-edge', 'water-shallow-top-edge', 'water-shallow-bottom-edge', 'water-shallow-top-left', 'water-shallow-top-right', 'water-shallow-bottom-left', 'water-shallow-bottom-right'],
      move: [1,1,1,1,1,1,1,1,1],
      value: [0,0,0,0,0,0,0,0,0],
    },

    {
      name: 'water-deep',
      data: ['water-deep', 'water-deep-left-edge', 'water-deep-right-edge', 'water-deep-top-edge', 'water-deep-bottom-edge', 'water-deep-top-left', 'water-deep-top-right', 'water-deep-bottom-left', 'water-deep-bottom-right'],
      move: ['noPass', 'noPass', 'noPass', 'noPass', 'noPass', 'noPass', 'noPass', 'noPass', 'noPass'],
      value: [0,0,0,0,0,0,0,0,0],
    }
  ],
  building: [
    {
      name: '1 grid house',
      data: ['building-house-stone1', 'building-house-stone2', 'building-house-stone3',
        'building-house-wood1', 'building-house-wood2', 'building-house-wood3', 'building-house-wood4', 'building-house-wood5', 'building-house-wood6',
      ],
      move: [0,0,0,0,0,0,0,0,0],
      value: [0,0,0,0,0,0,0,0,0],
    },
    {
      name: '2 grid village',
      data: ['building-village2-1', 'building-village2-2', 'building-village2-3', 'building-village2-4', 'building-village2-5', 'building-village2-6', 'building-village2-7', 'building-village2-8',],
      move: [0,0,0,0,0,0,0,0,0],
      value: [0,0,0,0,0,0,0,0,0],
    },
    {
      name: '1 grid village',
      data: ['building-village1-1', 'building-village1-2', 'building-village1-3', 'building-village1-4',],
      move: [0,0,0,0,0,0,0,0,0],
      value: [0,0,0,0,0,0,0,0,0],
    },
    {
      name: '4 grid fort',
      data: ['building-fort-1-1', 'building-fort-1-2', 'building-fort-1-3', 'building-fort-1-4',
        'building-fort-2-1', 'building-fort-2-2', 'building-fort-2-3', 'building-fort-2-4',
        'building-fort-3-1', 'building-fort-3-2', 'building-fort-3-3', 'building-fort-3-4',
        'building-fort-4-1', 'building-fort-4-2', 'building-fort-4-3', 'building-fort-4-4',
      ],
      move: [0,0,0,0,0,0,0,0,0],
      value: [0,0,0,0,0,0,0,0,0],
    },

    {
      name: 'road',
      data: ['road-L-R', 'road-L-T', 'road-L-B', 'road-T-B', 'road-T-R', 'road-B-R', 'road-L-T-R', 'road-L-T-B', 'road-L-B-R', 'road-T-B-R', 'road-L-T-B-R'],

      move: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
      value: [0,0,0,0,0,0,0,0,0,0,0],
    }
  ],
  monster: [
    {
      name: 'monster',
      data: ['tree-green', 'tree-yellow'],
    }
  ],
  item: [
    {
      name: 'treasure',
      data: ['tree-green', 'tree-yellow']
    }
  ],
};

export default textureData;
