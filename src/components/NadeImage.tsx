import {Image} from 'react-native';
import {NadeName} from '../constants/nadeInterfaces';

interface NadeImageProps {
  name: NadeName;
}

const nadesImagePath: Record<NadeName, any> = {
  Smoke: require(`../assets/images/nades/Smoke.webp`),
  Hegrenade: require(`../assets/images/nades/Hegrenade.webp`),
  Molotov: require(`../assets/images/nades/Molotov.webp`),
  Flashbang: require(`../assets/images/nades/Flashbang.webp`),
};

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
  );
}
