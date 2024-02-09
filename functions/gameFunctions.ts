import guns from '../constants/guns'
import { Gun, InRoundPlayer, Player, Team } from '../constants/interfaces'
import rules from '../constants/rules'

function PlayerHitPoint(player: InRoundPlayer) {
  return Math.random() >= player.stat.accuracy
    ? 'miss'
    : Math.random() >= player.stat.accuracy
    ? 'legs'
    : Math.random() >= player.stat.accuracy
    ? 'belly'
    : Math.random() >= player.stat.accuracy
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

// export function SecondAttackChance(player1: PlayerStat, player2: PlayerStat) {
//   return 0
// }

// export function CalculateDPS() {}

// export function CalculateAccuracyWithGun() {}

// export function CalculateDamage(
//   hitPoint: string,
//   gunName: string,
//   opponent: InRoundPlayer
// ) {
//   if (hitPoint === 'miss') {
//     return 0
//   } else {
//     if (
//       hitPoint === 'head' ||
//       hitPoint === 'chestAndArms' ||
//       hitPoint === 'belly' ||
//       hitPoint === 'legs'
//     ) {
//       return guns[gunName].damage[
//         opponent.armor ? 'withArmor' : 'withoutArmor'
//       ][hitPoint]
//     } else {
//       return 0
//     }
//   }
// }

export function GetRandomPlayersToExecute(team: InRoundPlayer[]) {
  return team.filter((player: InRoundPlayer) => player.alive)[
    Math.floor(Math.random() * team.length)
  ]
}

function TeamAlive(team: InRoundPlayer[]) {
  return team.find((player: InRoundPlayer) => player.alive)
}

function TeamsAlive(team1: InRoundPlayer[], team2: InRoundPlayer[]) {
  const team1Alive = TeamAlive(team1)
  const team2Alive = TeamAlive(team2)
  return team1Alive && team2Alive
}

function PrepareTeam(team: Team) {
  return team.players.map((player: Player) => {
    return {
      kills: 0,
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

export function Match(team1: Team, team2: Team) {
  let team1Players = PrepareTeam(team1)
  let team2Players = PrepareTeam(team2)

  let team1Score = 0
  let team2Score = 0

  function Duel(player1: InRoundPlayer, player2: InRoundPlayer) {
    const player1ReactionTime = PlayerReactionTime(player1)
    const player2ReactionTime = PlayerReactionTime(player2)

    team1Players = team1Players.map((player: InRoundPlayer) => {
      if (player === player1) {
        return {
          ...player,
          kills:
            player1ReactionTime < player2ReactionTime
              ? player.kills + 1
              : player.kills,
          death:
            player1ReactionTime < player2ReactionTime
              ? player.death
              : player.death + 1,
          alive: player1ReactionTime < player2ReactionTime ? true : false,
          cash:
            player1ReactionTime < player2ReactionTime
              ? player.cash + guns[player.gun].killAward
              : player.cash,
        }
      } else {
        return player
      }
    })

    team2Players = team2Players.map((player: InRoundPlayer) => {
      if (player === player2) {
        return {
          ...player,
          kills:
            player1ReactionTime < player2ReactionTime
              ? player.kills
              : player.kills + 1,
          death:
            player1ReactionTime < player2ReactionTime
              ? player.death + 1
              : player.death,
          alive: player1ReactionTime < player2ReactionTime ? false : true,
          cash:
            player1ReactionTime < player2ReactionTime
              ? player.cash
              : player.cash + guns[player.gun].killAward,
        }
      } else {
        return player
      }
    })
  }

  function RoundAction() {
    const team1PlayerExecute = GetRandomPlayersToExecute(team1Players)
    const team2PlayerExecute = GetRandomPlayersToExecute(team2Players)

    Duel(team1PlayerExecute, team2PlayerExecute)
  }

  function Round() {
    while (TeamsAlive(team1Players, team2Players)) {
      RoundAction()
    }
    if (TeamAlive(team1Players)) {
      team1Score++
    } else {
      team2Score++
    }
  }

  // while (team1Score < 16 && team2Score < 16 && team1Score + team2Score < 32) {
  Round()
  // }
  console.log(team1Players)
  console.log(team2Players)
  console.log(team1Score, team2Score)
}
