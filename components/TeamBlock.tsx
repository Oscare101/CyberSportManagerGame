import { Dimensions, FlatList, StyleSheet, Text, View } from 'react-native'
import { InRoundPlayer } from '../constants/interfaces'
import RenderPlayer from './RenderPlayer'
import { CalculateRating } from '../functions/gameFunctions'
import colors from '../constants/colors'
import RenderPlayerResults from './RenderPlayerResult'
import TeamHeader from './TeamHeader'

interface teamBlockProps {
  team: InRoundPlayer[]
  rounds: number
  isGameActive: boolean
  teamSide: 'CT' | 'T'
}

const width = Dimensions.get('screen').width

export default function TeamBlock(props: teamBlockProps) {
  return (
    <>
      <TeamHeader
        teamName={props.team[0].team}
        teamSide={props.teamSide}
        result={!props.isGameActive}
      />
      <FlatList
        data={
          props.isGameActive
            ? (props.team as InRoundPlayer[])
            : (props.team.sort(
                (a: InRoundPlayer, b: InRoundPlayer) =>
                  CalculateRating(b, props.rounds).rating -
                  CalculateRating(a, props.rounds).rating
              ) as InRoundPlayer[])
        }
        renderItem={({ item }) =>
          props.isGameActive
            ? RenderPlayer(item, props.teamSide)
            : RenderPlayerResults(item, props.rounds)
        }
      />
    </>
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
  teamName: { width: '20%', color: '#fff', fontSize: width * 0.035 },
  teamStat: {
    width: '10%',
    fontSize: width * 0.03,
    textAlign: 'center',
    color: '#fff',
    opacity: 0.8,
  },
})
