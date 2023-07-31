/* eslint-disable no-unused-vars */
type api = import('@openapi').components['schemas'];

declare namespace API {
  type Pilot = api['PilotWithResults'];
  type Team = api['TeamExport'];
  type Judge = api['Judge'];
  type Competition = api['CompetitionPublicExportWithResults'];
  type CompetitionResult = api['CompetitionPilotResultsExport'];
  type Season = api['SeasonPublicExport'];
  type SeasonResult = api['models__seasons__SeasonResult'];
  type Trick = api['Trick'];
}
