import { compsAtom, seasonsAtom, store } from '@data/jotai';

export const getLastResultableEvent = (...events: API.Event[]) => {
  const sortedEvents = sortEventsByDate(...events);
  let lastEvent = sortedEvents.pop();

  while (lastEvent) {
    if (
      (isSeason(lastEvent) && isFinished(lastEvent)) ||
      (!isSeason(lastEvent) && lastEvent.state === 'closed')
    )
      return lastEvent;
  }
  return null;
};

export function sortEventsByDate(...events: API.Event[]) {
  return areSeasons(events)
    ? sortSeasonsByDate(events)
    : sortCompsByDate(events as API.Competition[]);
}

export function areSeasons(events: API.Event[]): events is API.Season[] {
  return events.every(isSeason);
}

export function isSeason(event: API.Event): event is API.Season {
  return 'year' in event;
}

export function sortSeasonsByDate(seasons: API.Season[]) {
  return seasons.sort((a, b) => a.year - b.year);
}

export function sortCompsByDate(comps: API.Competition[]) {
  return comps.sort((a, b) => {
    const aDate = new Date(a.start_date);
    const bDate = new Date(b.start_date);
    return aDate.getTime() - bDate.getTime();
  });
}

export function isFinished(event: API.Event) {
  return isSeason(event)
    ? event.competitions.every(({ state }) => state === 'closed')
    : event.state === 'closed';
}

export const getAllSeasonsFromString = (subString: string) =>
  store.get(seasonsAtom).filter(({ name }) => name.includes(subString));

export const getAllCompsFromString = (subString: string) =>
  store.get(compsAtom).filter(({ name }) => name.toLowerCase().includes(subString.toLowerCase()));

export const getLastResultableAwtEvent = () =>
  getLastResultableEvent(...getAllCompsFromString('awt'));

export const getLastResultableAwqEvent = () =>
  getLastResultableEvent(...getAllCompsFromString('awq'));

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

export const getCompCountry = (comp: API.Competition) => comp.location.split(', ').at(-1);

export const getCleanName = (name: string) => name.split(' ').slice(0, -1).join(' ');
