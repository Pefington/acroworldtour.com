import { components } from './awt.openapi';

type api = components['schemas'];

export type Pilot = api['PilotWithResults'];
export type Team = api['TeamExport'];
export type Judge = api['Judge'];
export type Competition = api['CompetitionPublicExportWithResults'];
export type CompetitionResult = api['CompetitionPilotResultsExport'];
export type Season = api['SeasonPublicExport'];
export type SeasonResult = api['models__seasons__SeasonResult'];
export type Trick = api['Trick'];

export type SwrKey =
  | 'pilots'
  | 'teams'
  | 'judges'
  | 'competitions'
  | 'seasons'
  | 'tricks';

type civlid = string | number;
type code = string;
type id = string | number;

export type SwrParam = civlid | code | id;

export type ApiResponse<T> = {
  data: T | null;
  isLoading: boolean;
  error: Error | null;
  isValidating: boolean;
  isApiDown: boolean;
};
