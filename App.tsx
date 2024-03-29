import 'react-native-gesture-handler'
import { StatusBar, StyleSheet } from 'react-native'
import { Provider, useSelector } from 'react-redux'
import { store } from './redux/store'
import { NavigationContainer } from '@react-navigation/native'
import MainNavigation from './navigation/MainNavigation'
import { MMKV } from 'react-native-mmkv'
import { RootState } from './redux'
import { useEffect } from 'react'

export const storage = new MMKV()

export default function App() {
  function AppComponent() {
    const tournaments: any = useSelector(
      (state: RootState) => state.tournaments
    )
    const teams: any = useSelector((state: RootState) => state.teams)
    useEffect(() => {
      if (tournaments.length) {
        storage.set('tournaments', JSON.stringify(tournaments))
      }
    }, [tournaments])

    useEffect(() => {
      if (teams.length) {
        storage.set('teams', JSON.stringify(teams))
      }
    }, [teams])

    return <StatusBar backgroundColor={'#fefefe'} barStyle={'dark-content'} />
  }

  return (
    <Provider store={store}>
      <AppComponent />
      <NavigationContainer>
        <MainNavigation />
      </NavigationContainer>
    </Provider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e5e5e5',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
