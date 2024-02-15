import { ScrollView, Text, View } from 'react-native'
import { GetStageName } from '../../functions/tournamentFunctions'
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
    <ScrollView
      showsHorizontalScrollIndicator={false}
      horizontal
      style={{ flex: 1 }}
    >
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 40,
        }}
      >
        {props.tournament.grid?.length ? (
          props.tournament.grid.map((grid: any, indexI: number) => (
            <View
              key={indexI}
              style={{
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'space-around',
              }}
            >
              <Text>{GetStageName(grid?.length)}</Text>
              {grid?.map((pair: any, indexJ: number) => (
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
