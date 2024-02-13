import { Dimensions, StyleSheet, Text, View } from 'react-native'

const width = Dimensions.get('screen').width

function GetHealthBackgroundColor(health: number) {
  switch (true) {
    case health > 80:
      return '#ACFF8F'
    case health > 60:
      return '#C7FF8F'
    case health > 40:
      return '#FFFB8F'
    case health > 20:
      return '#FFD98F'
    case health > 0:
      return '#FF8F8F'
    default:
      return '#00000000'
  }
}

export default function HealthBlock(props: any) {
  return (
    <View style={styles.healthBlock}>
      <Text style={styles.healthTitle}>{props.health}</Text>
      <View
        style={[
          styles.backGround,
          {
            width: `${props.health}%`,
            backgroundColor: GetHealthBackgroundColor(props.health),
          },
        ]}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  healthBlock: {
    width: '100%',
    height: '60%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: width * 0.005,
    overflow: 'hidden',
  },
  healthTitle: {
    fontSize: width * 0.03,
  },
  backGround: {
    position: 'absolute',
    left: 0,
    top: 0,
    height: '100%',
    zIndex: -1,
  },
})
