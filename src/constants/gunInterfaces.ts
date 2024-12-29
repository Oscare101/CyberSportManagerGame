export type GunName =
  | 'Desert Eagle'
  | 'R8 Revolver'
  | 'Five-SeveN'
  | 'Tec-9'
  | 'CZ75-Auto'
  | 'Dual Berettas'
  | 'P250'
  | 'Glock-18'
  | 'P2000'
  | 'USP-S'
  | 'Galil'
  | 'AK-47'
  | 'M4A1-S'
  | 'M4A4'
  | 'SG 553'
  | 'AUG'
  | 'FAMAS'
  | 'AWP'
  | 'G3SG1'
  | 'SSG 08'
  | 'SCAR-20'
  | 'MAC-10'
  | 'MP9'
  | 'MP7'
  | 'UMP-45'
  | 'P90'
  | 'PP-Bizon';

export type GunSide = 'T' | 'CT' | 'T CT';
export type GunType = 'Rifle' | 'Sniper Rifle' | 'Pistol' | 'SMG';

export interface Gun {
  name: GunName;
  type: GunType;
  price: number;
  killAward: number;
  inaccuracy: number;
  fireRate: number;
  damagePerSecond: number;
  usedBy: GunSide;
  damage: {
    withArmor: {
      head: number;
      chestAndArms: number;
      belly: number;
      legs: number;
    };
    withoutArmor: {
      head: number;
      chestAndArms: number;
      belly: number;
      legs: number;
    };
  };
}
