import { StyleSheet, View } from 'react-native'

import TournamentScreen from './screens/application/TournamentScreen'

export default function App() {
  return (
    <View style={styles.container}>
      {/* <FlatList
        data={Object.values(guns) as Gun[]}
        renderItem={RenderGunItem}
        showsVerticalScrollIndicator={false}
      /> */}
      <TournamentScreen />
    </View>
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
