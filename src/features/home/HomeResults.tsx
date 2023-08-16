import { useUpdateCompetitions, useUpdateSeasons } from "@data/useData";
import BasicResultsCard from "@results/BasicResultsCard";
import { getLastResultableAwqEvent, getLastResultableAwtEvent } from "@utils/data-helpers";
import cx from "classix";
import Link from "next/link";

const HomeResults = () => {
  useUpdateSeasons();
  useUpdateCompetitions();

  const lastAwtEvent = getLastResultableAwtEvent();
  const lastAwqEvent = getLastResultableAwqEvent();

  // console.log(lastAwtEvent.name, lastAwqEvent.name);

  return (
    <section className={cx("awt-home-section awt-center", "flex flex-col")}>
      <header className="flex items-center justify-between">
        <h2 className={cx("mb-8 text-3xl font-black uppercase", "md:text-5xl")}>Latest Results</h2>
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
        {lastAwtEvent && <BasicResultsCard event={lastAwtEvent} />}
        {lastAwqEvent && <BasicResultsCard event={lastAwqEvent} />}
      </div>
    </section>
  );
};

export default HomeResults;
