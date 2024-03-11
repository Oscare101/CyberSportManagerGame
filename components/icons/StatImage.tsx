import {
  ReactionLight,
  AccuracyLight,
  SprayLight,
  FlickLight,
  NadeLight,
  AggressionLight,
  TacticsLight,
  StaminaLight,
  ReactionDark,
  AccuracyDark,
  SprayDark,
  FlickDark,
  NadeDark,
  AggressionDark,
  TacticsDark,
  StaminaDark,
} from '../../constants/images/stats'

export default function StatImage(props: {
  stat: string
  theme: 'dark' | 'light'
}) {
  const stats: any = {
    light: {
      reaction: <ReactionLight />,
      accuracy: <AccuracyLight />,
      spray: <SprayLight />,
      flick: <FlickLight />,
      nade: <NadeLight />,
      aggression: <AggressionLight />,
      tactic: <TacticsLight />,
      stamina: <StaminaLight />,
    },
    dark: {
      reaction: <ReactionDark />,
      accuracy: <AccuracyDark />,
      spray: <SprayDark />,
      flick: <FlickDark />,
      nade: <NadeDark />,
      aggression: <AggressionDark />,
      tactic: <TacticsDark />,
      stamina: <StaminaDark />,
    },
  }
  return stats[props.theme][props.stat]
}
