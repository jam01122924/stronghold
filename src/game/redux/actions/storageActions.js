export const changeSoul = data => {
  return {
    type: 'CHANGE_SOUL',
    data
  };
};
export const addItem = data => {
  return {
    type: 'ADD_ITEM',
    target: data.target,
    data: data.data,
    itemType: data.itemType,
    amount: data.amount?data.amount:1
  };
};
export const removeItem = data => {
  return {
    type: 'REMOVE_ITEM',
    target: data.target,
    id: data.id,
    itemType: data.itemType,
    amount: data.amount?data.amount:1
  };
};

export const collectItemFromBagToStorage = () => {
  return {
    type: 'COLLECT_ITEM_FROM_BAG_TO_STORAGE',
  };
};

export const changeInventorySize = data => {
  return {
    type: 'CHANGE_INVENTORY_SIZE',
    target: data.target,
    data: data.data
  };
};
