import {
  WinterBig,
  SpringBig,
  SummerBig,
  AutumnBig,
  WorldCupQualificationBig,
  WorldCupChampionshipBig,
  MajorBig,
  GlobeBig,
  MasterBig,
  GrandSlamBig,
  CrownBig,
  CyberBig,
  Prestige1Big,
  Prestige2Big,
  Prestige3Big,
} from '../constants/images/cups'

export default function CupsBigImage(props: { cup: string }) {
  switch (props.cup) {
    case 'Winter':
      return <WinterBig />
    case 'Spring':
      return <SpringBig />
    case 'Summer':
      return <SummerBig />
    case 'Autumn':
      return <AutumnBig />
    case 'Prestige1':
      return <Prestige1Big />
    case 'Prestige2':
      return <Prestige2Big />
    case 'Prestige3':
      return <Prestige3Big />
    case 'Master':
      return <MasterBig />
    case 'Crown':
      return <CrownBig />
    case 'WorldCupQualification':
      return <WorldCupQualificationBig />
    case 'WorldCupChampionship':
      return <WorldCupChampionshipBig />
    case 'Globe':
      return <GlobeBig />
    case 'Cyber':
      return <CyberBig />
    case 'Major':
      return <MajorBig />
    case 'GrandSlam':
      return <GrandSlamBig />
    default:
      return <></>
  }
}
