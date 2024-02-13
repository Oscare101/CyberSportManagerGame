import {
  Button,
  Dimensions,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { MapResult, Team, Tournament } from '../../constants/interfaces'
import MatchScreen from './MatchScreen'
import {
  GetMatchScoreByTeams,
  GetMatchWinner,
  InstantMatchResults,
  PrepareForMapResults,
} from '../../functions/gameFunctions'
import { useEffect, useState } from 'react'
import { Ionicons } from '@expo/vector-icons'
import colors from '../../constants/colors'
import MatchPairBlock from '../../components/tournamentComponents/MatchPairBlock'
import { MakeTournamentGrid } from '../../functions/tournamentFunctions'
import TournamentGridBlock from '../../components/tournamentComponents/TournamentGridBlock'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../redux'
import { updateTournaments } from '../../redux/tournaments'

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

const team3: Team = {
  name: 'NOVA 2',
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

const team4: Team = {
  name: 'Quazars 2',
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

const team5: Team = {
  name: 'NOVA 3',
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

const team6: Team = {
  name: 'Quazars 3',
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

const team7: Team = {
  name: 'NOVA 4',
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

const team8: Team = {
  name: 'Quazars 5',
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
  const tournaments = useSelector((state: RootState) => state.tournaments)
  const dispatch = useDispatch()

  // function MatchResults(mapsResultsLog: MapResult[]) {
  //   setMapResults(mapsResultsLog)
  //   console.log(GetMatchWinner(mapsResultsLog))
  //   console.log(GetMatchScoreByTeams(mapsResultsLog))
  // }

  function StartTournament() {
    const newTournamentsData: Tournament[] = [
      {
        season: 1,
        name: 'first',
        prizes: [],
        cup: 0,
        description: 'desription',
        grid: MakeTournamentGrid([
          team1,
          team2,
          team3,
          team4,
          team5,
          team6,
          team7,
          team8,
        ]),
        points: [],
      },
    ]
    dispatch(updateTournaments(newTournamentsData))
  }

  return (
    <View style={styles.container}>
      {tournaments.length ? (
        <TournamentGridBlock tournament={tournaments[0]} />
      ) : (
        <>
          <TouchableOpacity
            style={styles.startTournamentButton}
            activeOpacity={0.8}
            onPress={StartTournament}
          >
            <Text style={styles.startTournamentButtonTitle}>
              Start the tournament
            </Text>
            <Text style={styles.startTournamentButtonComment}>
              Prepare and shuffle teams
            </Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e5e5e5',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  startTournamentButton: {
    width: '95%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '3%',
    borderRadius: width * 0.02,
    backgroundColor: '#fff',
    marginBottom: width * 0.05,
    borderWidth: 2,
    borderColor: colors.CTColor,
  },
  startTournamentButtonTitle: { fontSize: width * 0.05 },
  startTournamentButtonComment: { fontSize: width * 0.03 },
})
