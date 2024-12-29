import {TeamName} from './teamInterfaces';

export type PlayerRole = 'sniper' | 'rifler' | 'support' | 'captain';
export type PlayerStatus = 'free' | 'main' | 'benched';
export type PlaterId = number;

export type PlayerStats = {
  reaction: number;
  accuracy: number;
  sprayControl: number;
  flicksControl: number;
  nades: number;
  tactics: number;
  aggression: number;
  teamplay: number;
  experience: number;
  motivation: number;
};

export interface Player {
  name: string;
  id: PlaterId;
  role: PlayerRole;
  age: number; // TODO
  stats: PlayerStats;
  status: PlayerStatus;
  team: TeamName | 'none';
  contract: {
    salary: number;
    start: number;
    end: number;
  };
}
