import guns from '../constants/guns'
import { Gun, InRoundPlayer, PlayerStat } from '../constants/interfaces'
import rules from '../constants/rules'

export function PlayerHitPoint(player: PlayerStat) {
  return Math.random() >= player.accuracy
    ? 'miss'
    : Math.random() >= player.accuracy
    ? 'legs'
    : Math.random() >= player.accuracy
    ? 'belly'
    : Math.random() >= player.accuracy
    ? 'chestAndArms'
    : 'head'
}

export function PlayerReactionTime(player: PlayerStat) {
  return (
    Math.random() *
      (player.reaction * rules.playerReactionTimeMaxKoef -
        player.reaction * rules.playerReactionTimeMinKoef) +
    player.reaction * rules.playerReactionTimeMinKoef
  )
}

export function CalculateDamage(
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

export function ActionBetweenPlayers(player1: PlayerStat, player2: PlayerStat) {
  let player1InRoundStat: InRoundPlayer = {
    armor: false,
    armorHealth: 100,
    gun: 'AWP',
    health: 100,
  }

  let player2InRoundStat: InRoundPlayer = {
    armor: false,
    armorHealth: 100,
    gun: 'AWP',
    health: 100,
  }

  const player1ReactionTime = PlayerReactionTime(player1)
  const player2ReactionTime = PlayerReactionTime(player2)

  if (player1ReactionTime < player2ReactionTime) {
    player1InRoundStat = {
      ...player1InRoundStat,
      health:
        player1InRoundStat.health -
          CalculateDamage(
            PlayerHitPoint(player1),
            player1InRoundStat.gun,
            player2InRoundStat
          ) || 0,
    }
  }
}

export function Duel(player1: PlayerStat, player2: PlayerStat) {
  ActionBetweenPlayers(player1, player2)
  // GetPlayerNadeUsage()
  // GetPlayerShot() // (delay || null) + (head || chestAndArms || belly || legs || null) + spray
  // GetPlayersHealthLeft()
}

export function Round() {
  // GetRandomPlaersForDuel()
  // Duel()
  // ContinueAgression() => Duel()
}
