import { useEffect } from 'react'
import { FlatList, Text, View } from 'react-native'
import { MMKV } from 'react-native-mmkv'
import { useDispatch } from 'react-redux'
import { updateTournaments } from '../../redux/tournaments'
import tournamentsDefault from '../../constants/tournamentsDefault'
import teamsDefault from '../../constants/teamsDefault'
import { updateTeams } from '../../redux/teams'
import globalStyles from '../../constants/globalStyles'

export const storage = new MMKV()

export default function LaunchScreen({ navigation }: any) {
  const dispatch = useDispatch()

  function SetData() {
    const tournamentsData = storage.getString('tournaments')
    if (tournamentsData !== undefined && JSON.parse(tournamentsData).length) {
      dispatch(updateTournaments(JSON.parse(tournamentsData)))
    } else {
      dispatch(updateTournaments(tournamentsDefault))
    }

    const teamsData = storage.getString('teams')
    if (teamsData !== undefined && JSON.parse(teamsData).length) {
      dispatch(updateTeams(JSON.parse(teamsData)))
    } else {
      dispatch(updateTeams(teamsDefault))
    }
  }

  useEffect(() => {
    // SetData()
    // navigation.reset({
    //   index: 0,
    //   routes: [{ name: 'NavigationApp' }],
    // })
  }, [])

  return <View style={[globalStyles.container, globalStyles.center]}></View>
}
