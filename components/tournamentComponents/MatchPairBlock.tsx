import { Dimensions, Modal, Text, TouchableOpacity, View } from 'react-native'
import { MapResult, Team, Tournament } from '../../constants/interfaces'
import {
  GetMatchScoreByTeams,
  GetMatchWinner,
  InstantMatchResultProps,
  InstantMatchResults,
  PrepareForMapResults,
} from '../../functions/gameFunctions'
import colors from '../../constants/colors'
import { Ionicons } from '@expo/vector-icons'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../redux'
import { updateTournaments } from '../../redux/tournaments'
import { UpdateGridAfterMatch } from '../../functions/tournamentFunctions'
import MatchScreen from '../../screens/application/MatchScreen'

interface MatchPairProps {
  team1: Team
  team2: Team
  indexI: number
  indexJ: number
  tournament: Tournament
  bestOfMaps: number
  mapResults: MapResult[]
  onSetModal: any
  onMatchResults: any
}

const width = Dimensions.get('screen').width

export default function MatchPairBlock(props: MatchPairProps) {
  const [modal, setModal] = useState<boolean>(false)
  const tournaments = useSelector((state: RootState) => state.tournaments)
  const dispatch = useDispatch()

  return (
    <>
      <Modal style={{ flex: 1 }} transparent visible={modal}>
        <MatchScreen
          onMatchResults={(value: MapResult[]) => {
            // MatchResults(value)
            setModal(false)
            let newTournamentData = UpdateGridAfterMatch(
              tournaments,
              props.tournament,
              props.indexI,
              props.indexJ,
              value,
              props.team1,
              props.team2
            )

            dispatch(updateTournaments(newTournamentData))
          }}
          team1={props.team1}
          team2={props.team2}
          bestOfMaps={props.bestOfMaps}
        />
      </Modal>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          setModal(true)
          // const mapsResultsLog = InstantMatchResults(
          //   PrepareForMapResults(
          //     props.team1,
          //     props.team2,
          //     props.bestOfMaps
          //   ) as InstantMatchResultProps
          // )

          // let newTournamentData = UpdateGridAfterMatch(
          //   tournaments,
          //   props.tournament,
          //   props.indexI,
          //   props.indexJ,
          //   mapsResultsLog,
          //   props.team1,
          //   props.team2
          // )

          // dispatch(updateTournaments(newTournamentData))
        }}
        disabled={!!props.mapResults.length}
        style={{
          width: width * 0.3,
          height: width * 0.15,
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: width * 0.01,
          overflow: 'hidden',
          backgroundColor: '#fff',
          margin: width * 0.02,
        }}
      >
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            borderLeftWidth: width * 0.01,
            borderLeftColor:
              GetMatchWinner(props.mapResults) === props.team1.name
                ? colors.succesColor
                : GetMatchWinner(props.mapResults) === props.team2.name
                ? colors.errorColor
                : '#00000000',
            flex: 1,
            alignItems: 'center',
            justifyContent: 'flex-start',
            paddingLeft: '2%',
          }}
        >
          <Text>
            {props.mapResults.length
              ? GetMatchScoreByTeams(props.mapResults)[props.team1.name]
              : 0}{' '}
          </Text>
          <Text
            style={[
              {
                opacity:
                  props.mapResults.length &&
                  GetMatchWinner(props.mapResults) !== props.team1.name
                    ? 0.3
                    : 1,
              },
            ]}
          >
            {props.team1.name}
          </Text>
        </View>
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            borderLeftWidth: width * 0.01,
            borderLeftColor:
              GetMatchWinner(props.mapResults) === props.team2.name
                ? colors.succesColor
                : GetMatchWinner(props.mapResults) === props.team1.name
                ? colors.errorColor
                : '#00000000',
            flex: 1,
            alignItems: 'center',
            justifyContent: 'flex-start',
            paddingLeft: '2%',
          }}
        >
          <Text>
            {props.mapResults.length
              ? GetMatchScoreByTeams(props.mapResults)[props.team2.name]
              : 0}{' '}
          </Text>
          <Text
            style={[
              {
                opacity:
                  props.mapResults.length &&
                  GetMatchWinner(props.mapResults) !== props.team2.name
                    ? 0.3
                    : 1,
              },
            ]}
          >
            {props.team2.name}
          </Text>
        </View>
        {/* <View style={{ width: '100%', flexDirection: 'row' }}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => props.onSetModal(true)}
          disabled={!!props.mapResults.length}
        >
          <Ionicons name="play" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            const {
              preparedTeam1Players,
              preparedTeam2Players,
              preparedScore1,
              preparedScore2,
              preparedOvertimes,
              preparedTeam1Sideplay,
              preparedTeam2Sideplay,
              preparedWinLogs,
              preparedMapsResultsLog,
              preparedBestOfMaps,
            } = PrepareForMapResults(props.team1, props.team2, props.bestOfMaps)

            const mapsResultsLog = InstantMatchResults(
              preparedTeam1Players,
              preparedTeam2Players,
              preparedScore1,
              preparedScore2,
              preparedOvertimes,
              preparedTeam1Sideplay,
              preparedTeam2Sideplay,
              preparedWinLogs,
              preparedMapsResultsLog,
              preparedBestOfMaps
            )
            props.onMatchResults(mapsResultsLog)
          }}
          disabled={!!props.mapResults.length}
        >
          <Ionicons name="play-skip-forward" size={24} color="black" />
        </TouchableOpacity>
      </View> */}
      </TouchableOpacity>
    </>
  )
}
