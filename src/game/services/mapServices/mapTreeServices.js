import mapCommonServices from './mapCommonServices';

const mapTreeServices = {
  generate: generate,
};

function generate(sizeX, sizeY, config, result) {
  console.log('start generate tree', result);
  let gridAmount = 0;  // How big each water pool could be
  let gridNum = 0; // How many water pool on the map
  let mapSize = sizeX + sizeY;
  let type = 'tree-plain';

  switch(config) {
    case 'plain': gridAmount=0.2; gridNum=0.3; type='tree-plain'; break;
    case 'grassland': gridAmount=0.2; gridNum=0.3; type='tree-grassland'; break;
    case 'forest': gridAmount=0.4; gridNum=0.3; type='tree-forest'; break;
    case 'swamp': gridAmount=0.1; gridNum=0.5; type='tree-swamp'; break;
    case 'snowland': gridAmount=0.2; gridNum=0.2; type='tree-mountain'; break;
    case 'desert': gridAmount='single'; gridNum=0.3; type='tree-desert'; break;
    case 'mountain': gridAmount=0.2; gridNum=0.2; type='tree-mountain'; break;
    case 'volcanic': gridAmount='single'; gridNum=0.3; type='tree-burned'; break;
    default: gridAmount=0.2; gridNum=0.3; type='tree-plain'; break;
  }

  console.log('Tree Num:', gridAmount, gridNum);
  gridNum = Math.floor(gridNum*mapSize);

  let treeArray = [];

  for(let i=0; i<gridNum; i++) {
    let gridAmountNum;
    if(gridAmount==='single'){
      gridAmountNum = 1;
    } else {
      gridAmountNum = Math.floor(gridAmount*mapSize) + Math.floor(Math.random() * 4)-2;
    }

    treeArray.push({
      amount: Math.round(gridAmountNum),
      config: {
        verticalRate: 0.5,
        isEdge: false,
        isIsolated: false,      // how to find empty grid. cross/round/false
        exception: [],          // exceptions for isolation detect,
        type:  'geomorphology',
        texture: type,
        move: 'noPass',
        value: "0"
      }
    });
  }

  console.log('Generating Tree...');
  // shallow water should be round isolated from sea:
  let startPointArray = mapCommonServices.getAllEmptyGrid(result, 'geomorphology');
  console.log('avaliable grid for tree:', startPointArray);
  treeArray.forEach(conf=>{
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


export default mapTreeServices;
