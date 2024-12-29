import {ArmorType} from './armorInterfaces';
import {CTGunName, GunName, TGunName} from './gunInterfaces';
import {NadeName} from './nadeInterfaces';

// scenarios for different buys in different cases

export type BuyType = 'Full' | 'Eco' | 'Force' | 'Half' | 'No';

export interface RoleBuy {
  gun: {
    T: TGunName[];
    CT: CTGunName[];
  };
  armor: ArmorType[];
  nades: {
    minAmount: number;
    nades: NadeName[];
  };
}

export interface Buy {
  name: BuyType;
  sniper: RoleBuy;
  rifler: RoleBuy;
  support: RoleBuy;
  captain: RoleBuy;
}

export interface BuyScenarios {
  afterLose: BuyType[];
  afterWin: BuyType[];
}
