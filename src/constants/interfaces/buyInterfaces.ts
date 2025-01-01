import {ArmorType} from './armorInterfaces';
import {CTGunName, TGunName} from './gunInterfaces';
import {NadeName} from './nadeInterfaces';

// scenarios for different buys in different cases

export type CustomBuyTypeName = string;

export type BuyTypeNane =
  | 'Full'
  | 'Eco'
  | 'Force'
  | 'Half'
  | 'No'
  | CustomBuyTypeName;

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

export interface BuyType {
  name: BuyTypeNane;
  sniper: RoleBuy;
  rifler: RoleBuy;
  support: RoleBuy;
  captain: RoleBuy;
}

export interface BuyScenarios {
  afterPistolWin: BuyType[];
  afterPistolLose: BuyType[];
  afterWin: BuyType[];
  afterLose: BuyType[];
}
