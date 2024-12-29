import {GunType} from './gunInterfaces';

// scenarios when player will try to save gun

export interface Save {
  '1v1': {
    maxHealth: number;
    gunRequired: GunType[];
  };
  '1v2': {
    maxHealth: number;
    gunRequired: GunType[];
  };
  '1v3': {
    maxHealth: number;
    gunRequired: GunType[];
  };
}
