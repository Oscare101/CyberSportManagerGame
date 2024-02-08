export interface Gun {
  name: string
  type: string
  price: number
  killAward: number
  inaccuracy: number
  fireRate: number
  DamagePerSecond: number
  damage: {
    withArmor: {
      head: number
      chestAndArms: number
      belly: number
      legs: number
    }
    withoutArmor: {
      head: number
      chestAndArms: number
      belly: number
      legs: number
    }
  }
}
