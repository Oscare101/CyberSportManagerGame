import {
  Button,
  Dimensions,
  FlatList,
  Image,
  Modal,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import guns from './constants/guns'
import { MapResult, Team } from './constants/interfaces'
import RenderGunItem from './components/inGameComponents/RenderGunItem'
import MatchScreen from './screens/application/MatchScreen'
import {
  CalculateMapWonByTeam,
  GetMapsWinners,
  GetMatchScoreByTeams,
  GetMatchWinner,
  InstantMatchResults,
  PrepareForMapResults,
} from './functions/gameFunctions'
import { useState } from 'react'
import { Ionicons } from '@expo/vector-icons'
import colors from './constants/colors'

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
const bestOfMaps = 3
export default function App() {
  const [modal, setModal] = useState<boolean>(false)
  const [mapsResults, setMapsResults] = useState<MapResult[]>([])

  function MatchResults(mapsResultsLog: MapResult[]) {
    setMapsResults(mapsResultsLog)
    console.log(GetMatchWinner(mapsResultsLog))
    console.log(GetMatchScoreByTeams(mapsResultsLog))
  }

  return (
    <View style={styles.container}>
      {/* <FlatList
        data={Object.values(guns) as Gun[]}
        renderItem={RenderGunItem}
        showsVerticalScrollIndicator={false}
      /> */}
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

      <View
        style={{
          width: width * 0.3,
          height: width * 0.2,
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: width * 0.01,
          overflow: 'hidden',
          backgroundColor: '#fff',
        }}
      >
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            borderLeftWidth: 2,
            borderLeftColor:
              GetMatchWinner(mapsResults) === team1.name
                ? colors.succesColor
                : GetMatchWinner(mapsResults) === team2.name
                ? colors.errorColor
                : '#00000000',
            flex: 1,
            alignItems: 'center',
            justifyContent: 'flex-start',
          }}
        >
          <Text>
            {mapsResults.length
              ? GetMatchScoreByTeams(mapsResults)[team1.name]
              : 0}
          </Text>
          <Text>{team1.name}</Text>
        </View>
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            borderLeftWidth: 2,
            borderLeftColor:
              GetMatchWinner(mapsResults) === team2.name
                ? colors.succesColor
                : GetMatchWinner(mapsResults) === team1.name
                ? colors.errorColor
                : '#00000000',
            flex: 1,
            alignItems: 'center',
            justifyContent: 'flex-start',
          }}
        >
          <Text>
            {mapsResults.length
              ? GetMatchScoreByTeams(mapsResults)[team2.name]
              : 0}
          </Text>
          <Text>{team2.name}</Text>
        </View>
        <View style={{ width: '100%', flexDirection: 'row' }}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => setModal(true)}
            disabled={!!mapsResults.length}
          >
            <Ionicons name="play" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              const {
                preparedTeam1Players,
                preparedTeam2Players,
                preparedScore1,
                preparedScore2,
                preparedOvertimes,
                preparedTeam1Sideplay,
                preparedTeam2Sideplay,
                preparedWinLogs,
                preparedMapsResultsLog,
                preparedBestOfMaps,
              } = PrepareForMapResults(team1, team2, bestOfMaps)

              const mapsResultsLog = InstantMatchResults(
                preparedTeam1Players,
                preparedTeam2Players,
                preparedScore1,
                preparedScore2,
                preparedOvertimes,
                preparedTeam1Sideplay,
                preparedTeam2Sideplay,
                preparedWinLogs,
                preparedMapsResultsLog,
                preparedBestOfMaps
              )
              MatchResults(mapsResultsLog)
            }}
            disabled={!!mapsResults.length}
          >
            <Ionicons name="play-skip-forward" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>
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
