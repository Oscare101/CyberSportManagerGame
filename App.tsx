import {
  Dimensions,
  FlatList,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import guns from './constants/guns'
import { Gun } from './constants/interfaces'
import RenderGunItem from './components/RenderGunItem'

export default function App() {
  return (
    <View style={styles.container}>
      <FlatList
        data={Object.values(guns) as Gun[]}
        renderItem={RenderGunItem}
        showsVerticalScrollIndicator={false}
      />
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
