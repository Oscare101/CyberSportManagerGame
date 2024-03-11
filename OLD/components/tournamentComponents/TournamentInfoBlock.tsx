import { Dimensions, StyleSheet, Text, View } from 'react-native'
import CupsBigImage from '../../../components/icons/CupsBigImage'
import { Tournament } from '../../../constants/interfaces'

const width = Dimensions.get('screen').width

interface TournamentInfoProps {
  tournament: Tournament
}

export default function TournamentInfoBlock(props: TournamentInfoProps) {
  return (
    <View style={styles.tournamentInfoBlock}>
      <View style={styles.cupImage}>
        <CupsBigImage cup={props.tournament.cup} />
      </View>
      <View style={styles.tournamentInfoColumn}>
        <View style={styles.tournamentInfoStatBlock}>
          <Text style={styles.tournamentInfoComment}>Prize pool</Text>
          <Text style={styles.tournamentInfoStat}>
            {props.tournament.prizes
              .reduce((a: number, b: number) => a + b, 0)
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}{' '}
            $
          </Text>
        </View>
        <View style={styles.tournamentInfoStatBlock}>
          <Text style={styles.tournamentInfoComment}>Teams</Text>
          <Text style={styles.tournamentInfoStat}>
            {props.tournament.prizes.length}
          </Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  tournamentInfoBlock: {
    width: '100%',
    aspectRatio: 2,
    backgroundColor: '#eee',
    marginTop: width * 0.05,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom: width * 0.1,
  },
  tournamentInfoColumn: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    width: '50%',
    height: '100%',
  },
  cupImage: { position: 'absolute', left: width * 0.15, bottom: -width * 0.05 },
  tournamentInfoStatBlock: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tournamentInfoComment: {
    fontSize: width * 0.045,
    opacity: 0.8,
  },
  tournamentInfoStat: {
    fontSize: width * 0.06,
    fontWeight: '500',
  },
})
