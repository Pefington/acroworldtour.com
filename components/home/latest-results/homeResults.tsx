import cn from "classix";
import Link from "next/link";
import useSWR from "swr";

import BasicResultsCardSkeleton from "@/components/results/basicResultsCardSkeleton";
import { API_URL } from "@/constants";
import { components } from "@/types";

import BasicResultsCard from "../../results/basicResultsCard";

type Competition = components["schemas"]["CompetitionPublicExport"];
type Season = components["schemas"]["SeasonExport"];

type LastCompetition =
  components["schemas"]["CompetitionPublicExportWithResults"];

const HomeResults = () => {
  const {
    data: competitions,
    error: compsError,
    isLoading: compsLoading,
  } = useSWR<Competition[], Error>(`${API_URL}/competitions/`);

  const {
    data: seasons,
    error: seasonsError,
    isLoading: seasonsLoading,
    isValidating: seasonsValidating,
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
    data: lastAwtComp,
    error: lastAwtCompError,
    isLoading: lastAwtCompLoading,
    isValidating: lastAwtCompValidating,
  } = useSWR<LastCompetition, Error>(
    pastAwtCompetitions?.length || 0 > 0
      ? `${API_URL}/competitions/${pastAwtCompetitions?.at(-1)?.code}`
      : null,
  );

  const awq = seasons
    ?.filter(
      (season) =>
        season.code === "awq-2022" &&
        season.competitions.every(
          (competition) => competition.state === "closed",
        ),
    )
    .sort((a, b) => a.year - b.year)
    .at(-1);

  return (
    <section className={cn("awt-home-section awt-center", "flex flex-col")}>
      <header className="flex items-center justify-between">
        <h2 className={cn("mb-8 text-3xl font-black uppercase", "md:text-5xl")}>
          Latest Results
        </h2>
        <Link
          href="/results"
          title="View all results"
          className={cn(
            "mb-8 min-w-max font-bold text-accent-text hover:text-hover hover:drop-shadow-md",
          )}
        >
          View All
        </Link>
      </header>
      <div className={cn("grid justify-center gap-10", "md:grid-cols-2")}>
        {compsLoading ||
        compsError ||
        lastAwtCompLoading ||
        lastAwtCompError ? (
          <BasicResultsCardSkeleton
            error={!!compsError || !!lastAwtCompError}
          />
        ) : (
          lastAwtComp && (
            <BasicResultsCard
              event={lastAwtComp}
              updating={lastAwtCompValidating}
            />
          )
        )}
        {seasonsLoading || seasonsError ? (
          <BasicResultsCardSkeleton error={!!seasonsError} />
        ) : (
          awq && <BasicResultsCard event={awq} updating={seasonsValidating} />
        )}
      </div>
    </section>
  );
};

export default HomeResults;
