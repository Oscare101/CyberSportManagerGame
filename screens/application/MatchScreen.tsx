import {
  Button,
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { InRoundPlayer, MapResult, Team } from '../../constants/interfaces'
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
  IsMatchWinner,
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
import MatchHeader from '../../components/MatchHeader'
import RenderPlayer from '../../components/RenderPlayer'
import TeamBlock from '../../components/TeamBlock'
import MatchStatPerMapBlock from '../../components/MatchStatPerMapBlock'

const team1: Team = {
  name: 'NOVA',
  players: [
    {
      name: 'Oscare',
      stat: {
        role: 'sniper',
        reaction: 0.25,
        accuracy: 0.6,
        sprayControl: 0.62,
        flicksControl: 0.6,
      },
    },
    {
      name: 'Modest',
      stat: {
        role: 'rifler',
        reaction: 0.32,
        accuracy: 0.58,
        sprayControl: 0.6,
        flicksControl: 0.51,
      },
    },
    {
      name: 'Cloudy',
      stat: {
        role: 'capitan',
        reaction: 0.31,
        accuracy: 0.55,
        sprayControl: 0.5,
        flicksControl: 0.6,
      },
    },
    {
      name: 'Sky',
      stat: {
        role: 'rifler',
        reaction: 0.29,
        accuracy: 0.4,
        sprayControl: 0.69,
        flicksControl: 0.52,
      },
    },
    {
      name: 'Moon',
      stat: {
        role: 'support',
        reaction: 0.3,
        accuracy: 0.52,
        sprayControl: 0.52,
        flicksControl: 0.48,
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
        reaction: 0.29,
        accuracy: 0.6,
        sprayControl: 0.65,
        flicksControl: 0.6,
      },
    },
    {
      name: 'Xantarex',
      stat: {
        role: 'rifler',
        reaction: 0.32,
        accuracy: 0.48,
        sprayControl: 0.5,
        flicksControl: 0.52,
      },
    },
    {
      name: 'Long',
      stat: {
        role: 'capitan',
        reaction: 0.32,
        accuracy: 0.5,
        sprayControl: 0.52,
        flicksControl: 0.55,
      },
    },
    {
      name: 'Phoenix',
      stat: {
        role: 'support',
        reaction: 0.35,
        accuracy: 0.52,
        sprayControl: 0.48,
        flicksControl: 0.62,
      },
    },
    {
      name: 'Pall',
      stat: {
        role: 'sniper',
        reaction: 0.3,
        accuracy: 0.49,
        sprayControl: 0.55,
        flicksControl: 0.7,
      },
    },
  ],
}

const bestOfMaps = 3

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

  const [mapsResults, setMapsResults] = useState<MapResult[]>([])
  const [mapsResultsToShow, setMapsResultsToShow] = useState<number>(0)

  function PrepareForMap() {
    setTeam1Players(
      BuyBeforeRound(PrepareTeam(team1, CalculateSide(1)[0]), team1Side)
    )
    setTeam2Players(
      BuyBeforeRound(PrepareTeam(team2, CalculateSide(1)[1]), team2Side)
    )
    setTeam1Score(0)
    setTeam2Score(0)
    setOvertimeRounds(0)
    setTeam1Side(CalculateSide(1)[0])
    setTeam2Side(CalculateSide(1)[1])
    setRoundWinLogs([])
    setMapsResultsToShow(0)
  }

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
        const newMapResults: MapResult[] = [
          ...mapsResults,
          {
            team1Players: team1Players,
            team2Players: team2Players,
            team1Score: team1Score,
            team2Score: team2Score,
            roundWinLogs: roundWinLogs,
          },
        ]
        setMapsResults(newMapResults)
        if (IsMatchWinner(newMapResults, bestOfMaps)) {
          setIsGameActive(false)
        } else {
          PrepareForMap()
        }
      }
    }
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

  return (
    <View style={styles.container}>
      <MatchHeader
        team1={team1Players}
        team2={team2Players}
        team1Score={team1Score}
        team2Score={team2Score}
        bestOfMaps={bestOfMaps}
        mapsResults={mapsResults}
        team1Side={team1Side}
        team2Side={team2Side}
        isGameActive={isGameActive}
        overtimes={overtimeRounds}
      />
      {!isGameActive && mapsResults.length ? (
        <MatchStatPerMapBlock
          mapsResults={mapsResults}
          mapsResultsToShow={mapsResultsToShow}
          setMapsResultsToShow={(value: number) => setMapsResultsToShow(value)}
        />
      ) : (
        <></>
      )}

      <View style={styles.teamColumnsBlock}>
        <View style={styles.teamColumn}>
          <TeamBlock
            team={team1Players}
            rounds={team1Score + team2Score}
            isGameActive={isGameActive}
            teamSide={team1Side}
            mapResults={
              !isGameActive && mapsResults.length
                ? mapsResultsToShow
                  ? [mapsResults[mapsResultsToShow - 1]]
                  : mapsResults
                : []
            }
            teamNumber={1}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            width: '95%',
            alignItems: 'center',
            justifyContent: 'flex-start',
          }}
        >
          <FlatList
            style={{ width: '100%', height: width / 12 }}
            horizontal
            initialNumToRender={roundWinLogs.length}
            data={
              !isGameActive && mapsResults.length
                ? mapsResults[mapsResultsToShow - 1]?.roundWinLogs || []
                : roundWinLogs
            }
            renderItem={({ item, index }) =>
              RenderRoundWiner(
                item,
                index,
                !isGameActive && mapsResults.length
                  ? mapsResults[mapsResultsToShow - 1]?.roundWinLogs || []
                  : roundWinLogs,
                team1.name,
                team2.name
              )
            }
          />
        </View>
        <View style={styles.teamColumn}>
          <TeamBlock
            team={team2Players}
            rounds={team1Score + team2Score}
            isGameActive={isGameActive}
            teamSide={team2Side}
            mapResults={
              !isGameActive && mapsResults.length && mapsResultsToShow
                ? [mapsResults[mapsResultsToShow - 1]]
                : mapsResults
            }
            teamNumber={2}
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
                mapsResultsLog,
              } = InstantMatchResults(
                team1Players,
                team2Players,
                team1Score,
                team2Score,
                overtimeRounds,
                team1Side,
                team2Side,
                roundWinLogs,
                mapsResults,
                bestOfMaps
              )
              setTeam1Players(resultTeam1Players)
              setTeam2Players(resultTeam2Players)
              setTeam1Score(resultTeam1Score)
              setTeam2Score(resultTeam2Score)
              setRoundWinLogs(resultRoundWinLogs)
              setMapsResults(mapsResultsLog)
              setIsGameActive(false)
            }}
          />
        </>
      ) : (
        <>
          <Button
            title={'Start match'}
            onPress={() => {
              setMapsResults([])
              PrepareForMap()

              setIsGameActive(true)
            }}
          />
          <Button
            title={'Get instant result'}
            onPress={() => {
              setMapsResults([])
              PrepareForMap()
              const {
                resultTeam1Players,
                resultTeam2Players,
                resultTeam1Score,
                resultTeam2Score,
                resultRoundWinLogs,
                mapsResultsLog,
              } = InstantMatchResults(
                PrepareTeam(team1, CalculateSide(1)[0]),
                PrepareTeam(team2, CalculateSide(1)[1]),
                0,
                0,
                0,
                CalculateSide(1)[0],
                CalculateSide(1)[1],
                [],
                [],
                bestOfMaps
              )
              setTeam1Players(resultTeam1Players)
              setTeam2Players(resultTeam2Players)
              setTeam1Score(resultTeam1Score)
              setTeam2Score(resultTeam2Score)
              setRoundWinLogs(resultRoundWinLogs)
              setMapsResults(mapsResultsLog)
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
    backgroundColor: '#E5E5E5',
    width: '100%',
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
    width: '95%',
  },

  playerEconomic: {},
  playerHealth: {},
})
