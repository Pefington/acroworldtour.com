import classNames from "classnames";
import Link from "next/link";
import useSWR from "swr";

import FetchError from "@/components/ui/fetchError";
import FetchLoading from "@/components/ui/fetchLoading";
import { API_URL } from "@/constants";
import { components } from "@/types";

import OverallResultsCard from "./overallResultsCard";

type Competition = components["schemas"]["CompetitionPublicExport"];
type Season = components["schemas"]["SeasonExport"];

type LastCompetition =
  components["schemas"]["CompetitionPublicExportWithResults"];

const HomeResults = () => {
  const {
    data: competitions,
    error: competitionsError,
    isLoading: competitionsLoading,
  } = useSWR<Competition[], Error>(`${API_URL}/competitions/`);

  const {
    data: seasons,
    error: seasonsError,
    isLoading: seasonsLoading,
  } = useSWR<Season[], Error>(`${API_URL}/seasons/`);

  const pastAwtCompetitions = competitions?.filter(
    (competition) =>
      competition.state === "closed" &&
      competition.seasons.some((season) => season.includes("awt")),
  );
  pastAwtCompetitions?.sort((a, b) => {
    const aDate = new Date(a.start_date);
    const bDate = new Date(b.start_date);
    return aDate.getTime() - bDate.getTime();
  });

  const {
    data: lastAwtCompetition,
    error: lastAwtCompetitionError,
    isLoading: lastAwtCompetitionLoading,
  } = useSWR<LastCompetition, Error>(
    pastAwtCompetitions?.length || 0 > 0
      ? `${API_URL}/competitions/${pastAwtCompetitions?.at(-1)?.code}`
      : null,
  );

  if (competitionsLoading || seasonsLoading || lastAwtCompetitionLoading)
    return <FetchLoading />;
  if (competitionsError || seasonsError || lastAwtCompetitionError)
    return <FetchError />;
  if (!competitions || !seasons || !lastAwtCompetition)
    return <h2>Events not found</h2>;

  const awq = seasons
    .filter(
      (season) =>
        season.code === "awq-2022" &&
        season.competitions.every(
          (competition) => competition.state === "closed",
        ),
    )
    .sort((a, b) => a.year - b.year)
    .at(-1);

  return (
    <section className={classNames("section", "flex flex-col")}>
      <header className="flex items-center justify-between">
        <h2
          className={classNames(
            "mb-8 text-3xl font-black uppercase",
            "md:text-5xl",
          )}
        >
          Latest Results
        </h2>
        <Link
          href="/results"
          title="View all results"
          className={classNames(
            "mb-8 min-w-max font-bold text-accent-text hover:text-hover hover:drop-shadow-md",
          )}
        >
          View All
        </Link>
      </header>
      <div
        className={classNames(
          "grid place-items-center gap-10",
          "md:grid-cols-2",
        )}
      >
        {lastAwtCompetition && (
          <OverallResultsCard event={lastAwtCompetition} limitTo={5} />
        )}
        {awq && <OverallResultsCard event={awq} limitTo={5} />}
      </div>
    </section>
  );
};

export default HomeResults;