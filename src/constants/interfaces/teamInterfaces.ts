import {PlaterId, Player} from './playerInterfaces';

export type TeamName = 'Nova' | 'Quazars';
export type TeamId = number;

export interface Advertisement {
  name: string;
  pay: number;
}

export interface Team {
  name: TeamName;
  id: TeamId;
  icon: string; // TODO
  players: PlaterId[];
  back: {
    cash: number;
  };
  revenue: {
    advertisement: Advertisement[]; // TODO
  };
}
