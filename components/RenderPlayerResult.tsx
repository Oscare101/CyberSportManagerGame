import { Dimensions, StyleSheet, Text, View } from 'react-native'
import { InRoundPlayer, MapResult } from '../constants/interfaces'
import { CalculateRating } from '../functions/gameFunctions'
import colors from '../constants/colors'

const width = Dimensions.get('screen').width

export default function RenderPlayerResults(
  player: InRoundPlayer,
  rounds: number,
  mapResults: MapResult[],
  teamNumber: number
) {
  let playerStat: InRoundPlayer[] = []
  let mapRounds: number[] = []

  mapResults.forEach((map: MapResult) => {
    const mapPlayer: any = map[
      teamNumber === 1 ? 'team1Players' : 'team2Players'
    ].find((playerData: InRoundPlayer) => playerData.name === player.name)
    playerStat.push(mapPlayer)
    mapRounds.push(map.team1Score + map.team2Score)
  })

  const ADR = (
    playerStat
      .map((stat: InRoundPlayer, index: number) => {
        return CalculateRating(stat, mapRounds[index]).ADR
      })
      .reduce((sum: number, a: number) => sum + a, 0) / playerStat.length
  ).toFixed(1)

  const KAST = (
    playerStat
      .map((stat: InRoundPlayer, index: number) => {
        return CalculateRating(stat, mapRounds[index]).KAST
      })
      .reduce((sum: number, a: number) => sum + a, 0) / playerStat.length
  ).toFixed(1)

  const rating = (
    playerStat
      .map((stat: InRoundPlayer, index: number) => {
        return CalculateRating(stat, mapRounds[index]).rating
      })
      .reduce((sum: number, a: number) => sum + a, 0) / playerStat.length
  ).toFixed(2)

  const kills = playerStat.reduce(
    (sum: number, stat: InRoundPlayer) => sum + stat.kills,
    0
  )

  const death = playerStat.reduce(
    (sum: number, stat: InRoundPlayer) => sum + stat.death,
    0
  )

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
        {kills}-{death}
      </Text>
      <Text
        style={[
          styles.playerStat,
          {
            color:
              kills > death
                ? colors.succesColor
                : kills < death
                ? colors.errorColor
                : '#000',
          },
        ]}
      >
        {kills > death ? '+' : ''}
        {kills - death}
      </Text>
      <Text style={styles.playerStat}>{ADR}</Text>
      <Text style={styles.playerStat}>{KAST}</Text>
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
