import mapCommonServices from './mapCommonServices';

const mapWaterServices = {
  generate: generate,
};

function generate(sizeX, sizeY, water, sea, result) {
  console.log('start generate water', result);
  let waterGridAmount = 0;  // How big each water pool could be
  let waterNum = 0; // How many water pool on the map
  let seaGridAmount = 0;  // How big each sea could be
  let seaNum = 0; // How many sea grid on the map
  let mapSize = sizeX + sizeY;

  switch(sea) {
    case 'none': seaGridAmount=0; seaNum=0; break;
    case 'little': seaGridAmount=0.3; seaNum=0.02; break;
    case 'some': seaGridAmount=0.3; seaNum=0.04; break;
    case 'plenty': seaGridAmount=0.3; seaNum=0.08; break;
    case 'lots': seaGridAmount=0.4; seaNum=0.18; break;
    case 'flooded': seaGridAmount=0.4; seaNum=0.3; break;
    default: seaGridAmount=0.3; seaNum=0.2; break;
  }
  switch(water) {
    case 'none': waterGridAmount=0; waterNum=0; break;
    case 'little': waterGridAmount=0.15; waterNum=0.09; break;
    case 'some': waterGridAmount=0.15; waterNum=0.16; break;
    case 'plenty': waterGridAmount=0.15; waterNum=0.18; break;
    case 'lots': waterGridAmount=0.2; waterNum=0.22; break;
    case 'flooded': waterGridAmount=0.2; waterNum=0.3; break;
    default: waterGridAmount=0.15; waterNum=0.16; break;
  }
  console.log('Sea Num:', seaGridAmount, seaNum);
  console.log('Water Num:', waterGridAmount, waterNum);
  seaNum = Math.floor(seaNum*mapSize);
  waterNum = Math.floor(waterNum*mapSize);

  // record status of each edge:
  let edgeState = {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  };
  let oceanConfigArray = [];
  let lakeConfigArray = [];

  console.log('mapSize:', mapSize);
  console.log('waterNum:', waterNum);

  for(let i=0; i<seaNum; i++) {
    let seaGridAmountNum = Math.floor(seaGridAmount*mapSize) + Math.floor(Math.random() * 4)-2;
    let isVertical = false;

    let edgeSide = Math.random();
    edgeSide = edgeSide<0.25?'top':edgeSide<0.5?'right':edgeSide<0.75?'bottom':'left';
    // console.log(edgeSide);

    // get start grid, then start to expand
    let startPoint = {x: 0, y: 0};
    switch(edgeSide) {
      case 'top':
        startPoint.y = 0 + edgeState.top;
        startPoint.x = Math.floor(Math.random()*sizeX);
        isVertical = false;
        edgeState.top++;
      break;
      case 'bottom':
        startPoint.y = sizeY-1-edgeState.bottom;
        startPoint.x = Math.floor(Math.random()*sizeX);
        isVertical = false;
        edgeState.bottom++;
      break;
      case 'left':
        startPoint.y = Math.floor(Math.random()*sizeY);
        startPoint.x = 0 + edgeState.left;
        isVertical = true;
        edgeState.left++;
      break;
      case 'right':
        startPoint.y = Math.floor(Math.random()*sizeY);
        startPoint.x = sizeX-1-edgeState.right;
        isVertical = true;
        edgeState.right++;
      break;
      default:
        startPoint.y = sizeY-1-edgeState.bottom;
        startPoint.x = Math.floor(Math.random()*sizeX);
        isVertical = false;
        edgeState.bottom++;
      break;
    }

    // console.log(startPoint, result);

    oceanConfigArray.push({
      startPoint: startPoint,
      amount: seaGridAmountNum,  // reduce lake size to 1/2 of sea size
      config: {
        verticalRate: isVertical?1:0,
        isEdge: true,
        type:  'geomorphology',
        texture: 'water-deep',
        move: 2,
        value: "0"
      }
    });
  }

  for(let i=0; i<waterNum; i++) {
    let waterGridAmountNum = Math.floor(waterGridAmount*mapSize) + Math.floor(Math.random() * 4)-2;
    let waterType = 'water-shallow';

    lakeConfigArray.push({
      amount: Math.round(waterGridAmountNum),
      config: {
        verticalRate: 0.5,
        isEdge: false,
        isIsolated: 'round',        // how to find empty grid. cross/round/false
        exception: ['water-shallow'], // exceptions for isolation detect
        type:  'geomorphology',
        texture: waterType,
        move: (waterType==='water-deep'?2:1),
        value: "0"
      }
    });
    // console.log(oceanConfigArray, lakeConfigArray);

  }
  // fill deep water first
  console.log('Generating Sea...');
  oceanConfigArray.forEach(conf=>{
    mapCommonServices.expand(conf.startPoint, conf.amount, result, conf.config);
  });
  console.log('Generating Water...');
  // shallow water should be round isolated from sea:
  let startPointArray = mapCommonServices.getAllIsolatedGrid(result, 'geomorphology', false);
  lakeConfigArray.forEach(conf=>{
    //find start point that is still empty:
    let found = false;
    let startPointIndex, startPoint;
    while(!found && startPointArray.length) {
      startPointIndex = Math.floor(Math.random()*startPointArray.length);
      if(!result[startPointArray[startPointIndex].y][startPointArray[startPointIndex].x].geomorphology){
        found = true;
        startPoint = startPointArray[startPointIndex];
      }
      startPointArray.splice(startPointIndex, 1);
    }

    // console.log("startPoint for water-shallow", result, startPointArray);
    mapCommonServices.expand(startPoint, conf.amount, result, conf.config);
  });

  return result;
}


export default mapWaterServices;
