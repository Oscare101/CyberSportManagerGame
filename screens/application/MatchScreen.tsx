import { Button, FlatList, StyleSheet, Text, View } from 'react-native'
import { InRoundPlayer, Team } from '../../constants/interfaces'
import {
  Duel,
  GetRandomPlayersToExecute,
  PrepareTeam,
  SetAlive,
  TeamAlive,
  TeamsAlive,
  onlyUniqueRounds,
} from '../../functions/gameFunctions'
import rules from '../../constants/rules'
import guns from '../../constants/guns'
import { useEffect, useState } from 'react'

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
        reaction: 0.2,
        accuracy: 0.72,
        sprayControl: 0.8,
        flicksControl: 0.8,
        agression: 0.3,
      },
    },
    {
      name: 'Moon',
      stat: {
        role: 'capitan',
        reaction: 0.3,
        accuracy: 0.9,
        sprayControl: 0.9,
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

export default function MathScreen() {
  const [team1Players, setTeam1Players] = useState<InRoundPlayer[]>(
    PrepareTeam(team1)
  )
  const [team2Players, setTeam2Players] = useState<InRoundPlayer[]>(
    PrepareTeam(team1)
  )
  const [team1Score, setTeam1Score] = useState<number>(0)
  const [team2Score, setTeam2Score] = useState<number>(0)
  const [isGameActive, setIsGameActive] = useState<boolean>(false)
  const [overtimeRounds, setOvertimeRounds] = useState<number>(0)
  const [lastUpdate, setLastUpdate] = useState<number>(0)
  function Match() {
    function RoundAction() {
      const team1PlayerExecute = GetRandomPlayersToExecute(team1Players)
      const team2PlayerExecute = GetRandomPlayersToExecute(team2Players)
      const [player1Health, player2Health] = Duel(
        team1PlayerExecute,
        team2PlayerExecute
      )
      const newTeam1Players = team1Players.map((player: InRoundPlayer) => {
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
              team2PlayerExecute.health - player2Health >
                rules.assistDamageMin || !player2Health
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
      setTeam1Players(newTeam1Players)
      const newTeam2Players = team2Players.map((player: InRoundPlayer) => {
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
              team1PlayerExecute.health - player1Health >
                rules.assistDamageMin || !player1Health
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
      setTeam2Players(newTeam2Players)
    }

    function Round() {
      if (TeamsAlive(team1Players, team2Players)) {
        RoundAction()
      } else {
        if (TeamAlive(team1Players)) {
          setTeam1Score(team1Score + 1)
        } else {
          setTeam2Score(team2Score + 1)
        }
        const newTeam1Players = SetAlive(team1Players, team1Score + team2Score)
        setTeam1Players(newTeam1Players)
        const newTeam2Players = SetAlive(team2Players, team1Score + team2Score)
        setTeam2Players(newTeam2Players)
      }
    }
    console.log(team1Score, team2Score)

    if (
      team1Score < rules.MRsystem + overtimeRounds + 1 &&
      team2Score < rules.MRsystem + overtimeRounds + 1 &&
      team1Score + team2Score < (rules.MRsystem + overtimeRounds) * 2
    ) {
      Round()
    } else {
      if (team1Score === team2Score) {
        setOvertimeRounds(overtimeRounds + rules.MRovertime)
      } else {
        setIsGameActive(false)
      }
    }
  }

  function RenderPlayer({ item }: any) {
    return (
      <View
        style={[
          styles.playerBlock,
          {
            backgroundColor: item.alive ? '#fff' : '#00000000',
            borderRadius: 2,
            margin: 1,
          },
        ]}
      >
        <Text style={styles.playerName}>{item.name}</Text>
        <View style={[styles.healthBlock]}>
          <View
            style={{
              width: `${item.health}%`,
              height: '100%',
              backgroundColor: '#000',
            }}
          />
        </View>
        <Text style={styles.playerStat}>{item.kills}</Text>
        <Text style={styles.playerStat}>{item.assist}</Text>
        <Text style={styles.playerStat}>{item.death}</Text>
      </View>
    )
  }

  useEffect(() => {
    let timer = setTimeout(() => {
      if (isGameActive) {
        Match()
        setLastUpdate(new Date().getTime())
        // console.log('match')
      }
    }, 100)
    return () => {
      clearTimeout(timer)
    }
  }, [lastUpdate, isGameActive])

  return (
    <View style={styles.container}>
      <View style={styles.scoreHeader}>
        <Text>
          {team1Score} - {team2Score} ({overtimeRounds})
        </Text>
      </View>
      <View style={styles.teamColumnsBlock}>
        <View style={styles.teamColumn}>
          <FlatList data={team1Players} renderItem={RenderPlayer} />
        </View>
        <View style={styles.teamColumn}>
          <FlatList data={team2Players} renderItem={RenderPlayer} />
        </View>
      </View>
      <Button title="start" onPress={() => setIsGameActive(true)} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  scoreHeader: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  teamColumnsBlock: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  teamColumn: {
    flexDirection: 'column',
    width: '50%',
  },
  playerBlock: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  playerName: { width: '40%' },
  healthBlock: { width: '20%', height: '100%' },
  playerStat: { width: '10%' },
  playerEconomic: {},
  playerHealth: {},
})
