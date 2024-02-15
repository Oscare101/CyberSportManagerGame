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

  function PairTeam(pair: any) {
    return (
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          borderLeftWidth: width * 0.01,
          borderLeftColor:
            GetMatchWinner(props.mapResults) === pair.team.name
              ? colors.succesColor
              : GetMatchWinner(props.mapResults) === pair.opponent.name
              ? colors.errorColor
              : '#00000000',
          flex: 1,
          alignItems: 'center',
          justifyContent: 'flex-start',
          paddingLeft: '4%',
        }}
      >
        <Text
          style={[
            {
              opacity:
                props.mapResults.length &&
                GetMatchWinner(props.mapResults) !== pair.team.name
                  ? 0.3
                  : 1,
            },
          ]}
        >
          {props.mapResults.length
            ? GetMatchScoreByTeams(props.mapResults)[pair.team.name]
            : 0}{' '}
        </Text>
        <Text
          style={[
            {
              opacity:
                props.mapResults.length &&
                GetMatchWinner(props.mapResults) !== pair.team.name
                  ? 0.3
                  : 1,
              flex: 1,
            },
          ]}
          numberOfLines={1}
        >
          {pair.team.name}
        </Text>
      </View>
    )
  }

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
          onBack={() => setModal(false)}
          mapResults={props.mapResults}
        />
      </Modal>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          setModal(true)
        }}
        disabled={!props.team1 || !props.team2}
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
          elevation: 2,
          borderWidth: 1,
          borderColor: '#eee',
        }}
      >
        <PairTeam team={props.team1} opponent={props.team2} />
        <PairTeam team={props.team2} opponent={props.team1} />
      </TouchableOpacity>
    </>
  )
}
