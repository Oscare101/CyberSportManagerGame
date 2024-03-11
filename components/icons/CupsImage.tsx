import {
  Winter,
  Spring,
  Summer,
  Autumn,
  WorldCupQualification,
  WorldCupChampionship,
  Major,
  Globe,
  Master,
  GrandSlam,
  Crown,
  Cyber,
  Prestige1,
  Prestige2,
  Prestige3,
} from '../../constants/images/cups'

export default function CupsImage(props: { cup: string }) {
  switch (props.cup) {
    case 'Winter':
      return <Winter />
    case 'Spring':
      return <Spring />
    case 'Summer':
      return <Summer />
    case 'Autumn':
      return <Autumn />
    case 'Prestige1':
      return <Prestige1 />
    case 'Prestige2':
      return <Prestige2 />
    case 'Prestige3':
      return <Prestige3 />
    case 'Master':
      return <Master />
    case 'Crown':
      return <Crown />
    case 'WorldCupQualification':
      return <WorldCupQualification />
    case 'WorldCupChampionship':
      return <WorldCupChampionship />
    case 'Globe':
      return <Globe />
    case 'Cyber':
      return <Cyber />
    case 'Major':
      return <Major />
    case 'GrandSlam':
      return <GrandSlam />
    default:
      return <></>
  }
}
