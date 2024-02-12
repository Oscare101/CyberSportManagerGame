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
  BuyBeforeRound,
  InstantMatchResults,
} from '../../functions/gameFunctions'
import rules from '../../constants/rules'
import guns from '../../constants/guns'
import { useEffect, useState } from 'react'
import GunImage from '../../components/GunImage'
import HealthBlock from '../../components/HealthBlock'
import NadesBlock from '../../components/NadesBlock'
import NadeImage from '../../components/NadeImage'
import colors from '../../constants/colors'
import RenderRoundWiner from '../../components/RenderRoundWinner'

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

export default function MatchScreen() {
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
  const [team1Side, setTeam1Side] = useState<'CT' | 'T'>(CalculateSide(1)[0])
  const [team2Side, setTeam2Side] = useState<'CT' | 'T'>(CalculateSide(1)[1])
  const [roundWinLogs, setRoundWinLogs] = useState<string[]>([])

  function Match() {
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

    function RoundAction() {
      if (TeamsAlive(team1Players, team2Players)) {
        ActionBetweenTwoPlayers()
      } else {
        setTeam1Side(CalculateSide(team1Score + team2Score + 2)[0])
        setTeam2Side(CalculateSide(team1Score + team2Score + 2)[1])

        if (TeamAlive(team1Players)) {
          setTeam1Score(team1Score + 1)
          setRoundWinLogs([...roundWinLogs, team1.name])
        } else {
          setTeam2Score(team2Score + 1)
          setRoundWinLogs([...roundWinLogs, team2.name])
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
        setTeam1Players(newTeam1PlayersAfterBuy)
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
        setTeam2Players(newTeam2PlayersAfterBuy)
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

    if (!isGameActive && team1Score + team2Score > 0) {
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
                  ? colors.CTColor
                  : colors.TColor
                : team2Side === 'CT'
                ? colors.CTColor
                : colors.TColor,
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
        <View
          style={{
            width: '10%',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <View
            style={{
              height: '50%',
              aspectRatio: 0.7,
              borderBottomRightRadius: 100,
              borderBottomLeftRadius: 100,
              backgroundColor: '#fff',
              opacity: player.armor && player.alive ? 0.9 : 0,
            }}
          />
        </View>
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
    if (!isGameActive && team1Score + team2Score > 0) {
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
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'flex-start',
          }}
        >
          <FlatList
            style={{ width: '100%', height: width / 12 }}
            horizontal
            initialNumToRender={roundWinLogs.length}
            data={roundWinLogs}
            renderItem={({ item, index }) =>
              RenderRoundWiner(
                item,
                index,
                roundWinLogs,
                team1.name,
                team2.name
              )
            }
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

      {isGameActive ? (
        <>
          <Button
            title={'skip to result >>>'}
            onPress={() => {
              const {
                resultTeam1Players,
                resultTeam2Players,
                resultTeam1Score,
                resultTeam2Score,
                resultRoundWinLogs,
              } = InstantMatchResults(
                team1Players,
                team2Players,
                team1Score,
                team2Score,
                overtimeRounds,
                team1Side,
                team2Side,
                roundWinLogs
              )
              setTeam1Players(resultTeam1Players)
              setTeam2Players(resultTeam2Players)
              setTeam1Score(resultTeam1Score)
              setTeam2Score(resultTeam2Score)
              setRoundWinLogs(resultRoundWinLogs)
            }}
          />
        </>
      ) : (
        <>
          <Button
            title={'Start match'}
            onPress={() => {
              setTeam1Players(
                BuyBeforeRound(
                  PrepareTeam(team1, CalculateSide(1)[0]),
                  team1Side
                )
              )
              setTeam2Players(
                BuyBeforeRound(
                  PrepareTeam(team2, CalculateSide(1)[1]),
                  team2Side
                )
              )

              setIsGameActive(true)
            }}
          />
          <Button
            title={'Get instant result'}
            onPress={() => {
              const {
                resultTeam1Players,
                resultTeam2Players,
                resultTeam1Score,
                resultTeam2Score,
                resultRoundWinLogs,
              } = InstantMatchResults(
                PrepareTeam(team1, CalculateSide(1)[0]),
                PrepareTeam(team2, CalculateSide(1)[1]),
                0,
                0,
                0,
                CalculateSide(1)[0],
                CalculateSide(1)[1],
                []
              )
              setTeam1Players(resultTeam1Players)
              setTeam2Players(resultTeam2Players)
              setTeam1Score(resultTeam1Score)
              setTeam2Score(resultTeam2Score)
              setRoundWinLogs(resultRoundWinLogs)
            }}
          />
        </>
      )}
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
