import { useEffect } from 'react'
import { View } from 'react-native'
import { MMKV } from 'react-native-mmkv'
import { useDispatch } from 'react-redux'
import { updateTournaments } from '../../redux/tournaments'
import tournamentsDefault from '../../constants/tournamentsDefault'

export const storage = new MMKV()

export default function LaunchScreen({ navigation }: any) {
  const dispatch = useDispatch()

  function SetData() {
    const tournamentsData = storage.getString('tournaments')
    console.log(tournamentsData)

    if (tournamentsData !== undefined && JSON.parse(tournamentsData).length) {
      console.log(JSON.parse(tournamentsData))

      dispatch(updateTournaments(JSON.parse(tournamentsData)))
    } else {
      dispatch(updateTournaments(tournamentsDefault))
    }
  }

  useEffect(() => {
    SetData()
    navigation.reset({
      index: 0,
      routes: [{ name: 'NavigationApp' }],
    })
  }, [])
  return <View></View>
}
