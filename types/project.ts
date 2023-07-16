import { components } from './awt.openapi';

export type Pilot = components['schemas']['PilotWithResults'];

export type Team = components['schemas']['TeamExport'];

export type Judge = components['schemas']['Judge'];

export type Competition =
  components['schemas']['CompetitionPublicExportWithResults'];
export type CompetitionResult =
  components['schemas']['CompetitionPilotResultsExport'];

export type Season = components['schemas']['SeasonPublicExport'];
export type SeasonResult =
  components['schemas']['models__seasons__SeasonResult'];

export type Tricks = components['schemas']['Trick'][];

export type SwrKey =
  | 'pilots'
  | 'teams'
  | 'judges'
  | 'competitions'
  | 'seasons'
  | 'tricks';
