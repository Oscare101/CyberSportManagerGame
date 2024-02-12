import { Dimensions, StyleSheet, Text, View } from 'react-native'
import { InRoundPlayer } from '../constants/interfaces'
import { CalculateRating } from '../functions/gameFunctions'
import colors from '../constants/colors'

const width = Dimensions.get('screen').width

export default function RenderPlayerResults(
  player: InRoundPlayer,
  rounds: number
) {
  const { ADR, DPR, KPR, APR, KAST, rating } = CalculateRating(player, rounds)

  return (
    <View
      style={[
        styles.playerBlock,
        {
          backgroundColor: '#00000010',
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
                ? colors.succesColor
                : player.kills < player.death
                ? colors.errorColor
                : '#000',
          },
        ]}
      >
        {player.kills > player.death ? '+' : ''}
        {player.kills - player.death}
      </Text>
      <Text style={styles.playerStat}>{ADR.toFixed(1)}</Text>
      <Text style={styles.playerStat}>{KAST.toFixed(1)}</Text>
      <Text style={styles.playerStat}>{rating}</Text>
    </View>
  )
}
const styles = StyleSheet.create({
  playerBlock: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: width * 0.07,
    paddingHorizontal: '2%',
    overflow: 'hidden',
    margin: width * 0.002,
    borderRadius: width * 0.01,
  },
  playerName: { width: '20%' },
  healthBlock: {
    width: '10%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  playerStat: {
    width: '10%',
    fontSize: width * 0.03,
    textAlign: 'center',
  },
})
