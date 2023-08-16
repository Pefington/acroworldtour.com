import { atom, getDefaultStore } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

interface ActiveSeasonCodes {
  [key: number]: string;
}

const currentYear = new Date().getFullYear();

export const store = getDefaultStore();
export const apiStatusAtom = atom<'up' | 'busy' | 'down' | string>('up');

export const activeNavAtom = atom('');
export const pageTitleAtom = atom('Acro World Tour');
export const pageDescriptionAtom = atom('The official web application of the Acro World Tour.');

export const youTubeConsentAtom = atomWithStorage('youtubeConsent', false);
export const activeYearAtom = atomWithStorage('activeYear', currentYear);
export const activeSeasonCodesAtom = atomWithStorage<ActiveSeasonCodes>('activeSeasonCodes', {});

export const seasonsAtom = atomWithStorage<API.Season[] | []>('seasons', []);
export const compsAtom = atomWithStorage<API.Competition[] | []>('competitions', []);
export const pilotsAtom = atomWithStorage<API.Pilot[] | []>('pilots', []);
export const teamsAtom = atomWithStorage<API.Team[] | []>('teams', []);
export const judgesAtom = atomWithStorage<API.Judge[] | []>('judges', []);
export const tricksAtom = atomWithStorage<API.Trick[] | []>('tricks', []);
