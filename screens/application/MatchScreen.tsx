import {
  Button,
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import { InRoundPlayer, Team } from '../../constants/interfaces'
import {
  Duel,
  GetRandomPlayersToExecute,
  PrepareTeam,
  SetAlive,
  TeamAlive,
  TeamsAlive,
  onlyUniqueRounds,
  CalculateSide,
  IsSideChangeRound,
} from '../../functions/gameFunctions'
import rules from '../../constants/rules'
import guns from '../../constants/guns'
import { useEffect, useState } from 'react'
import GunImage from '../../components/GunImage'
import HealthBlock from '../../components/HealthBlock'

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
        role: 'rifler',
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
        role: 'support',
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
        role: 'support',
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
        role: 'sniper',
        reaction: 0.22,
        accuracy: 0.7,
        sprayControl: 0.8,
        flicksControl: 0.8,
        agression: 0.25,
      },
    },
  ],
}

const width = Dimensions.get('screen').width

export default function MathScreen() {
  const [team1Players, setTeam1Players] = useState<InRoundPlayer[]>(
    PrepareTeam(team1, CalculateSide(1)[0])
  )
  const [team2Players, setTeam2Players] = useState<InRoundPlayer[]>(
    PrepareTeam(team2, CalculateSide(1)[1])
  )
  const [team1Score, setTeam1Score] = useState<number>(0)
  const [team2Score, setTeam2Score] = useState<number>(0)
  const [isGameActive, setIsGameActive] = useState<boolean>(false)
  const [overtimeRounds, setOvertimeRounds] = useState<number>(0)
  const [lastUpdate, setLastUpdate] = useState<number>(0)
  const [team1Side, setTeam1Side] = useState<string>(CalculateSide(1)[0])
  const [team2Side, setTeam2Side] = useState<string>(CalculateSide(1)[1])

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
            health: Math.floor(player1Health),
            gun: !player1Health
              ? team1Side === 'CT'
                ? rules.defaultGunCT
                : rules.defaultGunT
              : player.gun,
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
            health: Math.floor(player2Health),
            gun: !player2Health
              ? team2Side === 'CT'
                ? rules.defaultGunCT
                : rules.defaultGunT
              : player.gun,
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
        setTeam1Side(CalculateSide(team1Score + team2Score + 2)[0])
        setTeam2Side(CalculateSide(team1Score + team2Score + 2)[1])

        if (TeamAlive(team1Players)) {
          setTeam1Score(team1Score + 1)
        } else {
          setTeam2Score(team2Score + 1)
        }

        const newTeam1Players = SetAlive(
          team1Players,
          team1Score + team2Score,
          !!TeamAlive(team1Players),
          IsSideChangeRound(team1Score + team2Score + 1)
        )
        setTeam1Players(newTeam1Players)
        const newTeam2Players = SetAlive(
          team2Players,
          team1Score + team2Score,
          !!TeamAlive(team2Players),
          IsSideChangeRound(team1Score + team2Score + 1)
        )
        setTeam2Players(newTeam2Players)
      }
    }
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

  function RenderPlayer(item: any) {
    const player: InRoundPlayer = item.item

    return (
      <View
        style={[
          styles.playerBlock,
          {
            borderRadius: 2,
            margin: 1,
            opacity: player.alive ? 0.8 : 0.4,
            backgroundColor:
              team1.name === player.team
                ? team1Side === 'CT'
                  ? '#396782'
                  : '#897432'
                : team2Side === 'CT'
                ? '#396782'
                : '#897432',
          },
        ]}
      >
        <Text style={styles.playerName}>{player.name}</Text>
        <View style={[styles.healthBlock]}>
          <HealthBlock health={player.health} />
        </View>
        <View style={{ width: '10%' }}>
          <GunImage name={player.gun} />
        </View>
        <Text style={styles.playerStat}>{player.cash}</Text>
        <Text style={styles.playerStat}>{player.armor ? '+' : '-'}</Text>
        <Text style={styles.playerStat}>{player.kills}</Text>
        <Text style={styles.playerStat}>{player.assist}</Text>
        <Text style={styles.playerStat}>{player.death}</Text>
      </View>
    )
  }

  useEffect(() => {
    let timer = setTimeout(() => {
      if (isGameActive) {
        Match()
        setLastUpdate(new Date().getTime())
      }
    }, 100)
    return () => {
      clearTimeout(timer)
    }
  }, [lastUpdate, isGameActive])

  function TeamHeader(props: any) {
    return (
      <View
        style={[
          styles.playerBlock,
          {
            borderRadius: 2,
            margin: 1,
          },
        ]}
      >
        <Text style={styles.playerName}>{props.teamName}</Text>
        <Text style={styles.playerStat}>+</Text>
        <Text style={styles.playerStat}>gun</Text>
        <Text style={styles.playerStat}>armor</Text>
        <Text style={styles.playerStat}>$</Text>
        <Text style={styles.playerStat}>K</Text>
        <Text style={styles.playerStat}>A</Text>
        <Text style={styles.playerStat}>D</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.scoreHeader}>
        <Text>
          {team1Score} - {team2Score} ({overtimeRounds})
        </Text>
      </View>
      <View style={styles.teamColumnsBlock}>
        <View style={styles.teamColumn}>
          <TeamHeader teamName={team1.name} />
          <FlatList
            data={team1Players as InRoundPlayer[]}
            renderItem={RenderPlayer}
          />
        </View>
        <View style={styles.teamColumn}>
          <TeamHeader teamName={team2.name} />
          <FlatList
            data={team2Players as InRoundPlayer[]}
            renderItem={RenderPlayer}
          />
        </View>
      </View>
      <Button title={'start'} onPress={() => setIsGameActive(true)} />
      {/* {[
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
        21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38,
        39, 40,
      ].map((num: number) => (
        <Text>
          {num} - {IsSideChangeRound(num) ? 'change' : '-'}
        </Text>
      ))} */}
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
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  teamColumn: {
    flexDirection: 'column',
    width: '100%',
  },
  playerBlock: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: width * 0.07,
    paddingHorizontal: '2%',
  },
  playerName: { width: '20%' },
  healthBlock: {
    width: '10%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  playerStat: { width: '10%', fontSize: width * 0.03, textAlign: 'center' },
  playerEconomic: {},
  playerHealth: {},
})
