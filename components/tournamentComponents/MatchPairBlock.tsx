import { Dimensions, Text, TouchableOpacity, View } from 'react-native'
import { MapResult, Team, Tournament } from '../../constants/interfaces'
import {
  GetMatchScoreByTeams,
  GetMatchWinner,
  InstantMatchResults,
  PrepareForMapResults,
} from '../../functions/gameFunctions'
import colors from '../../constants/colors'
import { Ionicons } from '@expo/vector-icons'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../redux'
import { updateTournaments } from '../../redux/tournaments'

interface MatchPairProps {
  team1: Team
  team2: Team
  indexI: number
  indexJ: number
  tournament: Tournament
  bestOfMaps: number
  mapResults: MapResult[]
  onSetModal: any
  onMatchResults: any
}

const width = Dimensions.get('screen').width

export default function MatchPairBlock(props: MatchPairProps) {
  const [modal, setModal] = useState<boolean>(false)
  const tournaments = useSelector((state: RootState) => state.tournaments)
  const dispatch = useDispatch()

  return (
    <>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          const {
            preparedTeam1Players,
            preparedTeam2Players,
            preparedScore1,
            preparedScore2,
            preparedOvertimes,
            preparedTeam1Sideplay,
            preparedTeam2Sideplay,
            preparedWinLogs,
            preparedMapsResultsLog,
            preparedBestOfMaps,
          } = PrepareForMapResults(props.team1, props.team2, props.bestOfMaps)

          const mapsResultsLog = InstantMatchResults(
            preparedTeam1Players,
            preparedTeam2Players,
            preparedScore1,
            preparedScore2,
            preparedOvertimes,
            preparedTeam1Sideplay,
            preparedTeam2Sideplay,
            preparedWinLogs,
            preparedMapsResultsLog,
            preparedBestOfMaps
          )
          console.log('mapsResultsLog', mapsResultsLog.length)

          let newTournamentData = [...tournaments]
          newTournamentData = newTournamentData.map((t: Tournament) => {
            if (JSON.stringify(t) === JSON.stringify(props.tournament)) {
              let newGrid = t.grid
              console.log('1', newGrid[props.indexI][props.indexJ])

              newGrid[props.indexI][props.indexJ].mapResults = mapsResultsLog

              newGrid = newGrid.map((gridI: any[], indexI: number) => {
                // біжу по масиву
                return gridI.map((gridJ: any[], indexJ: number) => {
                  // біжу по масиву в масиву
                  if (indexI === props.indexI && indexJ === props.indexJ) {
                    // знаходжу потрібний елемент за положення в масивах
                    return {
                      // виводжу оновлену значення
                      ...gridJ,
                      mapResults: mapsResultsLog, // оновлене значення
                    }
                  } else {
                    // не знаходжу -> виводжу старе значення
                    return gridJ
                  }
                })
              })

              console.log('2', newGrid[props.indexI][props.indexJ])

              return {
                ...t,
                grid: newGrid,
              }
            } else {
              return t
            }
          })
          console.log(newTournamentData[0].grid[0][0].mapResults)

          dispatch(updateTournaments(newTournamentData))
        }}
        // disabled={!!props.mapResults.length}
        style={{
          width: width * 0.3,
          height: width * 0.15,
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: width * 0.01,
          overflow: 'hidden',
          backgroundColor: '#fff',
        }}
      >
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            borderLeftWidth: 2,
            borderLeftColor:
              GetMatchWinner(props.mapResults) === props.team1.name
                ? colors.succesColor
                : GetMatchWinner(props.mapResults) === props.team2.name
                ? colors.errorColor
                : '#00000000',
            flex: 1,
            alignItems: 'center',
            justifyContent: 'flex-start',
            paddingLeft: '2%',
          }}
        >
          <Text>
            {props.mapResults.length
              ? GetMatchScoreByTeams(props.mapResults)[props.team1.name]
              : 0}{' '}
          </Text>
          <Text>{props.team1.name}</Text>
        </View>
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            borderLeftWidth: 2,
            borderLeftColor:
              GetMatchWinner(props.mapResults) === props.team2.name
                ? colors.succesColor
                : GetMatchWinner(props.mapResults) === props.team1.name
                ? colors.errorColor
                : '#00000000',
            flex: 1,
            alignItems: 'center',
            justifyContent: 'flex-start',
            paddingLeft: '2%',
          }}
        >
          <Text>
            {props.mapResults.length
              ? GetMatchScoreByTeams(props.mapResults)[props.team2.name]
              : 0}{' '}
          </Text>
          <Text>{props.team2.name}</Text>
        </View>
        {/* <View style={{ width: '100%', flexDirection: 'row' }}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => props.onSetModal(true)}
          disabled={!!props.mapResults.length}
        >
          <Ionicons name="play" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            const {
              preparedTeam1Players,
              preparedTeam2Players,
              preparedScore1,
              preparedScore2,
              preparedOvertimes,
              preparedTeam1Sideplay,
              preparedTeam2Sideplay,
              preparedWinLogs,
              preparedMapsResultsLog,
              preparedBestOfMaps,
            } = PrepareForMapResults(props.team1, props.team2, props.bestOfMaps)

            const mapsResultsLog = InstantMatchResults(
              preparedTeam1Players,
              preparedTeam2Players,
              preparedScore1,
              preparedScore2,
              preparedOvertimes,
              preparedTeam1Sideplay,
              preparedTeam2Sideplay,
              preparedWinLogs,
              preparedMapsResultsLog,
              preparedBestOfMaps
            )
            props.onMatchResults(mapsResultsLog)
          }}
          disabled={!!props.mapResults.length}
        >
          <Ionicons name="play-skip-forward" size={24} color="black" />
        </TouchableOpacity>
      </View> */}
      </TouchableOpacity>
    </>
  )
}
