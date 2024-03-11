import { Dimensions, StyleSheet, Text, View } from 'react-native'
import GunImage from '../GunImage'
import { Gun } from '../../../constants/interfaces'
import { Ionicons } from '@expo/vector-icons'

const width = Dimensions.get('screen').width

export default function RenderGunItem(item: any) {
  const gun: Gun = item.item

  return (
    <View style={styles.card}>
      <Text style={styles.gunTitle}>{gun.name}</Text>
      <Text style={styles.gunStat}>Price {gun.price}</Text>
      <Text style={styles.gunStat}>Kill Award {gun.killAward}</Text>
      <View>
        <Text style={styles.gunStat}>Price</Text>
        <Ionicons name="pricetag-outline" size={24} color="black" />
        <Text style={styles.gunStat}>{gun.price}</Text>
      </View>
      <View
        style={{
          width: '200%',
          height: '200%',
          position: 'absolute',
          left: '-50%',
          zIndex: -1,
          opacity: 0.2,
        }}
      >
        <GunImage name={gun.name} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    width: width * 0.9,
    borderRadius: width * 0.03,
    backgroundColor: '#fff',
    marginBottom: width * 0.01,
    padding: width * 0.02,
    overflow: 'hidden',
  },
  gunTitle: {
    fontSize: width * 0.05,
    fontWeight: '600',
  },
  gunStat: {
    fontSize: width * 0.05,
  },
})
