import { Image } from 'react-native'

interface GunImageProps {
  name: string
}

const gunsImagePath: any = {
  'Desert Eagle': require(`../constants/images/guns/Desert Eagle.png`),
  'R8 Revolver': require(`../constants/images/guns/R8 Revolver.png`),
  'Five-SeveN': require(`../constants/images/guns/Five-SeveN.png`),
  'Tec-9': require(`../constants/images/guns/Tec-9.png`),
  'CZ75-Auto': require(`../constants/images/guns/CZ75-Auto.png`),
  'Dual Berettas': require(`../constants/images/guns/Dual Berettas.png`),
  P250: require(`../constants/images/guns/P250.png`),
  'Glock-18': require(`../constants/images/guns/Glock-18.png`),
  P2000: require(`../constants/images/guns/P2000.png`),
  'USP-S': require(`../constants/images/guns/USP-S.png`),
  Galil: require(`../constants/images/guns/Galil.png`),
  'AK-47': require(`../constants/images/guns/AK-47.png`),
  'M4A1-S': require(`../constants/images/guns/M4A1-S.png`),
  M4A4: require(`../constants/images/guns/M4A4.png`),
  'SG 553': require(`../constants/images/guns/SG 553.png`),
  AUG: require(`../constants/images/guns/AUG.png`),
  FAMAS: require(`../constants/images/guns/FAMAS.png`),
  AWP: require(`../constants/images/guns/AWP.png`),
  G3SG1: require(`../constants/images/guns/G3SG1.png`),
  'SSG 08': require(`../constants/images/guns/SSG 08.png`),
  'SCAR-20': require(`../constants/images/guns/SCAR-20.png`),
}

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
  )
}
