import { Dimensions, FlatList, StyleSheet, Text, View } from 'react-native'
import colors from '../constants/colors'

const width = Dimensions.get('screen').width

export default function TeamHeader(props: any) {
  const activeHeader = (
    <View
      style={[
        styles.teamBlock,
        {
          backgroundColor:
            props.teamSide === 'CT' ? colors.CTColor : colors.TColor,
        },
      ]}
    >
      <Text style={styles.teamName}>{props.teamName}</Text>
      <Text style={styles.teamStat}>+</Text>
      <Text style={styles.teamStat}>gun</Text>
      <Text style={styles.teamStat}>nades</Text>
      <Text style={styles.teamStat}>$</Text>
      <Text style={styles.teamStat}>armor</Text>
      <Text style={styles.teamStat}>K</Text>
      <Text style={styles.teamStat}>A</Text>
      <Text style={styles.teamStat}>D</Text>
    </View>
  )

  const resultHeader = (
    <View style={[styles.teamBlock]}>
      <Text style={[styles.teamName, { color: '#000' }]}>{props.teamName}</Text>
      <Text style={[styles.teamStat, { color: '#000' }]}>K-D</Text>
      <Text style={[styles.teamStat, { color: '#000' }]}>+/-</Text>
      <Text style={[styles.teamStat, { color: '#000' }]}>ADR</Text>
      <Text style={[styles.teamStat, { color: '#000' }]}>KAST</Text>
      <Text style={[styles.teamStat, { color: '#000' }]}>rating</Text>
    </View>
  )

  return <>{props.result ? resultHeader : activeHeader}</>
}

const styles = StyleSheet.create({
  teamBlock: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: width * 0.07,
    paddingHorizontal: '2%',
    overflow: 'hidden',
    margin: width * 0.002,
    borderRadius: width * 0.01,
    backgroundColor: '#00000020',
  },
  teamName: { width: '20%', color: '#fff', fontSize: width * 0.035 },
  teamStat: {
    width: '10%',
    fontSize: width * 0.03,
    textAlign: 'center',
    color: '#fff',
    opacity: 0.8,
  },
})
