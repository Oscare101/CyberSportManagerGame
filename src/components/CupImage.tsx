import {SvgXml} from 'react-native-svg';
import {CupName} from '../constants/interfaces/tournamentInterfaces';
import Masters from '../assets/images/cups/Masters';
import Crown from '../assets/images/cups/Crown';
import WorldChampionship from '../assets/images/cups/WorldChampionship';
import WorldQualification from '../assets/images/cups/WorldQualification';
import Cyber from '../assets/images/cups/Cyber';
import Major from '../assets/images/cups/Major';
import Globe from '../assets/images/cups/Globe';
import Spring from '../assets/images/cups/Spring';
import Summer from '../assets/images/cups/Summer';
import Autumn from '../assets/images/cups/Autumn';
import Winter from '../assets/images/cups/Winter';
import Prestige1 from '../assets/images/cups/Prestige1';
import Prestige2 from '../assets/images/cups/Prestige2';
import Prestige3 from '../assets/images/cups/Prestige3';
import GrandSlam from '../assets/images/cups/GrandSlam';

export default function CupImage(props: {
  name: CupName | 'GrandSlam';
  size: number;
}) {
  const icons: Record<CupName | 'GrandSlam', any> = {
    Masters: <SvgXml xml={Masters()} width={props.size} height={props.size} />,
    Crown: <SvgXml xml={Crown()} width={props.size} height={props.size} />,
    WorldCupChampionship: (
      <SvgXml
        xml={WorldChampionship()}
        width={props.size}
        height={props.size}
      />
    ),
    WorldCupQualification: (
      <SvgXml
        xml={WorldQualification()}
        width={props.size}
        height={props.size}
      />
    ),
    Cyber: <SvgXml xml={Cyber()} width={props.size} height={props.size} />,
    Major: <SvgXml xml={Major()} width={props.size} height={props.size} />,
    Globe: <SvgXml xml={Globe()} width={props.size} height={props.size} />,
    Spring: <SvgXml xml={Spring()} width={props.size} height={props.size} />,
    Summer: <SvgXml xml={Summer()} width={props.size} height={props.size} />,
    Autumn: <SvgXml xml={Autumn()} width={props.size} height={props.size} />,
    Winter: <SvgXml xml={Winter()} width={props.size} height={props.size} />,
    Prestige1: (
      <SvgXml xml={Prestige1()} width={props.size} height={props.size} />
    ),
    Prestige2: (
      <SvgXml xml={Prestige2()} width={props.size} height={props.size} />
    ),
    Prestige3: (
      <SvgXml xml={Prestige3()} width={props.size} height={props.size} />
    ),
    GrandSlam: (
      <SvgXml xml={GrandSlam()} width={props.size} height={props.size} />
    ),
  };

  return icons[props.name];
}
