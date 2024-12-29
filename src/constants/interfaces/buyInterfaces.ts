import {ArmorType} from './armorInterfaces';
import {GunName} from './gunInterfaces';
import {NadeName} from './nadeInterfaces';

export type BuyType = 'Full' | 'Eco' | 'Force' | 'Half' | 'No';

export interface Buy {
  name: BuyType;
  sniper: {
    gun: {
      T: GunName[];
      CT: GunName[];
    };
    armor: ArmorType[];
    nades: NadeName[];
  };
  rifler: {
    gun: {
      T: GunName[];
      CT: GunName[];
    };
    armor: ArmorType[];
    nades: NadeName[];
  };
  support: {
    gun: {
      T: GunName[];
      CT: GunName[];
    };
    armor: ArmorType[];
    nades: NadeName[];
  };
  captain: {
    gun: {
      T: GunName[];
      CT: GunName[];
    };
    armor: ArmorType[];
    nades: NadeName[];
  };
}
