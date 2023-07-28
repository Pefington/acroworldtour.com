import { Competition, Season } from "@api-types";
import EventsSection from "@event/EventsSection";
import { activeNavAtom, activeYearAtom, pageTitleAtom } from "@state";
import YearSelector from "@ui/YearSelector";
import { swrPreload, useAPI } from "@utils/swr";
import { useAtom, useSetAtom } from "jotai";
import { useEffect } from "react";

swrPreload("seasons");
swrPreload("competitions");

const currentYear = new Date().getFullYear();

const Competitions = () => {
  const setActiveNav = useSetAtom(activeNavAtom);
  const setPageTitle = useSetAtom(pageTitleAtom);
  const setPageDescription = useSetAtom(pageTitleAtom);

  const [activeYear] = useAtom(activeYearAtom);

  useEffect(() => {
    setPageTitle("Acro World Tour | Events");
    setPageDescription(`All the events of the Acro World Tour.`);
    setActiveNav("events");
  }, [setPageTitle, setPageDescription, setActiveNav]);

  const { data: seasons } = useAPI<Season[]>("seasons");
  const { data: competitions } = useAPI<Competition[]>("competitions");

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

  console.log(soloSeasons);

  return (
    <>
      <header className="flex flex-wrap items-baseline awt-header awt-center">
        <YearSelector
          years={years}
          list={filteredSeasons || []}
          pluralString={"seasons"}
        />
      </header>

      {soloSeasons?.length && <EventsSection seasons={soloSeasons} />}
      {synchroSeasons?.length && <EventsSection seasons={synchroSeasons} />}

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
