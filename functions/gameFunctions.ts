import guns from '../constants/guns'
import { Gun, InRoundPlayer, Player, Team } from '../constants/interfaces'
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

function CalculateDPS(
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

function GetRandomPlayersToExecute(team: InRoundPlayer[]) {
  const alivePlayers = team.filter((player: InRoundPlayer) => player.alive)
  return alivePlayers[Math.floor(Math.random() * alivePlayers.length)]
}

function TeamAlive(team: InRoundPlayer[]) {
  return team.find((player: InRoundPlayer) => player.alive)
}

function TeamsAlive(team1: InRoundPlayer[], team2: InRoundPlayer[]) {
  const team1Alive = TeamAlive(team1)
  const team2Alive = TeamAlive(team2)
  return !!(team1Alive && team2Alive)
}

function PrepareTeam(team: Team) {
  return team.players.map((player: Player) => {
    return {
      kills: 0,
      assist: 0,
      death: 0,
      alive: true,
      armor: false,
      cash: 1000,
      gun: 'Glock-18',
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

function SetAlive(team: InRoundPlayer[]) {
  const alivePLayers = team.map((player: InRoundPlayer) => {
    return {
      ...player,
      alive: true,
      health: rules.maxPlayerHealth,
    }
  })
  return alivePLayers
}

function SprayDuel(
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
    return [player1.health, player1.health - damage]
  }
}

export function Match(team1: Team, team2: Team) {
  let team1Players = PrepareTeam(team1)
  let team2Players = PrepareTeam(team2)

  let team1Score = 0
  let team2Score = 0

  function Duel(player1: InRoundPlayer, player2: InRoundPlayer) {
    const player1ReactionTime = +PlayerReactionTime(player1).toFixed(1)
    const player2ReactionTime = +PlayerReactionTime(player2).toFixed(1)
    const player1Shot = PlayerHitPoint(player1.stat.accuracy)
    const player2Shot = PlayerHitPoint(player2.stat.accuracy)
    const player1Damage = CalculateDamage(player1Shot, player1.gun, player2)
    const player2Damage = CalculateDamage(player2Shot, player2.gun, player1)

    if (player1ReactionTime < player2ReactionTime) {
      if (player1Damage >= player2.health) {
        return [player1.health, 0]
      } else {
        return SprayDuel(player1, player2, player1Damage)
      }
    } else if (player2ReactionTime < player1ReactionTime) {
      if (player2Damage >= player1.health) {
        return [0, player2.health]
      } else {
        return SprayDuel(player2, player1, player2Damage).reverse()
      }
    } else {
      return SprayDuel(player1, player2, 0)
    }
  }

  function RoundAction() {
    const team1PlayerExecute = GetRandomPlayersToExecute(team1Players)
    const team2PlayerExecute = GetRandomPlayersToExecute(team2Players)
    const [player1Health, player2Health] = Duel(
      team1PlayerExecute,
      team2PlayerExecute
    )
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
        console.log(
          p.name,
          'H',
          p.health,
          'K',
          p.kills,
          'A',
          p.assist,
          'D',
          p.death
        )
      })
      console.log('===')
      team2Players.forEach((p: InRoundPlayer) => {
        console.log(
          p.name,
          'H',
          p.health,
          'K',
          p.kills,
          'A',
          p.assist,
          'D',
          p.death
        )
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
    team1Players = SetAlive(team1Players)
    team2Players = SetAlive(team2Players)
    Round()
    if (
      team1Score === rules.MRsystem + 1 ||
      team2Score === rules.MRsystem + 1
    ) {
      break
    }
  }

  team1Players.forEach((p: InRoundPlayer) => {
    console.log(p.name, p.kills, p.assist, p.death)
  })
  console.log('---')

  team2Players.forEach((p: InRoundPlayer) => {
    console.log(p.name, p.kills, p.assist, p.death)
  })
}

const team1: Team = {
  name: 'NOVA',
  players: [
    {
      name: 'Oscare',
      stat: {
        role: 'sniper',
        reaction: 0.2,
        accuracy: 0.77,
        sprayControl: 0.82,
        flicksControl: 0.8,
        agression: 0.4,
      },
    },
    {
      name: 'Modest',
      stat: {
        role: 'rifler',
        reaction: 0.22,
        accuracy: 0.7,
        sprayControl: 0.82,
        flicksControl: 0.8,
        agression: 0.8,
      },
    },
    {
      name: 'Cloudy',
      stat: {
        role: 'capitan',
        reaction: 0.25,
        accuracy: 0.72,
        sprayControl: 0.8,
        flicksControl: 0.8,
        agression: 0.2,
      },
    },
    {
      name: 'Sky',
      stat: {
        role: 'capitan',
        reaction: 0.25,
        accuracy: 0.72,
        sprayControl: 0.8,
        flicksControl: 0.8,
        agression: 0.2,
      },
    },
    {
      name: 'Moon',
      stat: {
        role: 'capitan',
        reaction: 0.25,
        accuracy: 0.72,
        sprayControl: 0.8,
        flicksControl: 0.8,
        agression: 0.2,
      },
    },
  ],
}

const team2: Team = {
  name: 'Quazars',
  players: [
    {
      name: 'Header',
      stat: {
        role: 'rifler',
        reaction: 0.22,
        accuracy: 0.79,
        sprayControl: 0.85,
        flicksControl: 0.8,
        agression: 0.7,
      },
    },
    {
      name: 'Xantarex',
      stat: {
        role: 'rifler',
        reaction: 0.18,
        accuracy: 0.79,
        sprayControl: 0.85,
        flicksControl: 0.8,
        agression: 0.7,
      },
    },
    {
      name: 'Long',
      stat: {
        role: 'capitan',
        reaction: 0.25,
        accuracy: 0.7,
        sprayControl: 0.8,
        flicksControl: 0.8,
        agression: 0.25,
      },
    },
    {
      name: 'Phoenix',
      stat: {
        role: 'capitan',
        reaction: 0.35,
        accuracy: 0.9,
        sprayControl: 0.8,
        flicksControl: 0.8,
        agression: 0.25,
      },
    },
    {
      name: 'Pall',
      stat: {
        role: 'capitan',
        reaction: 0.22,
        accuracy: 0.7,
        sprayControl: 0.8,
        flicksControl: 0.8,
        agression: 0.25,
      },
    },
  ],
}

Match(team1, team2)
