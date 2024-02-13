import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { GetStageName } from '../../functions/tournamentFunctions'
import { Ionicons } from '@expo/vector-icons'
import MatchPairBlock from './MatchPairBlock'
import { MapResult, Tournament } from '../../constants/interfaces'
interface TournamentGridProps {
  tournament: Tournament
}

export default function TournamentGridBlock(props: TournamentGridProps) {
  function OnMatchResults(
    mapResults: MapResult[],
    indexI: number,
    indexJ: number
  ) {
    const newTournamentData = props.tournament.grid
    newTournamentData[indexI][indexJ] = {
      ...newTournamentData[indexI][indexJ],
      mapResults: mapResults,
    }
  }
  return (
    <ScrollView horizontal style={{ flex: 1 }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 40,
        }}
      >
        {props.tournament.grid ? (
          props.tournament.grid.map((grid: any, indexI: number) => (
            <View
              key={indexI}
              style={{
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'space-around',
              }}
            >
              <Text>{GetStageName(grid.length)}</Text>
              {grid.map((pair: any, indexJ: number) => (
                <MatchPairBlock
                  key={indexJ}
                  tournament={props.tournament}
                  indexI={indexI}
                  indexJ={indexJ}
                  team1={pair.team1}
                  team2={pair.team2}
                  bestOfMaps={3}
                  mapResults={pair.mapResults}
                  onSetModal={() => {}}
                  onMatchResults={(value: MapResult[]) => {
                    OnMatchResults(value, indexI, indexJ)
                  }}
                />
                // <View
                //   key={indexJ}
                //   style={{
                //     flexDirection: 'column',
                //     alignItems: 'flex-start',
                //     justifyContent: 'center',
                //     backgroundColor: '#fff',
                //     borderRadius: 10,
                //     elevation: 5,
                //     width: 120,
                //     padding: 5,
                //     margin: 5,
                //   }}
                // >
                //   <Text
                //     style={{
                //       fontSize: 16,
                //       // opacity:
                //       //   pair.score.length && pair.winner === pair.team2
                //       //     ? 0.3
                //       //     : 1,
                //     }}
                //   >
                //     {/* {pair.score
                //         ? pair.score.split('-')[0]
                //         : GetScore(pair.team1, log)}{' '} */}
                //     | {pair.team1.name}
                //   </Text>
                //   <View
                //     style={{
                //       width: '100%',
                //       height: 1,
                //       backgroundColor: '#eee',
                //     }}
                //   />
                //   <Text
                //     style={{
                //       fontSize: 16,
                //       // opacity:
                //       //   pair.score.length && pair.winner === pair.team1
                //       //     ? 0.3
                //       //     : 1,
                //     }}
                //   >
                //     {pair.score
                //         ? pair.score.split('-')[1]
                //         : GetScore(pair.team1, log)}{' '}
                //     | {pair.team2.name}
                //   </Text>
                //   {pair.team1 && pair.team2 && !pair.score ? (
                //     <View style={styles.gridButtonBlock}>
                //       <TouchableOpacity
                //         style={[
                //           styles.gridButton,
                //           { backgroundColor: '#9dbef2' },
                //         ]}
                //         activeOpacity={0.8}
                //         onPress={() => {
                //           // setGridCell({ grid: indexI, pair: indexJ })
                //           // if (log.length) {
                //           //   setGameScreen(true)
                //           // } else {
                //           //   StartGamePair(pair)
                //           //   setGameScreen(true)
                //           // }
                //         }}
                //       >
                //         <Ionicons name="play-forward" size={24} color="black" />
                //       </TouchableOpacity>
                //       <TouchableOpacity
                //         style={[
                //           styles.gridButton,
                //           { backgroundColor: '#95deaf' },
                //         ]}
                //         activeOpacity={0.8}
                //         onLongPress={async () => {
                //           // await setGridCell({
                //           //   grid: indexI,
                //           //   pair: indexJ,
                //           // })
                //           // const teamsArr = StartGamePair(pair)
                //           // const instantWinnersArr = InstantGame(
                //           //   teamsArr[0],
                //           //   teamsArr[1]
                //           // )
                //           // MatchWinnerFunc(
                //           //   teamsArr[0],
                //           //   teamsArr[1],
                //           //   instantWinnersArr,
                //           //   {
                //           //     grid: indexI,
                //           //     pair: indexJ,
                //           //   }
                //           // )
                //           // AfterMatchPlayersDinamics(instantWinnersArr)
                //         }}
                //         onPress={() => {
                //           // setGridCell({
                //           //   grid: indexI,
                //           //   pair: indexJ,
                //           // })
                //           // StartGamePair(pair)
                //           // setInstantModal(true)
                //         }}
                //       >
                //         <Ionicons
                //           name="timer-outline"
                //           size={24}
                //           color="black"
                //         />
                //       </TouchableOpacity>
                //     </View>
                //   ) : (
                //     <></>
                //   )}
                // </View>
              ))}
            </View>
          ))
        ) : (
          <></>
        )}
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  gridButtonBlock: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  gridButton: {
    padding: 5,
    width: '48%',
    borderRadius: 5,

    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
