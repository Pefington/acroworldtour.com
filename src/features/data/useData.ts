import { compsAtom, judgesAtom, pilotsAtom, seasonsAtom, teamsAtom, tricksAtom } from '@data/jotai';
import { useAPI } from '@data/swr';
import { useSetAtom } from 'jotai';

export const useSeason = (code: string) => {
  const res = useAPI<API.Season>(`seasons/${code}`);
  return res;
};

export const useCompetition = (code: string) => {
  const res = useAPI<API.CompetitionWithResults>(`competitions/${code}`);
  return res;
};

export const usePilot = (code: string) => {
  const res = useAPI<API.Pilot>(`pilots/${code}`);
  return res;
};

export const useTeam = (name: string) => {
  const res = useAPI<API.Team>(`teams/${name}`);
  return res;
};

export const useJudge = (name: string) => {
  const res = useAPI<API.Judge>(`judges/${name}`);
  return res;
};

export const useUpdateSeasons = () => {
  const setSeasons = useSetAtom(seasonsAtom);
  useAPI<API.Season[]>('seasons', { onSuccess: (data) => setSeasons(data) });
};

export const useUpdateCompetitions = () => {
  const setComps = useSetAtom(compsAtom);
  useAPI<API.Competition[]>('competitions', { onSuccess: (data) => setComps(data) });
};

export const useUpdatePilots = () => {
  const setPilots = useSetAtom(pilotsAtom);
  useAPI<API.Pilot[]>('pilots', { onSuccess: (data) => setPilots(data) });
};

export const useUpdateTeams = () => {
  const setTeams = useSetAtom(teamsAtom);
  useAPI<API.Team[]>('teams', { onSuccess: (data) => setTeams(data) });
};

export const useUpdateJudges = () => {
  const setJudges = useSetAtom(judgesAtom);
  useAPI<API.Judge[]>('judges', { onSuccess: (data) => setJudges(data) });
};

export const useUpdateTricks = () => {
  const setTricks = useSetAtom(tricksAtom);
  useAPI<API.Trick[]>('tricks', { onSuccess: (data) => setTricks(data) });
};
