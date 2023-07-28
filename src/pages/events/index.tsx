import { useLayout } from "@state/layoutContext";
import { useUserContext } from "@state/userContext";
import { swrPreload, useAPI } from "@utils/swr";
import { useEffect } from "react";

import EventsSection from "@/src/features/event/eventsSection";
import YearSelector from "@/src/ui/yearSelector";
import { Competition, Season } from "@/types/api-types";

swrPreload("seasons");
swrPreload("competitions");

const currentYear = new Date().getFullYear();

const Competitions = () => {
  const { setPageTitle, setPageDescription, setActiveNav } = useLayout();
  const { activeYear } = useUserContext();

  useEffect(() => {
    setPageTitle("Acro World Tour | Events");
    setPageDescription(`All the events of the Acro World Tour.`);
    setActiveNav("events");
  }, [setPageTitle, setPageDescription, setActiveNav]);

  const {
    data: seasons,
    isLoading: seasonsLoading,
    error: seasonsError,
  } = useAPI<Season[]>("seasons");
  const {
    data: competitions,
    isLoading: compsLoading,
    error: compsError,
  } = useAPI<Competition[]>("competitions");

  const loading = seasonsLoading || compsLoading;
  const error = seasonsError || compsError;

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
    return startYear === activeYear || endYear === activeYear;
  });

  filteredCompetitions?.sort((a, b) =>
    b.start_date.localeCompare(a.start_date),
  );

  const filteredSeasons = seasons?.filter(
    (season) => season.year === activeYear,
  );

  const soloSeasons = filteredSeasons?.filter(
    (season) => season.type === "solo",
  );

  const synchroSeasons = filteredSeasons?.filter(
    (season) => season.type === "synchro",
  );

  // const offSeasonCompetitions = filteredCompetitions?.filter(
  //   (competition) => competition.seasons.length === 0,
  // );

  return (
    <>
      <header className="flex flex-wrap items-baseline awt-header awt-center">
        <YearSelector
          years={years}
          list={filteredSeasons || []}
          pluralString={"seasons"}
          loading={loading}
        />
      </header>
      {loading ||
        error ||
        (soloSeasons && soloSeasons.length > 0 && (
          <EventsSection
            seasons={soloSeasons}
            loading={loading}
            error={!!error}
          />
        ))}
      {synchroSeasons && synchroSeasons.length > 0 && (
        <EventsSection
          seasons={synchroSeasons}
          loading={loading}
          error={!!error}
        />
      )}
      {
        // competitions && (
        // <div className={cn("flex flex-wrap justify-evenly gap-8 awt-center")}>
        //   {competitions.map((competition) => (
        //     <EventCard key={competition.code} competition={competition} />
        //   ))}
        // </div>
        // )
      }
    </>
  );
};

export default Competitions;
