import { Dimensions, FlatList, StyleSheet, View } from 'react-native'
import { InRoundPlayer, MapResult } from '../../../constants/interfaces'
import RenderPlayer from './RenderPlayer'
import { PlayerSumStat } from '../../functions/gameFunctions'
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
  return (
    <View style={styles.teamColumn}>
      <TeamHeader
        teamName={props.team[0].team}
        teamSide={props.teamSide}
        result={!props.isGameActive && props.mapResults.length}
      />

      <FlatList
        data={
          !props.isGameActive && props.mapResults.length
            ? props.team.sort(
                (a: any, b: any) =>
                  PlayerSumStat(props.mapResults, props.teamNumber, b.name)
                    .rating -
                  PlayerSumStat(props.mapResults, props.teamNumber, a.name)
                    .rating
              )
            : (props.team as InRoundPlayer[])
        }
        renderItem={({ item }) =>
          !props.isGameActive && props.mapResults.length
            ? RenderPlayerResults(item, props.mapResults, props.teamNumber)
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
