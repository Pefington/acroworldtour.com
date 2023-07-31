import BasicResultsCard from "@results/BasicResultsCard";
import { useAPI } from "@utils/swr";
import cx from "classix";
import Link from "next/link";

const HomeResults = () => {
  const { data: competitions } = useAPI<API.Competition[]>("competitions");

  const { data: seasons } = useAPI<API.Season[]>("seasons");

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

  const { data: lastAwtComp } = useAPI<API.Competition>(
    "competitions",
    pastAwtCompetitions?.at(-1)?.code,
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
    <section className={cx("awt-home-section awt-center", "flex flex-col")}>
      <header className="flex items-center justify-between">
        <h2 className={cx("mb-8 text-3xl font-black uppercase", "md:text-5xl")}>
          Latest Results
        </h2>
        <Link
          href="/results"
          title="View all results"
          className={cx(
            "hover:text-hover mb-8 min-w-max font-bold text-accent hover:drop-shadow-md",
          )}
        >
          View All
        </Link>
      </header>
      <div className={cx("grid justify-center gap-10", "md:grid-cols-2")}>
        {!!lastAwtComp && <BasicResultsCard event={lastAwtComp} />}
        {!!awq && <BasicResultsCard event={awq} />}
      </div>
    </section>
  );
};

export default HomeResults;
