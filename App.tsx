import 'react-native-gesture-handler'
import { StyleSheet, View } from 'react-native'
import { Provider } from 'react-redux'
import { store } from './redux/store'
import TournamentsScreen from './screens/application/TournamentsScreen'
import { NavigationContainer } from '@react-navigation/native'
import MainNavigation from './navigation/MainNavigation'

export default function App() {
  return (
    <Provider store={store}>
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
