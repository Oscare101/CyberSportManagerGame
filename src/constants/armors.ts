import {Armor, ArmorType} from './interfaces/armorInterfaces';

const armors: Record<ArmorType, Armor> = {
  Kevlar: {
    name: 'Kevlar',
    price: 650,
  },
  'Kevlar + Helmet': {
    name: 'Kevlar + Helmet',
    price: 1000,
  },
};

export default armors;
