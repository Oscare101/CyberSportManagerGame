import { Nade } from './interfaces'

interface NadesData {
  [key: string]: Nade
}

const nades: NadesData = {
  'HE Grenade': {
    type: 'damage',
    name: 'HE Grenade',
    price: 300,
    killAward: 300,
    damage: { withArmor: 57, withoutArmor: 98 },
    delay: 0,
  },
  'Incendiary Grenade': {
    type: 'damage',
    name: 'Incendiary Grenade',
    price: 600,
    killAward: 300,
    damage: { withArmor: 40, withoutArmor: 40 },
    delay: 0,
  },
  Smoke: {
    type: 'damage',
    name: 'Smoke',
    price: 300,
    killAward: 300,
    damage: { withArmor: 0, withoutArmor: 0 },
    delay: 2,
  },
  'Flash Bang': {
    type: 'damage',
    name: 'Flash Bang',
    price: 200,
    killAward: 300,
    damage: { withArmor: 0, withoutArmor: 0 },
    delay: 2,
  },
}

export default nades
