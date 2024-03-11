import { Dimensions, Text, TouchableOpacity, View } from 'react-native'
import { MapResult } from '../../../constants/interfaces'

interface MatchStatProps {
  mapsResults: MapResult[]
  mapsResultsToShow: number
  setMapsResultsToShow: any
}

const width = Dimensions.get('screen').width

export default function MatchStatPerMapBlock(props: MatchStatProps) {
  const dataTorender: string[] = [
    'All maps',
    ...props.mapsResults.map(
      (map: MapResult) => `${map.team1Score}-${map.team2Score}`
    ),
  ]
  return (
    <View
      style={{
        width: '95%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        borderRadius: width * 0.02,
        padding: '1%',
        margin: width * 0.005,
      }}
    >
      {dataTorender.map((item: string, index: number) => (
        <TouchableOpacity
          key={index}
          style={{
            width: `${100 / (props.mapsResults.length + 1)}%`,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor:
              index === props.mapsResultsToShow ? '#e5e5e5' : '#00000000',
            borderRadius: width * 0.01,
          }}
          activeOpacity={0.8}
          onPress={() => {
            props.setMapsResultsToShow(index)
          }}
        >
          <Text>{item}</Text>
        </TouchableOpacity>
      ))}
    </View>
  )
}
