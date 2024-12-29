import {Image} from 'react-native';
import {GunName} from '../constants/interfaces/gunInterfaces';

interface GunImageProps {
  name: GunName;
}

const gunsImagePath: Record<GunName, any> = {
  'Desert Eagle': require(`../assets/images/guns/Desert_Eagle.webp`),
  'R8 Revolver': require(`../assets/images/guns/R8_Revolver.webp`),
  'Five-SeveN': require(`../assets/images/guns/Five-SeveN.webp`),
  'Tec-9': require(`../assets/images/guns/Tec-9.webp`),
  'CZ75-Auto': require(`../assets/images/guns/CZ75-Auto.webp`),
  'Dual Berettas': require(`../assets/images/guns/Dual_Berettas.webp`),
  P250: require(`../assets/images/guns/P250.webp`),
  'Glock-18': require(`../assets/images/guns/Glock-18.webp`),
  P2000: require(`../assets/images/guns/P2000.webp`),
  'USP-S': require(`../assets/images/guns/USP-S.webp`),
  Galil: require(`../assets/images/guns/Galil.webp`),
  'AK-47': require(`../assets/images/guns/AK-47.webp`),
  'M4A1-S': require(`../assets/images/guns/M4A1-S.webp`),
  M4A4: require(`../assets/images/guns/M4A4.webp`),
  'SG 553': require(`../assets/images/guns/SG_553.webp`),
  AUG: require(`../assets/images/guns/AUG.webp`),
  FAMAS: require(`../assets/images/guns/FAMAS.webp`),
  AWP: require(`../assets/images/guns/AWP.webp`),
  G3SG1: require(`../assets/images/guns/G3SG1.webp`),
  'SSG 08': require(`../assets/images/guns/SSG_08.webp`),
  'SCAR-20': require(`../assets/images/guns/SCAR-20.webp`),
  'MAC-10': require(`../assets/images/guns/MAC-10.webp`),
  MP9: require(`../assets/images/guns/MP9.webp`),
  MP7: require(`../assets/images/guns/MP9.webp`),
  'UMP-45': require(`../assets/images/guns/UMP-45.webp`),
  P90: require(`../assets/images/guns/P90.webp`),
  'PP-Bizon': require(`../assets/images/guns/PP-Bizon.webp`),
};

export default function GunImage(props: GunImageProps) {
  return (
    <Image
      source={gunsImagePath[props.name]}
      style={{
        resizeMode: 'contain',
        width: '100%',
        height: '100%',
      }}
    />
  );
}
