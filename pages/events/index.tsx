import { useEffect, useState } from "react";
import useSWR from "swr";

import EventsSection from "@/components/event/eventsSection";
import { useLayout } from "@/components/layout/layoutContext";
import YearSelector from "@/components/ui/yearSelector";
import { API_URL } from "@/constants";
import { components } from "@/types";

type Competition = components["schemas"]["CompetitionPublicExport"];
type Season = components["schemas"]["SeasonExport"];

const currentYear = new Date().getFullYear();

const Competitions = () => {
  const [selectedSeason, setSelectedSeason] = useState<Season | null>(null);
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const { setPageTitle, setPageDescription, setActiveNav } = useLayout();

  useEffect(() => {
    setPageTitle("Acro World Tour | Events");
    setPageDescription(`All the events of the Acro World Tour.`);
    setActiveNav("events");
  }, [setActiveNav, setPageDescription, setPageTitle]);

  useEffect(() => {
    setSelectedSeason(null);
  }, [selectedYear]);

  const {
    data: seasons,
    error: seasonsError,
    isLoading: seasonsLoading,
  } = useSWR<Season[]>(`${API_URL}/seasons/`);

  const {
    data: competitions,
    error: competitionsError,
    isLoading: competitionsLoading,
  } = useSWR<Competition[]>(`${API_URL}/competitions/`);

  const loading = seasonsLoading || competitionsLoading;
  const error = seasonsError || competitionsError;

  seasons?.sort((a, b) => a.name.localeCompare(b.name));

  const years = [
    ...new Set(
      competitions?.flatMap((comp) => [
        new Date(comp.start_date).getFullYear(),
        new Date(comp.end_date).getFullYear(),
      ]),
    ).add(currentYear),
  ].sort((a, b) => b - a);

  const filteredCompetitions = competitions?.filter((competition) => {
    const startYear = new Date(competition.start_date).getFullYear();
    const endYear = new Date(competition.end_date).getFullYear();
    return startYear === selectedYear || endYear === selectedYear;
  });

  filteredCompetitions?.sort((a, b) =>
    b.start_date.localeCompare(a.start_date),
  );

  const filteredSeasons = seasons?.filter(
    (season) => season.year === selectedYear,
  );

  const soloSeasons = filteredSeasons?.filter(
    (season) => season.type === "solo",
  );

  const synchroSeasons = filteredSeasons?.filter(
    (season) => season.type === "synchro",
  );

  const handleSelect = (season: Season) => {
    selectedSeason?.code === season.code
      ? setSelectedSeason(null)
      : setSelectedSeason(season);
  };

  return (
    <>
      <header className="flex flex-wrap items-baseline awt-header awt-center">
        <YearSelector
          years={years}
          list={filteredSeasons || []}
          pluralString={"seasons"}
          selectedYear={selectedYear}
          setSelectedYear={setSelectedYear}
        />
      </header>
      {soloSeasons && soloSeasons.length > 0 && (
        <EventsSection
          seasons={soloSeasons}
          loading={loading}
          error={error}
          handleSelect={handleSelect}
          selectedSeason={selectedSeason}
        />
      )}
      {synchroSeasons && synchroSeasons.length > 0 && (
        <EventsSection
          seasons={synchroSeasons}
          loading={loading}
          error={error}
          handleSelect={handleSelect}
          selectedSeason={selectedSeason}
        />
      )}
    </>
  );
};

export default Competitions;
