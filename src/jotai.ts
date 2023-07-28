import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

interface ActiveSeasonCodes {
  [key: number]: string;
}

const currentYear = new Date().getFullYear();

export const pageTitleAtom = atom('Acro World Tour');

export const pageDescriptionAtom = atom(
  'The official web application of the Acro World Tour.',
);

export const activeYearAtom = atomWithStorage('activeYear', currentYear);
export const activeSeasonCodesAtom = atomWithStorage<ActiveSeasonCodes>(
  'activeSeasons',
  {},
);
export const youTubeConsentAtom = atomWithStorage('youtubeConsent', false);

export const activeNavAtom = atom('');
