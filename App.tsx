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

const team1: Team = {
  name: 'NOVA',
  players: [
    {
      name: 'Oscare',
      stat: {
        role: 'sniper',
        reaction: 0.2,
        accuracy: 0.77,
        sprayControl: 0.82,
        flicksControl: 0.8,
        agression: 0.4,
      },
    },
    {
      name: 'Modest',
      stat: {
        role: 'rifler',
        reaction: 0.22,
        accuracy: 0.7,
        sprayControl: 0.82,
        flicksControl: 0.8,
        agression: 0.8,
      },
    },
  ],
}

const team2: Team = {
  name: 'Quazars',
  players: [
    {
      name: 'Header',
      stat: {
        role: 'rifler',
        reaction: 0.22,
        accuracy: 0.79,
        sprayControl: 0.85,
        flicksControl: 0.8,
        agression: 0.7,
      },
    },
    {
      name: 'Xantarex',
      stat: {
        role: 'rifler',
        reaction: 0.18,
        accuracy: 0.79,
        sprayControl: 0.85,
        flicksControl: 0.8,
        agression: 0.7,
      },
    },
  ],
}

export default function App() {
  return (
    <View style={styles.container}>
      {/* <FlatList
        data={Object.values(guns) as Gun[]}
        renderItem={RenderGunItem}
        showsVerticalScrollIndicator={false}
      /> */}
      <Button title="Prepate teams" onPress={() => Match(team1, team2)} />
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
