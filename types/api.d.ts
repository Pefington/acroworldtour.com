/* eslint-disable no-unused-vars */
type awt = import('@api-types').awt;

declare namespace API {
  type Pilot = awt['PilotWithResults'];
  type Team = awt['TeamExport'];
  type Judge = awt['Judge'];
  type Competition = awt['CompetitionPublicExport'];
  type CompetitionWithResults = awt['CompetitionPublicExportWithResults'];
  type CompetitionResults = awt['CompetitionResultsExport'];
  type Season = awt['SeasonPublicExport'];
  type SeasonResults = awt['models__seasons__SeasonResult'];
  type Trick = awt['Trick'];

  type Event = Season | Competition;
}
