import { FlatList } from 'react-native-gesture-handler'
import {
  InRoundPlayer,
  MapResult,
  Team,
  Tournament,
} from '../../../constants/interfaces'
import { Dimensions, StyleSheet, Text, View } from 'react-native'
import { PlayerSumStat } from '../../functions/gameFunctions'
import TeamImage from '../TeamImage'
import RenderPlayerTournamentRating from './RenderPlayerTournamentRating'
import { useState } from 'react'
import MatchModal from './MatchModal'
import { GetPlayersByRating } from '../../functions/tournamentFunctions'

const width = Dimensions.get('screen').width

export default function TournamentRatingBlock(props: {
  tournament: Tournament
}) {
  const [openedPlayers, setOpenedPlayers] = useState<number[]>([])
  const [modalData, setModalData] = useState<any>(false)

  function ToggleOpenedPlayers(index: number) {
    if (openedPlayers.includes(index)) {
      const newOpenedPlayers = openedPlayers.filter(
        (player: number) => player !== index
      )
      setOpenedPlayers(newOpenedPlayers)
    } else {
      setOpenedPlayers([...openedPlayers, index])
    }
  }

  return (
    <>
      {modalData?.team1 ? (
        <MatchModal
          team1={modalData.team1}
          team2={modalData.team2}
          bestOfMaps={modalData.bestOfMaps}
          mapResults={modalData.mapResults}
          modal={!!modalData.mapResults.length}
          setModal={(value: boolean) => setModalData(false)}
          tournament={props.tournament}
          indexI={modalData.indexI}
          indexJ={modalData.indexJ}
        />
      ) : (
        <></>
      )}

      <FlatList
        scrollEnabled={false}
        data={GetPlayersByRating(props.tournament).sort(
          (first: any, second: any) =>
            second.ratings.reduce((a: any, b: any) => a + b.rating, 0) /
              second.ratings.length -
            first.ratings.reduce((a: any, b: any) => a + b.rating, 0) /
              first.ratings.length
        )}
        renderItem={({ item, index }) => (
          <RenderPlayerTournamentRating
            item={item}
            index={index}
            openedPlayers={openedPlayers}
            onRatingPress={(value: number) => ToggleOpenedPlayers(value)}
            openModal={(
              team1: Team,
              team2: Team,
              mapResults: MapResult[],
              indexI: number,
              indexJ: number
            ) => {
              setModalData({
                team1: team1,
                team2: team2,
                bestOfMaps: 0,
                mapResults: mapResults,
                tournament: props.tournament,
                indexI: indexI,
                indexJ: indexJ,
              })
            }}
            currentTournamentGrid={props.tournament.grid}
          />
        )}
      />
    </>
  )
}
