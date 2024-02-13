import {
  Button,
  Dimensions,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { MapResult, Team } from '../../constants/interfaces'
import MatchScreen from './MatchScreen'
import {
  GetMatchScoreByTeams,
  GetMatchWinner,
  InstantMatchResults,
  PrepareForMapResults,
} from '../../functions/gameFunctions'
import { useState } from 'react'
import { Ionicons } from '@expo/vector-icons'
import colors from '../../constants/colors'
import MatchPairBlock from '../../components/tournamentComponents/MatchPairBlock'
import { MakeTournamentGrid } from '../../functions/tournamentFunctions'

const width = Dimensions.get('screen').width

const team1: Team = {
  name: 'NOVA',
  players: [
    {
      name: 'Oscare',
      stat: {
        role: 'sniper',
        reaction: 0.25,
        accuracy: 0.6,
        sprayControl: 0.62,
        flicksControl: 0.6,
      },
    },
    {
      name: 'Modest',
      stat: {
        role: 'rifler',
        reaction: 0.32,
        accuracy: 0.58,
        sprayControl: 0.6,
        flicksControl: 0.51,
      },
    },
    {
      name: 'Cloudy',
      stat: {
        role: 'capitan',
        reaction: 0.31,
        accuracy: 0.55,
        sprayControl: 0.5,
        flicksControl: 0.6,
      },
    },
    {
      name: 'Sky',
      stat: {
        role: 'rifler',
        reaction: 0.29,
        accuracy: 0.4,
        sprayControl: 0.69,
        flicksControl: 0.52,
      },
    },
    {
      name: 'Moon',
      stat: {
        role: 'support',
        reaction: 0.3,
        accuracy: 0.52,
        sprayControl: 0.52,
        flicksControl: 0.48,
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
        reaction: 0.29,
        accuracy: 0.6,
        sprayControl: 0.65,
        flicksControl: 0.6,
      },
    },
    {
      name: 'Xantarex',
      stat: {
        role: 'rifler',
        reaction: 0.32,
        accuracy: 0.48,
        sprayControl: 0.5,
        flicksControl: 0.52,
      },
    },
    {
      name: 'Long',
      stat: {
        role: 'capitan',
        reaction: 0.32,
        accuracy: 0.5,
        sprayControl: 0.52,
        flicksControl: 0.55,
      },
    },
    {
      name: 'Phoenix',
      stat: {
        role: 'support',
        reaction: 0.35,
        accuracy: 0.52,
        sprayControl: 0.48,
        flicksControl: 0.62,
      },
    },
    {
      name: 'Pall',
      stat: {
        role: 'sniper',
        reaction: 0.3,
        accuracy: 0.49,
        sprayControl: 0.55,
        flicksControl: 0.7,
      },
    },
  ],
}

const team4: Team = {
  name: 'NOVA',
  players: [
    {
      name: 'Oscare',
      stat: {
        role: 'sniper',
        reaction: 0.25,
        accuracy: 0.6,
        sprayControl: 0.62,
        flicksControl: 0.6,
      },
    },
    {
      name: 'Modest',
      stat: {
        role: 'rifler',
        reaction: 0.32,
        accuracy: 0.58,
        sprayControl: 0.6,
        flicksControl: 0.51,
      },
    },
    {
      name: 'Cloudy',
      stat: {
        role: 'capitan',
        reaction: 0.31,
        accuracy: 0.55,
        sprayControl: 0.5,
        flicksControl: 0.6,
      },
    },
    {
      name: 'Sky',
      stat: {
        role: 'rifler',
        reaction: 0.29,
        accuracy: 0.4,
        sprayControl: 0.69,
        flicksControl: 0.52,
      },
    },
    {
      name: 'Moon',
      stat: {
        role: 'support',
        reaction: 0.3,
        accuracy: 0.52,
        sprayControl: 0.52,
        flicksControl: 0.48,
      },
    },
  ],
}

const team3: Team = {
  name: 'Quazars',
  players: [
    {
      name: 'Header',
      stat: {
        role: 'rifler',
        reaction: 0.29,
        accuracy: 0.6,
        sprayControl: 0.65,
        flicksControl: 0.6,
      },
    },
    {
      name: 'Xantarex',
      stat: {
        role: 'rifler',
        reaction: 0.32,
        accuracy: 0.48,
        sprayControl: 0.5,
        flicksControl: 0.52,
      },
    },
    {
      name: 'Long',
      stat: {
        role: 'capitan',
        reaction: 0.32,
        accuracy: 0.5,
        sprayControl: 0.52,
        flicksControl: 0.55,
      },
    },
    {
      name: 'Phoenix',
      stat: {
        role: 'support',
        reaction: 0.35,
        accuracy: 0.52,
        sprayControl: 0.48,
        flicksControl: 0.62,
      },
    },
    {
      name: 'Pall',
      stat: {
        role: 'sniper',
        reaction: 0.3,
        accuracy: 0.49,
        sprayControl: 0.55,
        flicksControl: 0.7,
      },
    },
  ],
}
const bestOfMaps = 3
export default function TournamentScreen() {
  const [modal, setModal] = useState<boolean>(false)
  const [mapResults, setMapResults] = useState<MapResult[]>([])

  function MatchResults(mapsResultsLog: MapResult[]) {
    setMapResults(mapsResultsLog)
    console.log(GetMatchWinner(mapsResultsLog))
    console.log(GetMatchScoreByTeams(mapsResultsLog))
  }

  return (
    <View style={styles.container}>
      <Modal style={{ flex: 1 }} transparent visible={modal}>
        <MatchScreen
          onMatchResults={(value: MapResult[]) => {
            MatchResults(value)
            setModal(false)
          }}
          team1={team1}
          team2={team2}
          bestOfMaps={bestOfMaps}
        />
      </Modal>
      <MatchPairBlock
        team1={team1}
        team2={team2}
        bestOfMaps={bestOfMaps}
        onSetModal={(value: boolean) => setModal(value)}
        onMatchResults={(value: MapResult[]) => setMapResults(value)}
        mapResults={mapResults}
      />
      <Button title="make" onPress={() => MakeTournamentGrid([team1, team2])} />
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
