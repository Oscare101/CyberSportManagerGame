export type NadeName = 'Flashbang' | 'Molotov' | 'Smoke' | 'Hegrenade';
export type NadeType = 'damage' | 'delay';

export interface Nade {
  name: NadeName;
  type: NadeType;
  price: number;
  killAward: number;
  damage: {withArmor: number; withoutArmor: number};
  delay: number;
}
