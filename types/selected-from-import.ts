import { components } from './openapi-import';

type api = components['schemas'];

export type Pilot = api['PilotWithResults'];
export type Team = api['TeamExport'];
export type Judge = api['Judge'];
export type Competition = api['CompetitionPublicExportWithResults'];
export type CompetitionResult = api['CompetitionPilotResultsExport'];
export type Season = api['SeasonPublicExport'];
export type SeasonResult = api['models__seasons__SeasonResult'];
export type Trick = api['Trick'];
