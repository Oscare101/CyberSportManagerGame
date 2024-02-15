import guns from '../constants/guns'
import {
  Gun,
  InRoundPlayer,
  MapResult,
  MatchResult,
  Nade,
  Player,
  Team,
} from '../constants/interfaces'
import nades from '../constants/nades'
import rules from '../constants/rules'

function PlayerHitPoint(accuracy: number) {
  return Math.random() >= accuracy
    ? 'miss'
    : Math.random() >= accuracy
    ? 'legs'
    : Math.random() >= accuracy
    ? 'belly'
    : Math.random() >= accuracy
    ? 'chestAndArms'
    : 'head'
}

function PlayerReactionTime(player: InRoundPlayer) {
  return (
    Math.random() *
      (player.stat.reaction * rules.playerReactionTimeMaxKoef -
        player.stat.reaction * rules.playerReactionTimeMinKoef) +
    player.stat.reaction * rules.playerReactionTimeMinKoef
  )
}

function CalculateDamage(
  hitPoint: string,
  gunName: string,
  opponent: InRoundPlayer
) {
  if (hitPoint === 'miss') {
    return 0
  } else {
    if (
      hitPoint === 'head' ||
      hitPoint === 'chestAndArms' ||
      hitPoint === 'belly' ||
      hitPoint === 'legs'
    ) {
      return guns[gunName].damage[
        opponent.armor ? 'withArmor' : 'withoutArmor'
      ][hitPoint]
    } else {
      return 0
    }
  }
}

export function CalculateSide(roundNumber: number) {
  const mainRounds = rules.MRsystem * 2
  const overtimeRounds = rules.MRovertime * 2

  const isMainRound = roundNumber <= mainRounds

  if (isMainRound) {
    return (roundNumber <= mainRounds / 2 ? ['CT', 'T'] : ['T', 'CT']) as
      | ['CT', 'T']
      | ['T', 'CT']
  } else {
    const extraRoundOffset =
      (roundNumber - mainRounds) % overtimeRounds || overtimeRounds
    return (
      extraRoundOffset <= overtimeRounds / 2 ? ['CT', 'T'] : ['T', 'CT']
    ) as ['CT', 'T'] | ['T', 'CT']
  }
}

export function IsSideChangeRound(roundNumber: number) {
  const mainRounds = rules.MRsystem * 2
  const overtimeRounds = rules.MRovertime * 2

  const isMainRound = roundNumber <= mainRounds

  if (isMainRound) {
    return roundNumber % (mainRounds / 2) === 0
  } else {
    const extraRoundOffset =
      (roundNumber - mainRounds) % overtimeRounds || overtimeRounds
    return extraRoundOffset % (overtimeRounds / 2) === 0
  }
}

export function CalculateDPS(
  hitPoint: string,
  gunName: string,
  opponent: InRoundPlayer
) {
  if (hitPoint === 'miss') {
    return 0
  } else {
    if (
      hitPoint === 'head' ||
      hitPoint === 'chestAndArms' ||
      hitPoint === 'belly' ||
      hitPoint === 'legs'
    ) {
      return (
        guns[gunName].damage[opponent.armor ? 'withArmor' : 'withoutArmor'][
          hitPoint
        ] *
        (guns[gunName].fireRate / 60)
      )
    } else {
      return 0
    }
  }
}

export function GetRandomPlayersToExecute(team: InRoundPlayer[]) {
  const alivePlayers = team.filter((player: InRoundPlayer) => player.alive)
  return alivePlayers[Math.floor(Math.random() * alivePlayers.length)]
}

export function TeamAlive(team: InRoundPlayer[]) {
  return team.find((player: InRoundPlayer) => player.alive)
}

export function TeamsAlive(team1: InRoundPlayer[], team2: InRoundPlayer[]) {
  const team1Alive = TeamAlive(team1)
  const team2Alive = TeamAlive(team2)
  return !!(team1Alive && team2Alive)
}

export function PrepareTeam(team: Team, side: string) {
  return team.players.map((player: Player) => {
    return {
      kills: 0,
      assist: 0,
      death: 0,
      totalDamage: 0,
      roundsWithKAST: [],
      alive: true,
      armor: false,
      cash: rules.defaultCash,
      gun: side === 'CT' ? rules.defaultGunCT : rules.defaultGunT,
      nades: [],
      health: 100,
      name: player.name,
      team: team.name,
      stat: {
        role: player.stat.role,
        reaction: player.stat.reaction,
        accuracy: player.stat.accuracy,
        sprayControl: player.stat.sprayControl,
        flicksControl: player.stat.flicksControl,
      },
    } as InRoundPlayer
  })
}

export function NadeUsage(player: InRoundPlayer) {
  const usedNade =
    Math.random() > 0.3
      ? player.nades[Math.floor(Math.random() * player.nades.length)] || ''
      : ''
  return usedNade as string
}

function GetNewNades(player: InRoundPlayer, cash: number) {
  interface newNadesInterface {
    newNades: string[]
    nadesPrice: number
  }

  const shuffle = (array: Nade[]) => {
    return array.sort(() => Math.random() - 0.5)
  }

  const avalableNades = Object.values(nades).filter(
    (nade: Nade) => !player.nades.includes(nade.name)
  )
  const randomAmount = Math.floor(Math.random() * (4 + 1))
  const nadesToBuy = shuffle(avalableNades).slice(0, randomAmount + 1)
  let nadesPrice: number = 0
  let newNades: string[] = []

  if (cash >= rules.cashNadesPurchaseSkip) {
    nadesToBuy.forEach((nade: Nade) => {
      if (cash - nadesPrice >= nade.price * 2) {
        newNades.push(nade.name)
        nadesPrice += nade.price
      }
    })
  }

  return {
    newNades: [...player.nades, ...newNades],
    nadesPrice: nadesPrice,
  } as newNadesInterface
}

function GetNewGun(player: InRoundPlayer, side: string, cash: number) {
  interface newGunInterface {
    newGun: string
    gunPrice: number
  }
  let playerGun: string = player.gun

  const availableGuns = Object.values(guns)
    .filter(
      (gun: Gun) =>
        gun.usedBy.split(' ').includes(side) &&
        gun.price <= cash &&
        ((player.stat.role === 'sniper' && gun.type === 'Sniper Rifle') ||
          (player.stat.role === 'rifler' && gun.type === 'Rifle') ||
          (player.stat.role === 'capitan' && gun.type === 'Rifle') ||
          (player.stat.role === 'support' &&
            gun.damagePerSecond > guns[playerGun].damagePerSecond &&
            gun.type === 'Rifle'))
    )
    .sort(
      (a: Gun, b: Gun) =>
        b.damage.withoutArmor.head - a.damage.withoutArmor.head
    )
  const topGun =
    player.stat.role === 'sniper' && availableGuns.length
      ? availableGuns[0].name !== 'AWP'
        ? Math.random() > 0.5
          ? availableGuns[0]
          : false
        : availableGuns[0]
      : availableGuns[0]
  const chanceOfSkipBuy =
    cash < rules.cashToChanceOfSkipBuyGun && Math.random() > 0.5

  if (
    availableGuns.length &&
    topGun &&
    cash >= topGun.price &&
    playerGun !== topGun.name &&
    (topGun.damage.withArmor.head > guns[playerGun].damage.withArmor.head ||
      (guns[player.gun].type === 'Pistol' && topGun.type !== 'Pistol')) &&
    !chanceOfSkipBuy
  ) {
    return { newGun: topGun.name, gunPrice: topGun.price } as newGunInterface
  } else {
    return { newGun: playerGun, gunPrice: 0 } as newGunInterface
  }
}

function GetNewArmor(player: InRoundPlayer, cash: number) {
  interface newArmorInterface {
    newArmor: boolean
    armorPrice: number
  }

  const chanceOfBuyArmor =
    cash >= rules.armorCost * 3
      ? true
      : cash >= rules.armorCost * 2 && Math.random() > 0.5

  if (chanceOfBuyArmor && !player.armor) {
    return { newArmor: true, armorPrice: rules.armorCost } as newArmorInterface
  } else {
    return { newArmor: player.armor, armorPrice: 0 } as newArmorInterface
  }
}

export function BuyBeforeRound(team: InRoundPlayer[], side: string) {
  const alivePLayers = team.map((player: InRoundPlayer) => {
    let playerCash = player.cash

    const { newArmor, armorPrice } = GetNewArmor(player, playerCash)
    playerCash -= armorPrice
    const { newGun, gunPrice } = GetNewGun(player, side, playerCash)
    playerCash -= gunPrice
    const { newNades, nadesPrice } = GetNewNades(player, playerCash)
    playerCash -= nadesPrice

    return {
      ...player,
      cash: playerCash,
      gun: newGun,
      armor: newArmor,
      nades: newNades,
    }
  })
  return alivePLayers
}

export function SetAlive(
  team: InRoundPlayer[],
  recentRoundNumber: number,
  win: boolean,
  isResetRound: boolean,
  side: string
) {
  const alivePLayers = team.map((player: InRoundPlayer) => {
    let playerCash = isResetRound
      ? recentRoundNumber >= rules.MRsystem
        ? rules.overtimeDefaultCash
        : rules.defaultCash
      : win
      ? player.cash + rules.winnBonus
      : player.cash + rules.lossBonus

    if (playerCash > rules.maxCash) {
      playerCash = rules.maxCash
    }

    return {
      ...player,
      alive: true,
      roundsWithKAST: player.health
        ? [...player.roundsWithKAST, recentRoundNumber]
        : [...player.roundsWithKAST],
      health: rules.maxPlayerHealth,
      cash: playerCash,
      gun: isResetRound
        ? side === 'CT'
          ? rules.defaultGunCT
          : rules.defaultGunT
        : player.gun,
      armor: isResetRound || !player.alive ? false : player.armor,
      nades: isResetRound ? [] : player.nades,
    }
  })
  return alivePLayers
}

export function SprayDuel(
  player1: InRoundPlayer,
  player2: InRoundPlayer,
  damage: number
) {
  const player1Spray = PlayerHitPoint(
    player1.stat.accuracy *
      player1.stat.sprayControl *
      (1 - guns[player1.gun].inaccuracy / 100)
  )
  const player2Spray = PlayerHitPoint(
    player2.stat.accuracy *
      player2.stat.sprayControl *
      (1 - guns[player2.gun].inaccuracy / 100)
  )
  const player1DPS =
    CalculateDPS(player1Spray, player1.gun, player2) *
    player1.stat.accuracy *
    player1.stat.sprayControl *
    (1 - guns[player1.gun].inaccuracy / 100)
  const player2DPS =
    CalculateDPS(player2Spray, player2.gun, player1) *
    player2.stat.accuracy *
    player2.stat.sprayControl *
    (1 - guns[player2.gun].inaccuracy / 100)

  if (player1.health / player2DPS > (player2.health - damage) / player1DPS) {
    const sprayTime = (player2.health - damage) / player1DPS
    const player1DamageTaken = sprayTime * player2DPS
    return [player1.health - player1DamageTaken, 0] as [number, number]
  } else if (
    player1.health / player2DPS <
    (player2.health - damage) / player1DPS
  ) {
    const sprayTime = player1.health / player2DPS
    const player2DamageTaken = sprayTime * player1DPS
    return [0, player2.health - damage - player2DamageTaken] as [number, number]
  } else {
    return [player1.health, player2.health - damage]
  }
}

export function onlyUniqueRounds(value: any, index: any, array: any) {
  return array.indexOf(value) === index
}

export function Duel(
  player1: InRoundPlayer,
  player2: InRoundPlayer,
  player1Nade: string,
  player2Nade: string
) {
  const player1NadeDamage =
    player1Nade && nades[player1Nade].type === 'damage'
      ? nades[player1Nade].damage[
          player2.armor ? 'withArmor' : 'withoutArmor'
        ] * Math.random()
      : 0
  const player2NadeDamage =
    player2Nade && nades[player2Nade].type === 'damage'
      ? nades[player2Nade].damage[
          player1.armor ? 'withArmor' : 'withoutArmor'
        ] * Math.random()
      : 0
  const player1NadeDelay =
    player1Nade && nades[player1Nade].type === 'delay'
      ? nades[player1Nade].delay * Math.random()
      : 0
  const player2NadeDelay =
    player2Nade && nades[player2Nade].type === 'delay'
      ? nades[player2Nade].delay * Math.random()
      : 0

  const player1ReactionTime = +(
    PlayerReactionTime(player1) + player2NadeDelay
  ).toFixed(1)
  const player2ReactionTime = +(
    PlayerReactionTime(player2) + player1NadeDelay
  ).toFixed(1)

  const player1Shot = PlayerHitPoint(
    player1.stat.accuracy *
      (1 - guns[player1.gun].inaccuracy / 100) *
      player1.stat.flicksControl
  )
  const player2Shot = PlayerHitPoint(
    player2.stat.accuracy *
      (1 - guns[player2.gun].inaccuracy / 100) *
      player2.stat.flicksControl
  )
  const player1Damage =
    Math.floor(CalculateDamage(player1Shot, player1.gun, player2)) +
    player1NadeDamage
  const player2Damage =
    Math.floor(CalculateDamage(player2Shot, player2.gun, player1)) +
    player2NadeDamage
  if (player1ReactionTime < player2ReactionTime) {
    if (player1Damage >= player2.health) {
      return [player1.health - (player2NadeDamage * Math.random()) / 2, 0]
    } else {
      if (Math.random() > 0.5) {
        return SprayDuel(player1, player2, player1Damage)
      } else {
        return [player1.health, player2.health - player1Damage]
      }
    }
  } else if (player2ReactionTime < player1ReactionTime) {
    if (player2Damage >= player1.health) {
      return [0, player2.health - (player1NadeDamage * Math.random()) / 2]
    } else {
      if (Math.random() > 0.5) {
        return SprayDuel(player2, player1, player2Damage).reverse()
      } else {
        return [player1.health - player2Damage, player2.health]
      }
    }
  } else {
    return SprayDuel(player1, player2, 0)
  }
}
export interface InstantMatchResultProps {
  team1: InRoundPlayer[]
  team2: InRoundPlayer[]
  score1: number
  score2: number
  overtimes: number
  team1Sideplay: 'CT' | 'T'
  team2Sideplay: 'CT' | 'T'
  winLogs: string[]
  mapsResultsLog: MapResult[]
  bestOfMaps: number
}

export function InstantMatchResults(props: InstantMatchResultProps) {
  let team1Players: InRoundPlayer[] = props.team1
  let team2Players: InRoundPlayer[] = props.team2
  let team1Score: number = props.score1
  let team2Score: number = props.score2
  let overtimeRounds: number = props.overtimes
  let team1Side: 'CT' | 'T' = props.team1Sideplay
  let team2Side: 'CT' | 'T' = props.team2Sideplay
  let roundWinLogs: string[] = props.winLogs
  let mapsResults: MapResult[] = props.mapsResultsLog

  while (true) {
    function ActionBetweenTwoPlayers() {
      const team1PlayerExecute = GetRandomPlayersToExecute(team1Players)
      const team2PlayerExecute = GetRandomPlayersToExecute(team2Players)
      const player1NadeUsage = NadeUsage(team1PlayerExecute)
      const player2NadeUsage = NadeUsage(team2PlayerExecute)
      const [player1Health, player2Health] = Duel(
        team1PlayerExecute,
        team2PlayerExecute,
        player1NadeUsage,
        player2NadeUsage
      )

      team1Players = CalculatePlayersAfterDuel(
        team1Players,
        team1PlayerExecute,
        team2PlayerExecute,
        player1Health,
        player2Health,
        player1NadeUsage,
        team1Score + team2Score + 1,
        team1Side
      )

      team2Players = CalculatePlayersAfterDuel(
        team2Players,
        team2PlayerExecute,
        team1PlayerExecute,
        player2Health,
        player1Health,
        player2NadeUsage,
        team1Score + team2Score + 1,
        team2Side
      )
    }

    function RoundAction() {
      if (TeamsAlive(team1Players, team2Players)) {
        ActionBetweenTwoPlayers()
      } else {
        team1Side = CalculateSide(team1Score + team2Score + 2)[0]
        team2Side = CalculateSide(team1Score + team2Score + 2)[1]

        if (TeamAlive(team1Players)) {
          team1Score = team1Score + 1
          roundWinLogs = [...roundWinLogs, team1Players[0].team]
        } else {
          team2Score = team2Score + 1
          roundWinLogs = [...roundWinLogs, team2Players[0].team]
        }

        const newTeam1Players = SetAlive(
          team1Players,
          team1Score + team2Score,
          !!TeamAlive(team1Players),
          IsSideChangeRound(team1Score + team2Score + 1),
          CalculateSide(team1Score + team2Score + 2)[0]
        )

        const newTeam1PlayersAfterBuy = BuyBeforeRound(
          newTeam1Players,
          CalculateSide(team1Score + team2Score + 2)[0]
        )
        team1Players = newTeam1PlayersAfterBuy
        const newTeam2Players = SetAlive(
          team2Players,
          team1Score + team2Score,
          !!TeamAlive(team2Players),
          IsSideChangeRound(team1Score + team2Score + 1),
          CalculateSide(team1Score + team2Score + 2)[1]
        )
        const newTeam2PlayersAfterBuy = BuyBeforeRound(
          newTeam2Players,
          CalculateSide(team1Score + team2Score + 2)[1]
        )
        team2Players = newTeam2PlayersAfterBuy
      }
    }

    if (
      team1Score < rules.MRsystem + overtimeRounds + 1 &&
      team2Score < rules.MRsystem + overtimeRounds + 1 &&
      team1Score + team2Score < (rules.MRsystem + overtimeRounds) * 2
    ) {
      RoundAction()
    } else {
      if (team1Score === team2Score) {
        overtimeRounds = overtimeRounds + rules.MRovertime
      } else {
        const newMapResult: MapResult = {
          team1Players: team1Players,
          team2Players: team2Players,
          team1Score: team1Score,
          team2Score: team2Score,
          roundWinLogs: roundWinLogs,
        }

        mapsResults.push(newMapResult)
        if (IsMatchWinner(mapsResults, props.bestOfMaps)) {
          break
        } else {
          team1Players = props.team1
          team2Players = props.team2
          team1Score = props.score1
          team2Score = props.score2
          overtimeRounds = props.overtimes
          team1Side = props.team1Sideplay
          team2Side = props.team2Sideplay
          roundWinLogs = []
        }
      }
    }
  }

  return mapsResults
}

export function PrepareForMapResults(
  team1: Team,
  team2: Team,
  bestOfMaps: number
) {
  const team1Players: InRoundPlayer[] = BuyBeforeRound(
    PrepareTeam(team1, CalculateSide(1)[0]),
    CalculateSide(1)[0]
  )

  const team2Players: InRoundPlayer[] = BuyBeforeRound(
    PrepareTeam(team2, CalculateSide(1)[1]),
    CalculateSide(1)[1]
  )

  return {
    team1: team1Players,
    team2: team2Players,
    score1: 0,
    score2: 0,
    overtimes: 0,
    team1Sideplay: CalculateSide(1)[0],
    team2Sideplay: CalculateSide(1)[1],
    winLogs: [],
    mapsResultsLog: [],
    bestOfMaps: bestOfMaps,
  } as InstantMatchResultProps

  // return {
  //   preparedTeam1Players: team1Players,
  //   preparedTeam2Players: team2Players,
  //   preparedScore1: 0,
  //   preparedScore2: 0,
  //   preparedOvertimes: 0,
  //   preparedTeam1Sideplay: CalculateSide(1)[0],
  //   preparedTeam2Sideplay: CalculateSide(1)[1],
  //   preparedWinLogs: [],
  //   preparedMapsResultsLog: [],
  //   preparedBestOfMaps: bestOfMaps,
  // } as {
  //   preparedTeam1Players: InRoundPlayer[]
  //   preparedTeam2Players: InRoundPlayer[]
  //   preparedScore1: number
  //   preparedScore2: number
  //   preparedOvertimes: number
  //   preparedTeam1Sideplay: 'CT' | 'T'
  //   preparedTeam2Sideplay: 'CT' | 'T'
  //   preparedWinLogs: string[]
  //   preparedMapsResultsLog: MapResult[]
  //   preparedBestOfMaps: number
  // }
}

export function CalculateRating(player: InRoundPlayer, rounds: number) {
  const ADR = +(player.totalDamage / rounds).toFixed(2)
  const DPR = player.death / rounds
  const KPR = player.kills / rounds
  const APR = player.assist / rounds
  const KAST = +(
    (player.roundsWithKAST.filter(onlyUniqueRounds).length * 100) /
    rounds
  ).toFixed(1)
  const rating = +(
    (0.0073 * KAST) / 100 +
    (-0.5329 * DPR) / 3 +
    0.86 * KPR +
    APR +
    0.0032 * ADR +
    0.1584
  ).toFixed(2)
  return {
    ADR: ADR,
    DPR: DPR,
    KPR: KPR,
    APR: APR,
    KAST: KAST,
    rating: rating,
  } as {
    ADR: number
    DPR: number
    KPR: number
    APR: number
    KAST: number
    rating: number
  }
}

export function CalculatePlayersAfterDuel(
  team: InRoundPlayer[],
  team1PlayerExecute: InRoundPlayer,
  team2PlayerExecute: InRoundPlayer,
  player1Health: number,
  player2Health: number,
  playerNadeUsage: string,
  roundsAmount: number,
  teamSide: string
) {
  const newTeamPlayers = team.map((player: InRoundPlayer) => {
    if (player === team1PlayerExecute) {
      const suitableGun: 'Rifle' | 'Sniper Rifle' =
        team1PlayerExecute.stat.role === 'sniper' ? 'Sniper Rifle' : 'Rifle'

      return {
        ...player,
        kills:
          player1Health && !player2Health ? player.kills + 1 : player.kills,
        assist:
          player2Health &&
          team2PlayerExecute.health - player2Health >= rules.assistDamageMin
            ? player.assist + 1
            : player.assist,
        death: !player1Health ? player.death + 1 : player.death,
        roundsWithKAST:
          team2PlayerExecute.health - player2Health > rules.assistDamageMin ||
          !player2Health
            ? [...player.roundsWithKAST, roundsAmount]
            : [...player.roundsWithKAST],
        totalDamage:
          player.totalDamage + (team2PlayerExecute.health - player2Health),
        alive: player1Health ? true : false,
        cash:
          player1Health && !player2Health
            ? player.cash + guns[player.gun].killAward > rules.maxCash
              ? rules.maxCash
              : player.cash + guns[player.gun].killAward
            : player.cash,
        health: Math.floor(player1Health),
        gun: !player1Health
          ? teamSide === 'CT'
            ? rules.defaultGunCT
            : rules.defaultGunT
          : !player2Health &&
            suitableGun.includes(guns[team2PlayerExecute.gun].type) &&
            guns[team2PlayerExecute.gun].damage.withoutArmor.head >
              guns[team1PlayerExecute.gun].damage.withoutArmor.head &&
            Math.random() > 0.5
          ? team2PlayerExecute.gun
          : player.gun,
        nades: !player1Health
          ? []
          : playerNadeUsage
          ? player.nades.filter((nade: string) => nade !== playerNadeUsage)
          : player.nades,
      }
    } else {
      return player
    }
  })
  return newTeamPlayers as InRoundPlayer[]
}

export function GetMapsWinners(mapsResults: MapResult[]) {
  const mapWinners = mapsResults.map((map: MapResult) => {
    return map.team1Score > map.team2Score
      ? map.team1Players[0].team
      : map.team2Players[0].team
  })
  return mapWinners
}

export function CalculateMapWonByTeam(mapWinners: string[], team: string) {
  const winAmount = mapWinners.filter((map: string) => map === team).length

  return winAmount
}

export function IsMatchWinner(newMapResults: MapResult[], bestOfMaps: number) {
  const mapWinners = GetMapsWinners(newMapResults)

  if (
    CalculateMapWonByTeam(mapWinners, newMapResults[0].team1Players[0].team) <
      Math.ceil(bestOfMaps / 2) &&
    CalculateMapWonByTeam(mapWinners, newMapResults[0].team2Players[1].team) <
      Math.ceil(bestOfMaps / 2)
  ) {
    return false
  } else {
    return true
  }
}
export function GetMatchWinner(newMapResults: MapResult[]) {
  if (newMapResults.length === 0) {
    return false
  }
  if (
    CalculateMapWonByTeam(
      GetMapsWinners(newMapResults),
      newMapResults[0].team1Players[0].team
    ) >
    CalculateMapWonByTeam(
      GetMapsWinners(newMapResults),
      newMapResults[0].team2Players[0].team
    )
  ) {
    return newMapResults[0].team1Players[0].team
  } else {
    return newMapResults[0].team2Players[0].team
  }
}

export function GetMatchScoreByTeams(newMapResults: MapResult[]) {
  const result: any = {}
  result[`${newMapResults[0].team1Players[0].team}`] = CalculateMapWonByTeam(
    GetMapsWinners(newMapResults),
    newMapResults[0].team1Players[0].team
  )

  result[`${newMapResults[0].team2Players[0].team}`] = CalculateMapWonByTeam(
    GetMapsWinners(newMapResults),
    newMapResults[0].team2Players[0].team
  )
  return result
}

export function NumberOfMap(map: number) {
  return map === 5
    ? '5th'
    : map === 4
    ? '4th'
    : map === 3
    ? '3rd'
    : map === 2
    ? '2nd'
    : '1st'
}

export function PlayerSumStat(
  mapResults: MapResult[],
  teamNumber: number,
  playerName: string
) {
  let playerStat: InRoundPlayer[] = []
  let mapRounds: number[] = []
  mapResults.forEach((map: MapResult) => {
    const mapPlayer: any = map[
      teamNumber === 1 ? 'team1Players' : 'team2Players'
    ].find((playerData: InRoundPlayer) => playerData.name === playerName)
    playerStat.push(mapPlayer)
    mapRounds.push(map.team1Score + map.team2Score)
  })

  const ADR = +(
    playerStat
      .map((stat: InRoundPlayer, index: number) => {
        return CalculateRating(stat, mapRounds[index]).ADR
      })
      .reduce((sum: number, a: number) => sum + a, 0) / playerStat.length
  ).toFixed(1)

  const KAST = +(
    playerStat
      .map((stat: InRoundPlayer, index: number) => {
        return CalculateRating(stat, mapRounds[index]).KAST
      })
      .reduce((sum: number, a: number) => sum + a, 0) / playerStat.length
  ).toFixed(1)

  const rating = +(
    playerStat
      .map((stat: InRoundPlayer, index: number) => {
        return CalculateRating(stat, mapRounds[index]).rating
      })
      .reduce((sum: number, a: number) => sum + a, 0) / playerStat.length
  ).toFixed(2)

  const kills = playerStat.reduce(
    (sum: number, stat: InRoundPlayer) => sum + stat.kills,
    0
  )

  const death = playerStat.reduce(
    (sum: number, stat: InRoundPlayer) => sum + stat.death,
    0
  )

  return {
    ADR: ADR,
    KAST: KAST,
    rating: rating,
    kills: kills,
    death: death,
  } as {
    ADR: number
    KAST: number
    rating: number
    kills: number
    death: number
  }
}
