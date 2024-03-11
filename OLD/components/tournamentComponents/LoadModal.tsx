import { Modal, Text, View } from 'react-native'
import MatchScreen from '../../application/MatchScreen'
import { UpdateGridAfterMatch } from '../../functions/tournamentFunctions'
import { updateTournaments } from '../../../redux/tournaments'
import { useDispatch, useSelector } from 'react-redux'
import { MapResult, Team, Tournament } from '../../../constants/interfaces'
import { RootState } from '../../../redux'

export default function LoadModal(props: { modal: boolean }) {
  const tournaments = useSelector((state: RootState) => state.tournaments)

  const dispatch = useDispatch()
  return (
    <Modal style={{ flex: 1, width: '100%' }} transparent visible={props.modal}>
      <View
        style={{
          flex: 1,
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#ff000020',
        }}
      >
        <Text>LOAD</Text>
      </View>
    </Modal>
  )
}
