import {
  IslandTeamBig,
  JupiterTeamBig,
  NOVATeamBig,
  QuazarsTeamBig,
  SolidTeamBig,
  VangardTeamBig,
  EaglesTeamBig,
  KadaganTeamBig,
  YouthTeamBig,
  UniversityTeamBig,
  CanoeTeamBig,
  MoonTeamBig,
  DreamTeamBig,
  FiveTeamBig,
  SempraTeamBig,
  GuardiansTeamBig,
} from '../constants/images/teams'

export default function TeamImageBig(props: { team: string }) {
  const teams: any = {
    NOVA: <NOVATeamBig />,
    Quazars: <QuazarsTeamBig />,
    Eagles: <EaglesTeamBig />,
    Vangard: <VangardTeamBig />,
    Island: <IslandTeamBig />,
    Solid: <SolidTeamBig />,
    Kadagan: <KadaganTeamBig />,
    Jupiter: <JupiterTeamBig />,
    Youth: <YouthTeamBig />,
    Guardians: <GuardiansTeamBig />,
    University: <UniversityTeamBig />,
    Canoe: <CanoeTeamBig />,
    Dream: <DreamTeamBig />,
    Sempra: <SempraTeamBig />,
    Five: <FiveTeamBig />,
    Moon: <MoonTeamBig />,
  }
  return teams[props.team]
}
