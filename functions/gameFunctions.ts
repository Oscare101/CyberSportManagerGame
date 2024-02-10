import guns from '../constants/guns'
import { Gun, InRoundPlayer, Nade, Player, Team } from '../constants/interfaces'
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
    return roundNumber <= mainRounds / 2 ? ['CT', 'T'] : ['T', 'CT']
  } else {
    const extraRoundOffset =
      (roundNumber - mainRounds) % overtimeRounds || overtimeRounds
    return extraRoundOffset <= overtimeRounds / 2 ? ['CT', 'T'] : ['T', 'CT']
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
      cash: 1000,
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
        agression: player.stat.agression,
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
  const nadesToBuy = shuffle(avalableNades)
  let nadesPrice: number = 0
  let newNades: string[] = []

  nadesToBuy.forEach((nade: Nade) => {
    if (cash >= nade.price * 2) {
      newNades.push(nade.name)
      nadesPrice += nade.price
    }
  })

  return {
    newNades: [...player.nades, ...newNades],
    nadesPrice: 0,
  } as newNadesInterface
}

function GetNewGun(
  player: InRoundPlayer,
  side: string,
  isResetRound: boolean,
  cash: number
) {
  interface newGunInterface {
    newGun: string
    gunPrice: number
  }
  let playerGun: string = isResetRound
    ? side === 'CT'
      ? rules.defaultGunCT
      : rules.defaultGunT
    : player.gun

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
  const topGun = availableGuns[0] || false

  if (
    availableGuns.length &&
    topGun &&
    cash >= topGun.price &&
    playerGun !== topGun.name &&
    (topGun.damage.withArmor.head > guns[playerGun].damage.withArmor.head ||
      (guns[player.gun].type === 'Pistol' && topGun.type !== 'Pistol'))
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
  if (cash >= rules.armorCost * 2 && !player.armor) {
    return { newArmor: true, armorPrice: rules.armorCost } as newArmorInterface
  } else {
    return { newArmor: player.armor, armorPrice: 0 } as newArmorInterface
  }
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
      ? rules.defaultCash
      : win
      ? player.cash + rules.winnBonus
      : player.cash + rules.lossBonus

    const { newArmor, armorPrice } = GetNewArmor(player, playerCash)
    playerCash -= armorPrice
    const { newGun, gunPrice } = GetNewGun(
      player,
      side,
      isResetRound,
      playerCash
    )
    playerCash -= gunPrice
    const { newNades, nadesPrice } = GetNewNades(player, playerCash)
    playerCash -= nadesPrice

    return {
      ...player,
      alive: true,
      roundsWithKAST: player.health
        ? [...player.roundsWithKAST, recentRoundNumber]
        : [...player.roundsWithKAST],
      health: rules.maxPlayerHealth,
      cash: playerCash,
      gun: newGun,
      armor: newArmor,
      nades: newNades,
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
      return [player1.health, 0]
    } else {
      if (Math.random() > 0.5) {
        return SprayDuel(player1, player2, player1Damage)
      } else {
        return [player1.health, player2.health - player1Damage]
      }
    }
  } else if (player2ReactionTime < player1ReactionTime) {
    if (player2Damage >= player1.health) {
      return [0, player2.health]
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

export function Match(team1: Team, team2: Team) {
  let team1Players = PrepareTeam(team1, 'CT') // TODO
  let team2Players = PrepareTeam(team2, 'CT')

  let team1Score = 0
  let team2Score = 0

  function RoundAction() {
    const team1PlayerExecute = GetRandomPlayersToExecute(team1Players)
    const team2PlayerExecute = GetRandomPlayersToExecute(team2Players)
    const [player1Health, player2Health] = Duel(
      team1PlayerExecute,
      team2PlayerExecute,
      '',
      ''
    ) // TODO
    team1Players = team1Players.map((player: InRoundPlayer) => {
      if (player === team1PlayerExecute) {
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
              ? [...player.roundsWithKAST, team1Score + team1Score + 1]
              : [...player.roundsWithKAST],
          totalDamage:
            player.totalDamage + (team2PlayerExecute.health - player2Health),
          alive: player1Health ? true : false,
          cash:
            player1Health && !player2Health
              ? player.cash + guns[player.gun].killAward
              : player.cash,
          health: player1Health,
        }
      } else {
        return player
      }
    })

    team2Players = team2Players.map((player: InRoundPlayer) => {
      if (player === team2PlayerExecute) {
        return {
          ...player,
          kills:
            player2Health && !player1Health ? player.kills + 1 : player.kills,
          assist:
            player1Health &&
            team1PlayerExecute.health - player1Health >= rules.assistDamageMin
              ? player.assist + 1
              : player.assist,
          death: !player2Health ? player.death + 1 : player.death,
          roundsWithKAST:
            team1PlayerExecute.health - player1Health > rules.assistDamageMin ||
            !player1Health
              ? [...player.roundsWithKAST, team1Score + team1Score + 1]
              : [...player.roundsWithKAST],
          totalDamage:
            player.totalDamage + (team1PlayerExecute.health - player1Health),
          alive: player2Health ? true : false,
          cash:
            player2Health && !player1Health
              ? player.cash + guns[player.gun].killAward
              : player.cash,
          health: player2Health,
        }
      } else {
        return player
      }
    })
  }

  function Round() {
    while (TeamsAlive(team1Players, team2Players)) {
      console.log('')
      team1Players.forEach((p: InRoundPlayer) => {
        console.log(p.name, p.totalDamage)
      })
      console.log('===')
      team2Players.forEach((p: InRoundPlayer) => {
        console.log(p.name, p.totalDamage)
      })
      console.log('')

      RoundAction()
    }
    if (TeamAlive(team1Players)) {
      team1Score++
    } else {
      team2Score++
    }
    console.log(team1Score, team2Score) // REMOVE
  }

  while (team1Score + team2Score < rules.MRsystem * 2) {
    Round()
    team1Players = SetAlive(
      team1Players,
      team1Score + team2Score,
      false,
      false,
      ''
    ) // TODO
    team2Players = SetAlive(
      team2Players,
      team1Score + team2Score,
      false,
      false,
      ''
    ) // TODO
    if (
      team1Score === rules.MRsystem + 1 ||
      team2Score === rules.MRsystem + 1
    ) {
      break
    }
  }

  console.log(''.padEnd(8, ' '), 'K', 'A', 'D', 'ADR'.padStart(20, ' '))

  team1Players.forEach((p: InRoundPlayer) => {
    const ADR = p.totalDamage / (team1Score + team2Score)
    const DPR = p.death / (team1Score + team2Score)
    const KPR = p.kills / (team1Score + team2Score)
    const APR = p.assist / (team1Score + team2Score)

    const KAST = p.roundsWithKAST.filter(onlyUniqueRounds).length
    const rating =
      0.0073 * KAST +
      0.3591 * KPR +
      (-0.5329 * DPR) / 2 +
      0.2372 * (2.13 * KPR + 0.42 * APR) +
      0.0032 * ADR +
      0.1584
    console.log(
      p.name.padEnd(8, ' '),
      p.kills,
      p.assist,
      p.death,
      // ADR,
      // KAST,
      // p.roundsWithKAST,
      rating.toFixed(2),
      (p.kills / p.death).toFixed(2)
    )
  })
  console.log('---')
  team2Players.forEach((p: InRoundPlayer) => {
    const ADR = p.totalDamage / (team1Score + team2Score)
    const DPR = p.death / (team1Score + team2Score)
    const KPR = p.kills / (team1Score + team2Score)
    const APR = p.assist / (team1Score + team2Score)
    const KAST = p.roundsWithKAST.filter(onlyUniqueRounds).length
    const rating =
      0.0073 * KAST +
      0.3591 * KPR +
      (-0.5329 * DPR) / 2 +
      0.2372 * (2.13 * KPR + 0.42 * APR) +
      0.0032 * ADR +
      0.1584

    console.log(
      p.name.padEnd(8, ' '),
      p.kills,
      p.assist,
      p.death,
      // ADR,
      // KAST,
      // p.roundsWithKAST,
      rating.toFixed(2),
      (p.kills / p.death).toFixed(2)
    )
  })
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
            ? player.cash + guns[player.gun].killAward
            : player.cash,
        health: Math.floor(player1Health),
        gun: !player1Health
          ? teamSide === 'CT'
            ? rules.defaultGunCT
            : rules.defaultGunT
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
