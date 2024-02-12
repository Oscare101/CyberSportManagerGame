import { Dimensions, StyleSheet, Text, View } from 'react-native'
import {
  CalculateMapWonByTeam,
  GetMapsWinners,
} from '../functions/gameFunctions'
import { InRoundPlayer, MapResult } from '../constants/interfaces'
import colors from '../constants/colors'
import rules from '../constants/rules'

interface MatchHeaderProps {
  team1: InRoundPlayer[]
  team2: InRoundPlayer[]
  team1Score: number
  team2Score: number
  bestOfMaps: number
  mapsResults: MapResult[]
  team1Side: 'CT' | 'T'
  team2Side: 'CT' | 'T'
  isGameActive: boolean
  overtimes: number
}

const width = Dimensions.get('screen').width

export default function MatchHeader(props: MatchHeaderProps) {
  const map = props.mapsResults.length
    ? props.mapsResults.length + (props.isGameActive ? 1 : 0) === 2
      ? '2nd'
      : '3rd'
    : '1st'

  return (
    <View style={styles.scoreHeader}>
      <Text style={styles.comment}>
        best of {rules.MRsystem * 2 + props.overtimes * 2}
        {props.overtimes ? `(+${props.overtimes * 2})` : ''}
      </Text>
      <Text style={styles.mapPoints}>
        (
        {CalculateMapWonByTeam(
          GetMapsWinners(props.mapsResults),
          props.team1[0].team
        )}
        )
      </Text>
      <Text style={styles.scoreTitle}>
        <Text
          style={{
            color: props.isGameActive
              ? props.team1Side === 'CT'
                ? colors.CTColor
                : colors.TColor
              : '#000',
          }}
        >
          {props.team1Score}
        </Text>{' '}
        -{' '}
        <Text
          style={{
            color: props.isGameActive
              ? props.team2Side === 'CT'
                ? colors.CTColor
                : colors.TColor
              : '#000',
          }}
        >
          {props.team2Score}
        </Text>
      </Text>
      <Text style={styles.mapPoints}>
        (
        {CalculateMapWonByTeam(
          GetMapsWinners(props.mapsResults),
          props.team2[0].team
        )}
        )
      </Text>
      <Text style={[styles.comment, { textAlign: 'right' }]}>{map} map</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  scoreHeader: {
    width: '95%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  scoreTitle: {
    fontSize: width * 0.06,
    paddingHorizontal: '5%',
    fontWeight: '800',
  },
  comment: {
    fontSize: width * 0.03,
    flex: 1,
  },
  mapPoints: {
    fontSize: width * 0.04,
    // flex: 1,
    opacity: 0.5,
  },
})
