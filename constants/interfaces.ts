export interface Gun {
  name: string
  type: 'Rifle' | 'Sniper Rifle' | 'Pistol'
  price: number
  killAward: number
  inaccuracy: number
  fireRate: number
  damagePerSecond: number
  usedBy: string
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

export interface Nade {
  name: string
  type: 'damage' | 'delay'
  price: number
  killAward: number
  damage: { withArmor: number; withoutArmor: number }
  delay: number
}

export interface PlayerStatistic {
  role: 'sniper' | 'rifler' | 'support' | 'capitan'
  reaction: number // 0 - inf
  accuracy: number // 0 - 1
  sprayControl: number // 0 - 1
  flicksControl: number // 0 - 1
}

export interface InRoundPlayer {
  kills: number
  assist: number
  death: number
  alive: boolean
  armor: boolean
  cash: number
  gun: string
  nades: string[]
  health: number
  name: string
  team: string
  stat: PlayerStatistic
  //
  totalDamage: number
  roundsWithKAST: number[]
}

export interface Player {
  name: string
  stat: PlayerStatistic
}

export interface Team {
  name: string
  players: Player[]
}

export interface MapResult {
  team1Players: InRoundPlayer[]
  team2Players: InRoundPlayer[]
  team1Score: number
  team2Score: number
  roundWinLogs: string[]
}

export interface MatchResult {
  resultTeam1Players: InRoundPlayer[]
  resultTeam2Players: InRoundPlayer[]
  mapsResultsLog: MapResult[]
}

export interface Tournament {
  season: number
  name: string
  prizes?: any[]
  // winner?: Team | string
  cup: number
  description: string
  grid?: any
  points?: any[]
}
