export type TournamentName =
  | 'Masters championship'
  | 'Crown tournamentship'
  | 'World Qualifications'
  | 'Globe championship'
  | 'Cyber Stage'
  | 'World Championship'
  | 'Major'
  | 'Spring'
  | 'Prestige Stage 1'
  | 'Summer'
  | 'Prestige Stage 2'
  | 'Autumn'
  | 'Prestige Stage 3'
  | 'Winter';

export type CupName =
  | 'Masters'
  | 'Crown'
  | 'WorldCupQualification'
  | 'Globe'
  | 'Cyber'
  | 'WorldCupChampionship'
  | 'Major'
  | 'Spring'
  | 'Prestige1'
  | 'Summer'
  | 'Prestige2'
  | 'Autumn'
  | 'Prestige3'
  | 'Winter';

export type TournamentTier = 1 | 2;
export type TournamentPeriod = 1 | 2 | 3 | 4 | 5 | 6 | 7;

export interface Tournament {
  season: number;
  name: TournamentName;
  id: number;
  prizes: any[];
  cup: CupName;
  description: string;
  grid: any;
  points: any[];
  tier: TournamentTier;
  period: TournamentPeriod;
}
