import { seasonsAtom, store } from '@data/jotai';

export const getLatestResultableFromSeason = (code: string): API.Event | null => {
  const latestSeason = sortSeasonsByDate(getSeasonsFromCode(code)).pop();
  if (!latestSeason) return null;

  const comps = sortCompsByDate(latestSeason.competitions);
  const latestComp = comps.reverse().find(({ state }) => state !== 'init') as API.CompetitionWithResults;

  console.log(getSeasonsFromCode('awt'));

  return latestComp ?? latestSeason;
};

export const getSeasonStop = (season: API.Season, comp: API.Competition) => {
  const seasonComps = sortCompsByDate(season.competitions);
  return seasonComps.indexOf(comp) + 1;
};

export function sortEventsByDate(...events: API.Event[]): API.Season[] | API.Competition[] {
  return areAllSeasons(events)
    ? sortSeasonsByDate(events)
    : sortCompsByDate(events as API.Competition[]);
}

export function sortSeasonsByDate(seasons: API.Season[]): API.Season[] {
  return seasons.sort((a, b) => a.year - b.year);
}

export function sortCompsByDate(comps: API.Competition[]): API.Competition[] {
  return comps.sort((a, b) => {
    const aDate = new Date(a.start_date);
    const bDate = new Date(b.start_date);
    return aDate.getTime() - bDate.getTime();
  });
}

export const areAllSeasons = (events: API.Event[]): events is API.Season[] =>
  events.every(isSeason);

export const isSeason = (event: API.Event): event is API.Season => 'year' in event;

export const hasStarted = (event: API.Event) =>
  isSeason(event)
    ? !(
        event.competitions.every(({ state }) => state === 'closed') ||
        event.competitions.every(({ state }) => state === 'init')
      )
    : event.state === 'open';

export const isFinished = (event: API.Event) =>
  isSeason(event)
    ? event.competitions.every(({ state }) => state === 'closed')
    : event.state === 'closed';

export const getSeasonsFromCode = (subString: string) =>
  store.get(seasonsAtom).filter(({ code }) => code.toLowerCase().includes(subString.toLowerCase()));

export const getCompCountry = (comp: API.Competition) => comp.location.split(', ').at(-1);

export const getCleanName = (name: string) => name.split(' ').slice(0, -1).join(' ');

export const getVerboseDates = (comp: API.Competition) => {
  const startDate = new Date(comp.start_date);
  const endDate = new Date(comp.end_date);

  const startDay = startDate.getDate();
  const endDay = endDate.getDate();

  const startMonth = startDate.toLocaleString('default', {
    month: 'long',
  });
  const endMonth = endDate.toLocaleString('default', {
    month: 'long',
  });

  const startYear = startDate.getFullYear();
  const endYear = endDate.getFullYear();

  return `${startDay} ${startMonth !== endMonth ? startMonth : ''} ${
    startYear !== endYear ? startYear : ''
  } to ${endDay} ${endMonth} ${endYear}`;
};
