import { Dimensions, FlatList, StyleSheet, Text, View } from 'react-native'
import TeamImage from '../TeamImage'
import colors from '../../../constants/colors'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Ionicons } from '@expo/vector-icons'

const width = Dimensions.get('screen').width

export default function RenderPlayerTournamentRating(props: {
  item: any
  index: number
  openedPlayers: number[]
  onRatingPress: any
  openModal: any
  currentTournamentGrid: any
}) {
  const rating: number = +(
    props.item.ratings.reduce((a: any, b: any) => a + b.rating, 0) /
    props.item.ratings.length
  ).toFixed(2)

  function GetTournamentPair(team1: string, team2: string) {
    props.currentTournamentGrid.forEach((gridI: any[], indexI: number) => {
      gridI.map((gridJ: any, indexJ: number) => {
        if (
          (gridJ.team1.name === team1 || gridJ.team2.name === team1) &&
          (gridJ.team1.name === team2 || gridJ.team2.name === team2)
        ) {
          props.openModal(
            gridJ.team1,
            gridJ.team2,
            gridJ.mapResults,
            indexI,
            indexJ
          )
        }
      })
    })
  }

  function RenderMapRatings({ item }: any) {
    return (
      <TouchableOpacity
        style={styles.openedRatingBlock}
        activeOpacity={0.8}
        onPress={() => GetTournamentPair(props.item.team, item.opponentsTeam)}
      >
        <Ionicons name="open-outline" size={width * 0.035} color="black" />
        <Text style={styles.opponent}>against {item.opponentsTeam}</Text>
        <TeamImage team={item.opponentsTeam} />

        <Text
          style={[
            styles.rating,
            {
              color:
                item.rating > 1.1
                  ? colors.succesColor
                  : item.rating < 1
                  ? colors.errorColor
                  : colors.warningColor,
              fontSize: width * 0.035,
            },
          ]}
        >
          {item.rating}
        </Text>
      </TouchableOpacity>
    )
  }

  return (
    <>
      <TouchableOpacity
        style={styles.ratingBlock}
        activeOpacity={0.8}
        onPress={() => props.onRatingPress(props.index)}
      >
        <Text style={styles.number}>{props.index + 1}</Text>
        <TeamImage team={props.item.team} />
        <Text style={styles.name}>{props.item.playerName}</Text>
        {props.openedPlayers.includes(props.index) ? (
          <Ionicons name="chevron-up" size={width * 0.04} color="black" />
        ) : (
          <Ionicons name="chevron-down" size={width * 0.04} color="black" />
        )}
        <Text style={styles.mapPlayed}>{props.item.mapsPlayed} maps</Text>
        <Text
          style={[
            styles.rating,
            {
              color:
                rating > 1.1
                  ? colors.succesColor
                  : rating < 1
                  ? colors.errorColor
                  : colors.warningColor,
            },
          ]}
        >
          {rating}
        </Text>
      </TouchableOpacity>
      {props.openedPlayers.includes(props.index) ? (
        <>
          <View
            style={{
              width: '95%',
              height: 1,
              backgroundColor: '#eee',
              alignSelf: 'center',
              marginVertical: width * 0.01,
            }}
          />
          <FlatList data={props.item.ratings} renderItem={RenderMapRatings} />
        </>
      ) : (
        <></>
      )}
    </>
  )
}

const styles = StyleSheet.create({
  ratingBlock: {
    width: '95%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: width * 0.01,
  },
  number: { width: '7%', opacity: 0.6, fontSize: width * 0.03 },
  name: { flex: 1, paddingLeft: '3%', fontSize: width * 0.04 },
  mapPlayed: { width: '20%', textAlign: 'right', fontSize: width * 0.035 },
  rating: {
    width: '15%',
    marginLeft: '5%',
    fontSize: width * 0.04,
  },
  openedRatingBlock: {
    width: '95%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingVertical: width * 0.01,
    paddingLeft: '7%',
  },
  opponent: {
    flex: 1,
    textAlign: 'left',
    marginLeft: '5%',
    opacity: 0.6,
    fontSize: width * 0.035,
  },
})
