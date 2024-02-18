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
} from '../../functions/tournamentFunctions'
import TournamentGridBlock from '../../components/tournamentComponents/TournamentGridBlock'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../redux'
import { updateTournaments } from '../../redux/tournaments'
import { useEffect, useState } from 'react'
import ContentPickerBlock from '../../components/tournamentComponents/ContentPickerBlock'
import TournamentInfoBlock from '../../components/tournamentComponents/TournamentInfoBlock'
import BackHeader from '../../components/tournamentComponents/BackHeader'
import RenderPrizes from '../../components/tournamentComponents/RenserPrizes'
import { ScrollView } from 'react-native-gesture-handler'
import TournamentRatingBlock from '../../components/tournamentComponents/TournamentRatingBlock'
import LoadModal from '../../components/tournamentComponents/LoadModal'

const width = Dimensions.get('screen').width

const bestOfMaps = 3

export default function TournamentScreen({ navigation, route }: any) {
  const tournaments: Tournament[] = useSelector(
    (state: RootState) => state.tournaments
  )
  const teams: Team[] = useSelector((state: RootState) => state.teams)
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
            grid: MakeTournamentGrid(teams),
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

  function AutoMatch() {
    dispatch(
      updateTournaments(
        AutoMatchColumn(GetCurrentTournament(), tournaments, bestOfMaps)
      )
    )
  }

  useEffect(AutoMatch, [tournaments])

  return (
    <ScrollView
      style={{ flex: 1, width: '100%', backgroundColor: '#fefefe' }}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.container}>
        <BackHeader tournamentName={route.params.tournament.name} />
        <TournamentInfoBlock tournament={route.params.tournament} />
        <ContentPickerBlock
          showContentsData={['Grid', 'Prize distribution', 'Ratings']}
          showContent={showContent}
          setShowContent={(value: string) => setShowContent(value)}
        />
        {showContent === 'Prize distribution' ? (
          <RenderPrizes tournament={GetCurrentTournament()} />
        ) : (
          <></>
        )}

        {GetCurrentTournament() &&
        GetCurrentTournament()?.grid &&
        GetCurrentTournament()?.grid.length ? (
          <>
            {showContent === 'Grid' ? (
              <TournamentGridBlock
                tournament={GetCurrentTournament() as Tournament}
              />
            ) : showContent === 'Ratings' ? (
              <TournamentRatingBlock tournament={GetCurrentTournament()} />
            ) : (
              <></>
            )}
          </>
        ) : (
          <>
            {showContent === 'Grid' ? (
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
            ) : (
              <></>
            )}
          </>
        )}
      </View>
    </ScrollView>
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
