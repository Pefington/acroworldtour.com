export interface awt {
  Body_login_auth_login_post: {
    grant_type?: string;
    username: string;
    password: string;
    scope?: string;
    client_id?: string;
    client_secret?: string;
  };

  Body_post_file_files_new_post: {
    file: string;
  };

  Bonus: {
    name: string;
    bonus: number;
    sample_video?: string;
  };

  CompetitionConfig: {
    warning?: number;
    malus_repetition?: number;
    warnings_to_dsq?: number;
    judge_weights?: awt['JudgeWeights'];
    mark_percentages?: awt['MarkPercentages'];
    max_bonus_per_run?: awt['MaxBonusPerRun'];
  };

  CompetitionExport: {
    _id: string;
    name: string;
    code: string;
    start_date: string;
    end_date: string;
    location: string;
    published: boolean;
    type: awt['CompetitionType'];
    pilots: awt['Pilot'][];
    teams: awt['TeamExport'][];
    judges: awt['Judge'][];
    repeatable_tricks: awt['Trick'][];
    state: awt['CompetitionState'];
    config: awt['CompetitionConfig'];
    runs: awt['RunExport'][];
    image?: string;
    logo?: string;
    website?: string;
    seasons: string[];
  };

  CompetitionNew: {
    name: string;
    code?: string;
    start_date: string;
    end_date: string;
    location: string;
    published: boolean;
    type: awt['CompetitionType'];
    image?: string;
    logo?: string;
    website?: string;
    seasons?: string[];
  };

  CompetitionPilotResultsExport: {
    pilot?: awt['Pilot'];
    team?: awt['TeamExport'];
    result_per_run: awt['RunResultSummary'][];
    score: number;
  };

  CompetitionPublicExport: {
    _id: string;
    name: string;
    code: string;
    start_date: string;
    end_date: string;
    location: string;
    published: boolean;
    type: awt['CompetitionType'];
    state: awt['CompetitionState'];
    number_of_pilots: number;
    number_of_teams: number;
    number_of_judges: number;
    number_of_runs: number;
    image?: string;
    logo?: string;
    website?: string;
    seasons: string[];
  };

  CompetitionPublicExportWithResults: {
    _id: string;
    name: string;
    code: string;
    start_date: string;
    end_date: string;
    location: string;
    published: boolean;
    type: awt['CompetitionType'];
    state: awt['CompetitionState'];
    number_of_pilots: number;
    number_of_teams: number;
    number_of_judges: number;
    number_of_runs: number;
    image?: string;
    logo?: string;
    website?: string;
    seasons: string[];
    results: awt['CompetitionResultsExport'];
    pilots: awt['Pilot'][];
    teams: awt['TeamExport'][];
    judges: awt['Judge'][];
  };

  CompetitionResult: {
    competition: awt['CompetitionPublicExport'];
    rank: number;
  };

  CompetitionResultsExport: {
    final: boolean;
    type: string;
    results: {
      [key: string]: awt['CompetitionPilotResultsExport'][] | undefined;
    };
    runs_results: awt['RunResultsExport'][];
  };

  CompetitionState: 'init' | 'open' | 'closed';

  CompetitionType: 'solo' | 'synchro';

  FileID: {
    id: string;
  };

  FinalMark: {
    judges_mark: awt['JudgeMark'];
    technicity: number;
    bonus_percentage: number;
    technical: number;
    choreography: number;
    landing: number;
    synchro: number;
    bonus: number;
    score: number;
    warnings: string[];
    malus: number;
    notes?: string[];
  };

  FinalMarkExport: {
    judges_mark: awt['JudgeMarkExport'];
    technicity: number;
    bonus_percentage: number;
    technical: number;
    choreography: number;
    landing: number;
    synchro: number;
    bonus: number;
    score: number;
    warnings: string[];
    malus: number;
    notes: string[];
  };

  Flight: {
    pilot: number;
    team?: string;
    tricks: awt['UniqueTrick'][];
    marks: awt['JudgeMark'][];
    did_not_start?: boolean;
    final_marks?: awt['FinalMark'];
    published?: boolean;
    warnings: string[];
  };

  FlightExport: {
    pilot?: awt['Pilot'];
    team?: awt['TeamExport'];
    tricks: awt['UniqueTrick'][];
    marks: awt['JudgeMarkExport'][];
    did_not_start?: boolean;
    final_marks?: awt['FinalMarkExport'];
    published?: boolean;
    warnings: string[];
  };

  FlightNew: {
    tricks: string[];
    marks: awt['JudgeMark'][];
    did_not_start?: boolean;
    warnings?: string[];
  };

  GenderEnum: 'man' | 'woman' | 'none';

  HTTPValidationError: {
    detail?: awt['ValidationError'][];
  };

  Judge: {
    _id?: string;
    name: string;
    country: string;
    level: awt['JudgeLevel'];
    civlid?: number;
    deleted?: string;
  };

  JudgeLevel: 'trainee' | 'certified' | 'senior';

  JudgeMark: {
    judge: string;
    technical?: number;
    choreography?: number;
    landing?: number;
    synchro?: number;
  };

  JudgeMarkExport: {
    judge?: awt['Judge'];
    technical?: number;
    choreography?: number;
    landing?: number;
    synchro?: number;
  };

  JudgeWeights: {
    senior?: number;
    certified?: number;
    trainee?: number;
  };

  Link: {
    name: string;
    link: string;
  };

  MarkPercentageSolo: {
    technical?: number;
    choreography?: number;
    landing?: number;
  };

  MarkPercentageSynchro: {
    technical?: number;
    choreography?: number;
    landing?: number;
    synchro?: number;
  };

  MarkPercentages: {
    solo?: awt['MarkPercentageSolo'];
    synchro?: awt['MarkPercentageSynchro'];
  };

  MaxBonusPerRun: {
    twist?: number;
    reverse?: number;
    flip?: number;
  };

  Pilot: {
    _id: number;
    civlid: number;
    name: string;
    civl_link: string;
    country: string;
    about: string;
    social_links: awt['Link'][];
    sponsors: awt['Sponsor'][];
    photo: string;
    photo_highres?: string;
    background_picture: string;
    last_update?: string;
    rank: number;
    gender?: awt['GenderEnum'];
    is_awt?: boolean;
  };

  PilotWithResults: {
    _id: number;
    civlid: number;
    name: string;
    civl_link: string;
    country: string;
    about: string;
    social_links: awt['Link'][];
    sponsors: awt['Sponsor'][];
    photo: string;
    photo_highres?: string;
    background_picture: string;
    last_update?: string;
    rank: number;
    gender?: awt['GenderEnum'];
    is_awt?: boolean;
    competitions_results?: awt['CompetitionResult'][];
    seasons_results?: awt['models__pilots_with_results__SeasonResult'][];
  };

  RunExport: {
    state: awt['RunState'];
    pilots: awt['Pilot'][];
    teams: awt['TeamExport'][];
    judges: awt['Judge'][];
    repeatable_tricks: awt['Trick'][];
    config: awt['CompetitionConfig'];
    flights: awt['FlightExport'][];
  };

  RunResultSummary: {
    rank: number;
    score: number;
  };

  RunResultsExport: {
    final: boolean;
    type: string;
    results: {
      [key: string]: awt['FlightExport'][] | undefined;
    };
  };

  RunState: 'init' | 'open' | 'closed';

  Season: {
    _id?: string;
    name: string;
    code: string;
    year: number;
    image?: string;
    image_url?: string;
    country?: string;
    index?: number;
    deleted?: string;
  };

  SeasonExport: {
    _id: string;
    name: string;
    code: string;
    year: number;
    image?: string;
    country?: string;
    index?: number;
    type: awt['CompetitionType'];
    number_of_pilots: number;
    number_of_teams: number;
    competitions: awt['CompetitionExport'][];
    results: awt['SeasonResults'][];
  };

  SeasonPublicExport: {
    _id: string;
    name: string;
    code: string;
    year: number;
    image?: string;
    country?: string;
    index?: number;
    type: awt['CompetitionType'];
    number_of_pilots: number;
    number_of_teams: number;
    competitions: awt['CompetitionPublicExportWithResults'][];
    results: awt['SeasonResults'][];
    competitions_results: {
      [key: string]: awt['CompetitionPilotResultsExport'][] | undefined;
    };
  };

  SeasonResults: {
    type: string;
    results: awt['models__seasons__SeasonResult'][];
  };

  Sponsor: {
    name: string;
    link: string;
    img: string;
  };

  Status: {
    project: string;
    version: string;
  };

  Team: {
    _id?: string;
    name: string;
    pilots: number[];
    deleted?: string;
  };

  TeamExport: {
    _id: string;
    name: string;
    pilots: awt['Pilot'][];
  };

  Trick: {
    _id?: string;
    name: string;
    acronym: string;
    solo: boolean;
    synchro: boolean;
    directions: string[];
    technical_coefficient: number;
    bonuses: awt['Bonus'][];
    bonus_constraints?: string[][];
    first_maneuver?: number;
    no_first_maneuver?: number;
    last_maneuver?: number;
    no_last_maneuver?: number;
    tricks?: awt['UniqueTrick'][];
    repeatable?: boolean;
    deleted?: string;
    sample_video?: string;
  };

  UniqueTrick: {
    name: string;
    acronym: string;
    technical_coefficient: number;
    bonus: number;
    bonus_types: string[];
    base_trick: string;
    uniqueness: string[];
  };

  ValidationError: {
    loc: (string | number)[];
    msg: string;
    type: string;
  };
  models__pilots_with_results__SeasonResult: {
    season: awt['Season'];
    rank: number;
  };
  models__seasons__SeasonResult: {
    pilot?: awt['Pilot'];
    team?: awt['TeamExport'];
    score: number;
  };
}
