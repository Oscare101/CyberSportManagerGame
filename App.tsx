import {
  Button,
  Dimensions,
  FlatList,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import guns from './constants/guns'
import { Team } from './constants/interfaces'
import RenderGunItem from './components/RenderGunItem'
import { Match } from './functions/gameFunctions'
import MathScreen from './screens/application/MatchScreen'

export default function App() {
  return (
    <View style={styles.container}>
      {/* <FlatList
        data={Object.values(guns) as Gun[]}
        renderItem={RenderGunItem}
        showsVerticalScrollIndicator={false}
      /> */}
      <MathScreen />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#666',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
