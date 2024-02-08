export interface Gun {
  name: string
  type: string
  price: number
  killAward: number
  inaccuracy: number
  fireRate: number
  damagePerSecond: number
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

export interface InRoundPlayer {
  armor: boolean
  armorHealth: number
  gun: string
  health: number
}

export interface PlayerStat {
  name: string
  role: 'sniper' | 'rifler' | 'support' | 'capitan'
  reaction: number // 0 - inf
  accuracy: number // 0 - 1
  sprayControl: number // 0 - 1
  flicksControl: number // 0 - 1
}
