import useSWR, { preload } from 'swr';

import { API_URL } from '@/constants';
import {
  Competition,
  Judge,
  Pilot,
  Season,
  SwrKey,
  Team,
  Tricks,
} from '@/types/project';

export const fetcher = (...args: Parameters<typeof fetch>) =>
  fetch(...args).then((res) => {
    if (!res.ok) throw new Error(`API returned code ${res.status}`);
    return res.json();
  });

export const swrPreload = (key: SwrKey) =>
  preload(`${API_URL}/${key}/`, fetcher);

export const usePilots = () => {
  const { data, error, isLoading, isValidating } = useSWR<Pilot[]>(
    `${API_URL}/pilots/`,
    fetcher,
  );

  return {
    pilots: data,
    pilotsLoading: isLoading,
    pilotsError: error,
    pilotsValidating: isValidating,
  };
};

export const usePilot = (civlid: number | undefined) => {
  const { data, error, isLoading, isValidating } = useSWR(
    civlid !== undefined ? `${API_URL}/pilots/${civlid}` : null,
    fetcher,
  );

  return {
    pilot: data,
    pilotLoading: isLoading,
    pilotError: error,
    pilotValidating: isValidating,
  };
};

export const useTeams = () => {
  const { data, error, isLoading, isValidating } = useSWR<Team[]>(
    `${API_URL}/teams/`,
    fetcher,
  );

  return {
    teams: data,
    teamsLoading: isLoading,
    teamsError: error,
    teamsValidating: isValidating,
  };
};

export const useTeam = (id: string | undefined) => {
  const { data, error, isLoading, isValidating } = useSWR<Team>(
    id !== undefined ? `${API_URL}/teams/${id}` : null,
    fetcher,
  );

  return {
    team: data,
    teamLoading: isLoading,
    teamError: error,
    teamValidating: isValidating,
  };
};

export const useJudges = () => {
  const { data, error, isLoading, isValidating } = useSWR<Judge[]>(
    `${API_URL}/judges/`,
    fetcher,
  );

  return {
    judges: data,
    judgesLoading: isLoading,
    judgesError: error,
    judgesValidating: isValidating,
  };
};

export const useJudge = (id: string | undefined) => {
  const { data, error, isLoading, isValidating } = useSWR<Judge>(
    id !== undefined ? `${API_URL}/judges/${id}` : null,
    fetcher,
  );

  return {
    judge: data,
    judgeLoading: isLoading,
    judgeError: error,
    judgeValidating: isValidating,
  };
};

export const useCompetitions = () => {
  const { data, error, isLoading, isValidating } = useSWR<Competition[]>(
    `${API_URL}/competitions/`,
    fetcher,
  );

  return {
    competitions: data,
    compsLoading: isLoading,
    compsError: error,
    compsValidating: isValidating,
  };
};

export const useCompetition = (code: string | undefined) => {
  const { data, error, isLoading, isValidating } = useSWR<Competition>(
    code !== undefined ? `${API_URL}/competitions/${code}` : null,
    fetcher,
  );

  return {
    competition: data,
    compLoading: isLoading,
    compError: error,
    compValidating: isValidating,
  };
};

export const useSeasons = () => {
  const { data, error, isLoading, isValidating } = useSWR<Season[]>(
    `${API_URL}/seasons/`,
    fetcher,
  );

  return {
    seasons: data,
    seasonsLoading: isLoading,
    seasonsError: error,
    seasonsValidating: isValidating,
  };
};

export const useSeason = (code: string | undefined) => {
  const { data, error, isLoading, isValidating } = useSWR<Season>(
    code !== undefined ? `${API_URL}/seasons/${code}` : null,
    fetcher,
  );

  return {
    season: data,
    seasonLoading: isLoading,
    seasonError: error,
    seasonValidating: isValidating,
  };
};

export const useTricks = () => {
  const { data, error, isLoading, isValidating } = useSWR<Tricks>(
    `${API_URL}/tricks/`,
    fetcher,
  );

  return {
    tricks: data,
    tricksLoading: isLoading,
    tricksError: error,
    tricksValidating: isValidating,
  };
};
