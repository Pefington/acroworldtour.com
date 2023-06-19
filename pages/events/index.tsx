// import classNames from "classnames";
import { useEffect, useState } from "react";
import useSWR from "swr";

import { useLayout } from "@/components/layout/layoutContext";
import FetchError from "@/components/ui/fetchError";
import FetchLoading from "@/components/ui/fetchLoading";
import YearSelector from "@/components/ui/yearSelector";
import { API_URL } from "@/constants";
import { components } from "@/types";

type Competition = components["schemas"]["CompetitionPublicExport"];
type Season = components["schemas"]["SeasonExport"];

const currentYear = new Date().getFullYear();

const Competitions = () => {
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const { setPageTitle, setPageDescription, setActiveNav } = useLayout();

  useEffect(() => {
    setPageTitle("Acro World Tour | Events");
    setPageDescription(`All the events of the Acro World Tour.`);
    setActiveNav("events");
  }, [setActiveNav, setPageDescription, setPageTitle]);

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

  if (seasonsLoading || competitionsLoading) return <FetchLoading />;
  if (competitionsError || seasonsError) return <FetchError />;
  if (!competitions || !seasons) return <h2>Competitions not found</h2>;

  const filteredCompetitions = competitions.filter((competition) => {
    const startYear = new Date(competition.start_date).getFullYear();
    const endYear = new Date(competition.end_date).getFullYear();
    return startYear === selectedYear || endYear === selectedYear;
  });

  const soloSeasons = seasons.filter((season) =>
    season.competitions.some((comp) =>
      filteredCompetitions.some(
        (filteredComp) => filteredComp.code === comp.code,
      ),
    ),
  );

  soloSeasons.sort(
    (a, b) =>
      b.year - a.year ||
      (a.index || 999) - (b.index || 999) ||
      a.name.localeCompare(b.name),
  );

  const offSeasonCompetitions = filteredCompetitions.filter(
    (competition) => competition.seasons.length === 0,
  );

  offSeasonCompetitions.sort((a, b) =>
    b.start_date.localeCompare(a.start_date),
  );

  const years = [
    ...new Set(
      competitions.flatMap((comp) => [
        new Date(comp.start_date).getFullYear(),
        new Date(comp.end_date).getFullYear(),
      ]),
    ).add(currentYear),
  ].sort((a, b) => b - a);

  return (
    <>
      <header className="header flex flex-wrap items-baseline">
        <YearSelector
          years={years}
          list={soloSeasons}
          pluralString={"Events"}
          selectedYear={selectedYear}
          setSelectedYear={setSelectedYear}
        />
      </header>

      {/* {soloSeasons.map((season) => {
        const { code, competitions, name } = season;
        competitions.sort(
          (a, b) =>
            new Date(a.start_date).getTime() - new Date(b.start_date).getTime(),
        );

        return (
          <Fragment key={code}>
            <h3 className="mb-6 mt-4 opacity-80">{name}</h3>
            <section key={code} className={classNames("wrapper mb-8")}>
              {competitions.map((competition) => (
                <CompetitionCard
                  key={competition.code}
                  competition={competition}
                />
              ))}
            </section>
          </Fragment>
        );
      })} */}
      {/* {offSeasonCompetitions.length > 0 && (
        <>
          <h3 className="mb-6 mt-6 opacity-80">Off Season</h3>
          <section className={classNames("wrapper mb-8")}>
            {offSeasonCompetitions.map((competition) => (
              <CompetitionCard
                key={competition.code}
                competition={competition}
              />
            ))}
          </section>
        </>
      )} */}
    </>
  );
};

export default Competitions;
