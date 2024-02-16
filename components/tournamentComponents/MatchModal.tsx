import { Modal } from 'react-native'
import MatchScreen from '../../screens/application/MatchScreen'
import { UpdateGridAfterMatch } from '../../functions/tournamentFunctions'
import { updateTournaments } from '../../redux/tournaments'
import { useDispatch, useSelector } from 'react-redux'
import { MapResult, Team, Tournament } from '../../constants/interfaces'
import { RootState } from '../../redux'

export default function MatchModal(props: {
  modal: boolean
  team1: Team
  team2: Team
  tournament: Tournament
  indexI: number
  indexJ: number
  bestOfMaps: number
  mapResults: MapResult[]
  setModal: any
}) {
  const tournaments = useSelector((state: RootState) => state.tournaments)

  const dispatch = useDispatch()
  return (
    <Modal style={{ flex: 1 }} transparent visible={props.modal}>
      <MatchScreen
        onMatchResults={(value: MapResult[]) => {
          // MatchResults(value)
          props.setModal(false)
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
        onBack={() => props.setModal(false)}
        mapResults={props.mapResults}
      />
    </Modal>
  )
}
