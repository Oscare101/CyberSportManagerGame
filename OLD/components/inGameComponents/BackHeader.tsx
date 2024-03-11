import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'

import { Ionicons } from '@expo/vector-icons'
interface BackHeaderProps {
  onBack: any
}

const width = Dimensions.get('screen').width

export default function BackHeader(props: BackHeaderProps) {
  return (
    <View style={styles.scoreHeader}>
      <TouchableOpacity
        style={styles.backButton}
        activeOpacity={0.8}
        onPress={() => props.onBack()}
      >
        <Ionicons
          name="chevron-back-outline"
          size={width * 0.06}
          color="black"
        />
        <Text style={styles.title}>Back</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  scoreHeader: {
    width: '95%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: width * 0.08,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: width * 0.05,
    paddingLeft: '2%',
  },
})
