import { Dimensions, FlatList, Text, View } from 'react-native'
import nades from '../constants/nades'
import NadeImage from './NadeImage'

const width = Dimensions.get('screen').width

export default function NadesBlock(props: any) {
  function RenderNadeItem({ item }: any) {
    return (
      <View
        style={{
          width: '50%',
          height: '50%',
          aspectRatio: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <View style={{ width: width * 0.03, height: width * 0.03 }}>
          <NadeImage name={item} />
        </View>
      </View>
    )
  }
  return (
    <FlatList
      style={{ height: '100%', aspectRatio: 1 }}
      numColumns={2}
      data={props.nades}
      renderItem={RenderNadeItem}
    />
  )
}
