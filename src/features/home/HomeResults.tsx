import BasicResultsCard from "@results/BasicResultsCard";
import { apiStatusAtom, compsAtom, lastAwqSeasonAtom, lastAwtCompAtom, seasonsAtom } from "@state";
import { useAPI } from "@utils/swr";
import cx from "classix";
import { useAtom, useSetAtom } from "jotai";
import Link from "next/link";

const HomeResults = () => {
  const setApiStatus = useSetAtom(apiStatusAtom);

  const [comps, setComps] = useAtom(compsAtom);
  const [seasons, setSeasons] = useAtom(seasonsAtom);
  const [lastAwtComp, setLastAwtComp] = useAtom(lastAwtCompAtom);
  const [lastAwqSeason, setLastAwqSeason] = useAtom(lastAwqSeasonAtom);

  useAPI<API.Competition[]>("competitions", {
    fallbackData: comps,
    onSuccess: (data) => {
      setComps(data);
      setApiStatus("up");
    },
  });

  useAPI<API.Season[]>("seasons", {
    fallbackData: seasons,
    onSuccess: (data) => {
      setSeasons(data);
      setApiStatus("up");
    },
  });

  const pastAwtComps = comps.filter(
    (comp) => comp.state === "closed" && comp.seasons.some((season) => season.includes("awt")),
  );
  pastAwtComps.sort((a, b) => {
    const aDate = new Date(a.start_date);
    const bDate = new Date(b.start_date);
    return aDate.getTime() - bDate.getTime();
  });

  useAPI<API.Competition>(`competitions/${pastAwtComps.at(-1)?.code}`, {
    fallbackData: lastAwtComp,
    onSuccess: (data) => {
      setLastAwtComp(data);
      setApiStatus("up");
    },
  });

  const awqSeasons = seasons.filter((season) => {
    season.code.includes("awq");
    season.competitions.every((comp) => comp.state === "closed");
  });

  awqSeasons.sort((a, b) => a.year - b.year);

  useAPI<API.Season>(`seasons/${pastAwtComps.at(-1)?.code}`, {
    fallbackData: lastAwtComp,
    onSuccess: (data) => {
      setLastAwqSeason(data);
      setApiStatus("up");
    },
  });

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
        {lastAwtComp && <BasicResultsCard event={lastAwtComp} />}
        {lastAwqSeason && <BasicResultsCard event={lastAwqSeason} />}
      </div>
    </section>
  );
};

export default HomeResults;
