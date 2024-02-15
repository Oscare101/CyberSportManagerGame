import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'

const width = Dimensions.get('screen').width

interface ConatentPickerProps {
  showContentsData: string[]
  showContent: string
  setShowContent: any
}

export default function ContentPickerBlock(props: ConatentPickerProps) {
  return (
    <View style={styles.contentBar}>
      {props.showContentsData.map((item: string, index: number) => (
        <TouchableOpacity
          key={index}
          style={{
            width: `${100 / props.showContentsData.length}%`,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: item === props.showContent ? '#fff' : '#00000000',
            borderRadius: width * 0.01,
            paddingVertical: width * 0.01,
          }}
          activeOpacity={0.8}
          onPress={() => {
            props.setShowContent(item)
          }}
        >
          <Text style={styles.contentBarTitle}>{item}</Text>
        </TouchableOpacity>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  contentBar: {
    width: '95%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#eee',
    borderRadius: width * 0.02,
    padding: '1%',
    margin: width * 0.005,
  },
  contentBarTitle: { fontSize: width * 0.035 },
})
