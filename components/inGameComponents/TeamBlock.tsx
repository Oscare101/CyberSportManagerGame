import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { InRoundPlayer, MapResult } from '../../constants/interfaces'
import RenderPlayer from './RenderPlayer'
import { CalculateRating } from '../../functions/gameFunctions'
import colors from '../../constants/colors'
import RenderPlayerResults from './RenderPlayerResult'
import TeamHeader from './TeamHeader'

interface teamBlockProps {
  team: InRoundPlayer[]
  rounds: number
  isGameActive: boolean
  teamSide: 'CT' | 'T'
  mapResults: MapResult[]
  teamNumber: number
}

const width = Dimensions.get('screen').width

export default function TeamBlock(props: teamBlockProps) {
  let teamResults: InRoundPlayer[] = props.team.map((player: InRoundPlayer) => {
    return {
      ...player,
      rating: CalculateRating(player, props.rounds),
    }
  })

  if (!props.isGameActive && props.mapResults.length > 1) {
    teamResults =
      props.mapResults[0][
        props.teamNumber === 1 ? 'team1Players' : 'team2Players'
      ]

    teamResults = teamResults.map((player: InRoundPlayer) => {
      return {
        ...player,
        rating:
          props.mapResults
            .map((map: MapResult) => {
              const mapPlayer: any = map[
                props.teamNumber === 1 ? 'team1Players' : 'team2Players'
              ].find(
                (playerData: InRoundPlayer) => playerData.name === player.name
              )

              return (
                (mapPlayer.rating || 0) +
                CalculateRating(mapPlayer, map.team1Score + map.team2Score)
                  .rating
              )
            })
            .reduce((sum: number, a: number) => sum + a, 0) /
          props.mapResults.length,
      }
    })
  }

  return (
    <View style={styles.teamColumn}>
      <TeamHeader
        teamName={props.team[0].team}
        teamSide={props.teamSide}
        result={!props.isGameActive && props.mapResults.length}
      />

      <FlatList
        data={
          !props.isGameActive && props.mapResults.length && teamResults.length
            ? teamResults.sort((a: any, b: any) => b.rating - a.rating)
            : (props.team as InRoundPlayer[])
        }
        renderItem={({ item }) =>
          !props.isGameActive && props.mapResults.length
            ? RenderPlayerResults(
                item,
                props.rounds,
                props.mapResults,
                props.teamNumber
              )
            : RenderPlayer(item, props.teamSide)
        }
      />
    </View>
  )
}

const styles = StyleSheet.create({
  teamColumn: {
    flexDirection: 'column',
    width: '95%',
  },
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

  teamName: { width: '20%', color: '#fff', fontSize: width * 0.035 },
  teamStat: {
    width: '10%',
    fontSize: width * 0.03,
    textAlign: 'center',
    color: '#fff',
    opacity: 0.8,
  },
})
