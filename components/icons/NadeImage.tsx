import { Image } from 'react-native'

interface NadeImageProps {
  name: string
}

const nadesImagePath: any = {
  Smoke: require(`../constants/images/nades/Smoke.png`),
  'HE Grenade': require(`../constants/images/nades/HE Grenade.png`),
  'Incendiary Grenade': require(`../constants/images/nades/Incendiary Grenade.png`),
  'Flash Bang': require(`../constants/images/nades/Flash Bang.png`),
}

export default function NadeImage(props: NadeImageProps) {
  return (
    <Image
      source={nadesImagePath[props.name]}
      style={{
        resizeMode: 'contain',
        width: '100%',
        height: '100%',
      }}
    />
  )
}
