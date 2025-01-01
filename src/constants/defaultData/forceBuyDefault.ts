import {BuyType} from '../interfaces/buyInterfaces';

const fullBuyDefault: BuyType = {
  name: 'Full',
  sniper: {
    gun: {
      T: ['AWP'],
      CT: ['AWP'],
    },
    armor: ['Kevlar + Helmet'],
    nades: {
      minAmount: 3,
      nades: ['Flashbang', 'Hegrenade', 'Flashbang', 'Molotov'],
    },
  },
  rifler: {
    gun: {
      T: ['AK-47'],
      CT: ['M4A4'],
    },
    armor: ['Kevlar + Helmet'],
    nades: {
      minAmount: 3,
      nades: ['Flashbang', 'Hegrenade', 'Flashbang', 'Molotov'],
    },
  },
  support: {
    gun: {
      T: ['AK-47'],
      CT: ['M4A4'],
    },
    armor: ['Kevlar + Helmet'],
    nades: {
      minAmount: 4,
      nades: ['Flashbang', 'Hegrenade', 'Flashbang', 'Molotov', 'Smoke'],
    },
  },
  captain: {
    gun: {
      T: ['AK-47'],
      CT: ['M4A4'],
    },
    armor: ['Kevlar + Helmet'],
    nades: {
      minAmount: 3,
      nades: ['Flashbang', 'Hegrenade', 'Flashbang', 'Molotov'],
    },
  },
};

export default fullBuyDefault;
