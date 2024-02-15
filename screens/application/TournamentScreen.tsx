import {
  Dimensions,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { Team, Tournament } from '../../constants/interfaces'
import colors from '../../constants/colors'
import {
  AutoMatchColumn,
  MakeTournamentGrid,
  SetAllMatcherInColumn,
  UpdateGridAfterMatch,
} from '../../functions/tournamentFunctions'
import TournamentGridBlock from '../../components/tournamentComponents/TournamentGridBlock'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../redux'
import { updateTournaments } from '../../redux/tournaments'
import { useEffect, useState } from 'react'
import ContentPickerBlock from '../../components/tournamentComponents/ContentPickerBlock'
import TournamentInfoBlock from '../../components/tournamentComponents/TournamentInfoBlock'
import BackHeader from '../../components/tournamentComponents/BackHeader'
import rules from '../../constants/rules'
import {
  GetMatchWinner,
  InstantMatchResults,
  PrepareForMapResults,
} from '../../functions/gameFunctions'

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

export default function TournamentScreen({ navigation, route }: any) {
  const tournaments: Tournament[] = useSelector(
    (state: RootState) => state.tournaments
  )
  const dispatch = useDispatch()
  const [showContent, setShowContent] = useState<string>('Grid')

  function StartTournament() {
    const newTournamentsData: Tournament[] = tournaments.map(
      (t: Tournament) => {
        if (
          t.season === route.params.tournament.season &&
          t.period === route.params.tournament.period &&
          t.name === route.params.tournament.name
        ) {
          return {
            ...t,
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
          }
        } else {
          return t
        }
      }
    )

    dispatch(updateTournaments(newTournamentsData))
  }

  function GetCurrentTournament() {
    return tournaments.find(
      (t: Tournament) =>
        t.season === route.params.tournament.season &&
        t.period === route.params.tournament.period &&
        t.name === route.params.tournament.name
    ) as Tournament
  }

  useEffect(() => {
    dispatch(
      updateTournaments(
        AutoMatchColumn(GetCurrentTournament(), tournaments, bestOfMaps)
      )
    )
  }, [tournaments])

  return (
    <View style={styles.container}>
      <BackHeader tournamentName={route.params.tournament.name} />
      <TournamentInfoBlock tournament={route.params.tournament} />
      <ContentPickerBlock
        showContentsData={['Grid', 'Prize distribution']}
        showContent={showContent}
        setShowContent={(value: string) => setShowContent(value)}
      />

      {GetCurrentTournament() &&
      GetCurrentTournament()?.grid &&
      GetCurrentTournament()?.grid.length ? (
        <>
          {showContent === 'Grid' ? (
            <TournamentGridBlock
              tournament={GetCurrentTournament() as Tournament}
            />
          ) : (
            <></>
          )}
        </>
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
    backgroundColor: '#fefefe',
    alignItems: 'center',
    justifyContent: 'flex-start',
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
