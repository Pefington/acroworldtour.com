/* eslint-disable no-unused-vars */
type api = import('@openapi').components['schemas'];

declare namespace API {
  type Pilot = api['PilotWithResults'];
  type Team = api['TeamExport'];
  type Judge = api['Judge'];
  type Competition = api['CompetitionPublicExport'];
  type CompetitionWithResults = api['CompetitionPublicExportWithResults'];
  type CompetitionResults = api['CompetitionResultsExport'];
  type Season = api['SeasonPublicExport'];
  type SeasonResults = api['models__seasons__SeasonResult'];
  type Trick = api['Trick'];
}
