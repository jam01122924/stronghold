
export const switchMap = data => {
  return {
    type: 'SWITCH_MAP',
    data: {
      mapID: data
    }
  };
};

export const setMapProps = data => {
  return {
    type: 'SET_MAP_PROPS',
    data: {
      props: data
    }
  };
};

export const changeGrid = data => {
  return {
    type: 'CHANGE_GRID',
    data: {
      targetLayer: data.targetLayer,
      location: data.location,
      gridData: data.gridData
    }
  };
};

export const changeLayer = data => {
  return {
    type: 'CHANGE_LAYER',
    data: {
      mapData: data.data
    }
  };
};

export const selectTexture = (t) => {
  return {
    type: 'CHANGE_SELECT_TEXTURE',
    data: t
  };
}

export const changeClickAction = (action) => {
  return {
    type: 'CHANGE_CLICK_ACTION',
    data: action
  };
}

export const movePosition = data => {
  return {
    type: 'MOVE_POSITION',
    data: {
      x: data.x,
      y: data.y
    }
  };
};

export const generateRandomMap = data => {
  return {
    type: 'GENERATE_RANDOM_MAP',
    data: data
  };
};

export const addMap = data => {
  return {
    type: 'ADD_MAP',
    data: data
  };
};



export const loadMapToLocal = () => {
  return {
    type: 'LOAD_LOCALSTORAGE_MAP'
  };
};
export const saveMapToLocal = () => {
  return {
    type: 'SAVE_LOCALSTORAGE_MAP'
  };
};
