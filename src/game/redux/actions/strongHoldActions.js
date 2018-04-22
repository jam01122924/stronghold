export const changeResource = data => {
  return {
    type: 'CHANGE_RESOURCE',
    data: {
      resource: data.resource,
      amount: data.amount
    }
  };
};
export const changeResourceMax = data => {
  return {
    type: 'CHANGE_RESOURCE_MAX',
    data: {
      resource: data.resource,
      max: data.max
    }
  };
};

export const changeWorkPosition = data => {
  return {
    type: 'CHANGE_WORK_POSITION',
    data: {
      workPosition: data.workPosition,
      amount: data.amount
    }
  };
};
export const changeWorkPositionMax = data => {
  return {
    type: 'CHANGE_WORK_POSITION_MAX',
    data: {
      workPosition: data.workPosition,
      max: data.max
    }
  };
};

export const changeBuilding = data => {
  return {
    type: 'CHANGE_BUILDING',
    data: {
      building: data.building,
      data: data.data
    }
  };
};


export const changeHeroList = data => {
  return {
    type: 'CHANGE_HERO_LIST',
    data: data
  };
};
