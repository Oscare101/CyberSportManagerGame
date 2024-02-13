import { Dimensions, Text, TouchableOpacity, View } from 'react-native'
import { MapResult, Team } from '../../constants/interfaces'
import {
  GetMatchScoreByTeams,
  GetMatchWinner,
  InstantMatchResults,
  PrepareForMapResults,
} from '../../functions/gameFunctions'
import colors from '../../constants/colors'
import { Ionicons } from '@expo/vector-icons'

interface MatchPairProps {
  team1: Team
  team2: Team
  bestOfMaps: number
  mapResults: MapResult[]
  onSetModal: any
  onMatchResults: any
}

const width = Dimensions.get('screen').width

export default function MatchPairBlock(props: MatchPairProps) {
  return (
    <View
      style={{
        width: width * 0.3,
        height: width * 0.2,
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
        }}
      >
        <Text>
          {props.mapResults.length
            ? GetMatchScoreByTeams(props.mapResults)[props.team1.name]
            : 0}
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
        }}
      >
        <Text>
          {props.mapResults.length
            ? GetMatchScoreByTeams(props.mapResults)[props.team2.name]
            : 0}
        </Text>
        <Text>{props.team2.name}</Text>
      </View>
      <View style={{ width: '100%', flexDirection: 'row' }}>
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
      </View>
    </View>
  )
}
