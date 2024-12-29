import {Nade, NadeName} from './interfaces/nadeInterfaces';

const nades: Record<NadeName, Nade> = {
  Hegrenade: {
    type: 'damage',
    name: 'Hegrenade',
    price: 300,
    killAward: 300,
    damage: {withArmor: 57, withoutArmor: 98},
    delay: 0,
  },
  Molotov: {
    type: 'damage',
    name: 'Molotov',
    price: 600,
    killAward: 300,
    damage: {withArmor: 40, withoutArmor: 40},
    delay: 0,
  },
  Smoke: {
    type: 'damage',
    name: 'Smoke',
    price: 300,
    killAward: 300,
    damage: {withArmor: 0, withoutArmor: 0},
    delay: 2,
  },
  Flashbang: {
    type: 'damage',
    name: 'Flashbang',
    price: 200,
    killAward: 300,
    damage: {withArmor: 0, withoutArmor: 0},
    delay: 2,
  },
};

export default nades;
