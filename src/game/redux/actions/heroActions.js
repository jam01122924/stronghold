
export const addHeroToTavern = data => {
  return {
    type: 'ADD_HERO_TO_TAVERN',
    data
  };
};

export const cleanHeroInTavern = () => {
  return {
    type: 'CLEAN_HERO_IN_TAVERN'
  };
};

export const hireHero = data => {
  return {
    type: 'HIRE_HERO',
    index: data
  };
};

export const changeHero = (heroData, index) => {
  return {
    type: 'CHANGE_HERO',
    index: index,
    data: heroData,
  };
};

export const fireHero = (index) => {
  return {
    type: 'FIRE_HERO',
    index: index,
  };
};

export const addHeroToTeam = (data) => {
  return {
    type: 'ADD_HERO_TO_TEAM',
    teamIndex: data.teamIndex,
    hero: data.hero
  };
};

export const removeHeroFromTeam = (data) => {
  return {
    type: 'REMOVE_HERO_FROM_TEAM',
    teamIndex: data.teamIndex,
    hero: data.hero
  };
};
