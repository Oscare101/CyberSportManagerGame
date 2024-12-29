import {ArmorType} from './armorInterfaces';
import {GunName} from './gunInterfaces';
import {NadeName} from './nadeInterfaces';
import {PlayerRole, PlayerStats} from './playerInterfaces';
import {TeamId, TeamName} from './teamInterfaces';

export interface InMatchPlayer {
  metrics: {
    kill: number;
    death: number;
    roundsWithKAST: number[];
    totalDamage: number;
    impact: {
      entry: number;
      double: number;
      triple: number;
      quadro: number;
      ace: number;
      '1v1': number;
      '1v2': number;
      '1v3': number;
      '1v4': number;
      '1v5': number;
    };
  };
  inventory: {
    health: number;
    armor: {
      health: number;
      type: ArmorType;
    };
    gun: GunName;
    nades: NadeName[];
    cash: number;
  };
  stats: PlayerStats;
  team: TeamId;
  role: PlayerRole;
}

export interface InMatchTeam {
  name: TeamName;
  players: InMatchPlayer[];
}

export interface MapResult {
  team1Players: InMatchPlayer[];
  team2Players: InMatchPlayer[];
  // team1Id: TeamId; // TODO
  // team2Id: TeamId;
  team1Score: number;
  team2Score: number;
  roundWinLogs: string[];
}

export interface MatchResult {
  resultTeam1Players: InMatchPlayer[];
  resultTeam2Players: InMatchPlayer[];
  mapsResultsLog: MapResult[];
}
