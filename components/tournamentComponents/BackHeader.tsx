import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

interface BackHeaderProps {
  tournamentName: string
}

const width = Dimensions.get('screen').width

export default function BackHeader(props: BackHeaderProps) {
  const navigation = useNavigation()
  return (
    <View style={styles.backHeader}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => navigation.goBack()}
        style={styles.backButton}
      >
        <Ionicons name="chevron-back" size={width * 0.07} color="black" />
      </TouchableOpacity>
      <Text style={styles.backHeaderTitle}>{props.tournamentName}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  backHeader: {
    width: '95%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: width * 0.08,
  },
  backButton: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    aspectRatio: 1.2,
  },
  backHeaderTitle: { fontSize: width * 0.06, fontWeight: '500' },
})
