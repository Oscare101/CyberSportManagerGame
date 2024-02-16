import { FlatList } from 'react-native-gesture-handler'
import {
  InRoundPlayer,
  MapResult,
  Tournament,
} from '../../constants/interfaces'
import { Dimensions, StyleSheet, Text, View } from 'react-native'
import { PlayerSumStat } from '../../functions/gameFunctions'
import TeamImage from '../TeamImage'
import RenderPlayerTournamentRating from './RenderPlayerTournamentRating'
import { useState } from 'react'

const width = Dimensions.get('screen').width

export default function TournamentRatingBlock(props: {
  tournament: Tournament
}) {
  const [openedPlayers, setOpenedPlayers] = useState<number[]>([])

  function GetPlayersByRating() {
    let allPlayers: any[] = []
    props.tournament.grid[0].forEach((pair: any) => {
      const team1 = pair.team1.players.map((player: any) => {
        return { name: player.name, team: pair.team1.name }
      })
      const team2 = pair.team2.players.map((player: any) => {
        return { name: player.name, team: pair.team2.name }
      })

      allPlayers = allPlayers.concat([...team1, ...team2])
    })

    let playersStat: any[] = []

    allPlayers.forEach((playerObj: any) => {
      const rating: any[] = []
      let mapsPlayed: number = 0
      props.tournament.grid.forEach((gridI: any[], indexI: number) => {
        gridI.forEach((gridJ: any, indexJ: number) => {
          if (gridJ.team1.name === playerObj.team && gridJ.mapResults.length) {
            rating.push({
              rating: PlayerSumStat(gridJ.mapResults, 1, playerObj.name).rating,
              opponentsTeam: gridJ.team2.name,
            })
            mapsPlayed += gridJ.mapResults.length
          } else if (
            gridJ.team2.name === playerObj.team &&
            gridJ.mapResults.length
          ) {
            //   PlayerSumStat(gridJ.mapResults, 2, playerObj.name).rating
            rating.push({
              rating: PlayerSumStat(gridJ.mapResults, 2, playerObj.name).rating,
              opponentsTeam: gridJ.team1.name,
            })
            mapsPlayed += gridJ.mapResults.length
          }
        })
      })
      playersStat.push({
        playerName: playerObj.name,
        team: playerObj.team,
        ratings: rating,
        mapsPlayed: mapsPlayed,
      })
    })

    return [...playersStat]
  }

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
    <FlatList
      scrollEnabled={false}
      data={GetPlayersByRating().sort(
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
          navigate={() => {}}
          currentTournamentGrid={props.tournament.grid}
        />
      )}
    />
  )
}
