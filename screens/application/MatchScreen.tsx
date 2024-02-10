import {
  Button,
  Dimensions,
  FlatList,
  Image,
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
  CalculateRating,
  NadeUsage,
  CalculatePlayersAfterDuel,
} from '../../functions/gameFunctions'
import rules from '../../constants/rules'
import guns from '../../constants/guns'
import { useEffect, useState } from 'react'
import GunImage from '../../components/GunImage'
import HealthBlock from '../../components/HealthBlock'
import NadesBlock from '../../components/NadesBlock'
import NadeImage from '../../components/NadeImage'

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
      const player1NadeUsage = NadeUsage(team1PlayerExecute)
      const player2NadeUsage = NadeUsage(team2PlayerExecute)
      const [player1Health, player2Health] = Duel(
        team1PlayerExecute,
        team2PlayerExecute,
        player1NadeUsage,
        player2NadeUsage
      )

      setTeam1Players(
        CalculatePlayersAfterDuel(
          team1Players,
          team1PlayerExecute,
          team2PlayerExecute,
          player1Health,
          player2Health,
          player1NadeUsage,
          team1Score + team1Score + 1,
          team1Side
        )
      )

      setTeam2Players(
        CalculatePlayersAfterDuel(
          team2Players,
          team2PlayerExecute,
          team1PlayerExecute,
          player2Health,
          player1Health,
          player2NadeUsage,
          team1Score + team1Score + 1,
          team2Side
        )
      )
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
          IsSideChangeRound(team1Score + team2Score + 1),
          CalculateSide(team1Score + team2Score + 2)[0]
        )
        setTeam1Players(newTeam1Players)
        const newTeam2Players = SetAlive(
          team2Players,
          team1Score + team2Score,
          !!TeamAlive(team2Players),
          IsSideChangeRound(team1Score + team2Score + 1),
          CalculateSide(team1Score + team2Score + 2)[1]
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

  function PlayerResults(props: any) {
    const player: InRoundPlayer = props.player

    const { ADR, DPR, KPR, APR, KAST, rating } = CalculateRating(
      player,
      team1Score + team2Score
    )

    return (
      <View
        style={[
          styles.playerBlock,
          {
            borderRadius: 2,
            margin: 1,
            opacity: player.alive ? 0.8 : 0.4,
            backgroundColor: '#ffffff30',
          },
        ]}
      >
        <Text style={styles.playerName}>{player.name}</Text>
        <Text style={styles.playerStat}>
          {player.kills}-{player.death}
        </Text>
        <Text
          style={[
            styles.playerStat,
            {
              color:
                player.kills > player.death
                  ? '#0f0'
                  : player.kills < player.death
                  ? '#F00'
                  : '#000',
            },
          ]}
        >
          {player.kills > player.death ? '+' : ''}
          {player.kills - player.death}
        </Text>
        <Text style={styles.playerStat}>{ADR}</Text>
        <Text style={styles.playerStat}>{KAST}</Text>
        <Text style={styles.playerStat}>{rating}</Text>
      </View>
    )
  }

  function RenderPlayer(item: any) {
    const player: InRoundPlayer = item.item

    if (!isGameActive) {
      return <PlayerResults player={player} />
    }

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
          {player.alive ? <GunImage name={player.gun} /> : <></>}
        </View>
        <View style={{ height: '100%', aspectRatio: 1 }}>
          <NadesBlock nades={player.nades} />
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
    if (!isGameActive) {
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
          <Text style={styles.playerStat}>K-D</Text>
          <Text style={styles.playerStat}>+/-</Text>
          <Text style={styles.playerStat}>ADR</Text>
          <Text style={styles.playerStat}>KAST</Text>
          <Text style={styles.playerStat}>rating</Text>
        </View>
      )
    }
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
        <Text style={styles.playerStat}>nades</Text>
        <Text style={styles.playerStat}>$</Text>
        <Text style={styles.playerStat}>armor</Text>
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
            data={
              isGameActive
                ? (team1Players as InRoundPlayer[])
                : (team1Players.sort(
                    (a: InRoundPlayer, b: InRoundPlayer) =>
                      CalculateRating(b, team1Score + team2Score).rating -
                      CalculateRating(a, team1Score + team2Score).rating
                  ) as InRoundPlayer[])
            }
            renderItem={RenderPlayer}
          />
        </View>
        <View style={styles.teamColumn}>
          <TeamHeader teamName={team2.name} />
          <FlatList
            data={
              isGameActive
                ? (team2Players as InRoundPlayer[])
                : (team2Players.sort(
                    (a: InRoundPlayer, b: InRoundPlayer) =>
                      CalculateRating(b, team1Score + team2Score).rating -
                      CalculateRating(a, team1Score + team2Score).rating
                  ) as InRoundPlayer[])
            }
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
    overflow: 'hidden',
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
