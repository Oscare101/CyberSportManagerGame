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

export interface PlayerStatistic {
  role: 'sniper' | 'rifler' | 'support' | 'capitan'
  reaction: number // 0 - inf
  accuracy: number // 0 - 1
  sprayControl: number // 0 - 1
  flicksControl: number // 0 - 1
  agression: number // 0 - 1
}

export interface InRoundPlayer {
  kills: number
  assist: number
  death: number
  alive: boolean
  armor: boolean
  cash: number
  gun: string
  health: number
  name: string
  team: string
  stat: PlayerStatistic
}

export interface Player {
  name: string
  stat: PlayerStatistic
}

export interface Team {
  name: string
  players: Player[]
}
