import {Save} from '../interfaces/tacticsInterfaces';

const saveScenariosDefault: Save = {
  '1v1': {
    maxHealth: 20,
    gunRequired: ['Rifle', 'Sniper Rifle'],
  },
  '1v2': {
    maxHealth: 60,
    gunRequired: ['Rifle', 'Sniper Rifle'],
  },
  '1v3': {
    maxHealth: 0, // TODO think about it
    gunRequired: ['Rifle', 'SMG', 'Sniper Rifle'],
  },
};

export default saveScenariosDefault;
