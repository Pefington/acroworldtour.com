import { atom, getDefaultStore } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

interface ActiveSeasonCodes {
  [key: number]: string;
}

export const store = getDefaultStore();
export const apiStatusAtom = atom<'up' | 'working' | 'error' | 'down'>('up');

const currentYear = new Date().getFullYear();

export const activeNavAtom = atom('');
export const pageTitleAtom = atom('Acro World Tour');
export const pageDescriptionAtom = atom('The official web application of the Acro World Tour.');

export const youTubeConsentAtom = atomWithStorage('youtubeConsent', false);
export const activeYearAtom = atomWithStorage('activeYear', currentYear);
export const activeSeasonCodesAtom = atomWithStorage<ActiveSeasonCodes>('activeSeasonCodes', {});

export const compsAtom = atomWithStorage<API.Competition[] | []>('competitions', []);

export const lastAwtCompAtom = atomWithStorage<API.CompetitionWithResults | null>(
  'lastAwtComp',
  null,
);

export const lastAwqSeasonAtom = atomWithStorage<API.Season | null>('lastAwqSeason', null);

export const seasonsAtom = atomWithStorage<API.Season[] | []>('seasons', []);
export const pilotsAtom = atomWithStorage<API.Pilot[] | []>('pilots', []);
export const teamsAtom = atomWithStorage<API.Team[] | []>('teams', []);
export const judgesAtom = atomWithStorage<API.Judge[] | []>('judges', []);
export const tricksAtom = atomWithStorage<API.Trick[] | []>('tricks', []);
