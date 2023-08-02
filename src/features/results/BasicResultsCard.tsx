import { Flag } from "@ui/Flag";
import cx from "classix";
import Link from "next/link";

interface Props {
  event: API.CompetitionWithResults | API.Season;
  updating?: boolean;
  limitTo?: number | "all";
}

const BasicResultsCard = ({ event, updating, limitTo = 5 }: Props) => {
  const eventType = "overall_results" in event.results ? "competition" : "season";

  console.log(event);

  const results =
    eventType !== "competition"
      ? event.results.overall_results
      : (event.results
          .filter((result) => result.type === "overall")
          .map((result) => result.results)
          .flat() as API.SeasonResults[]);

  results.sort((a, b) => b.score - a.score);

  const clampedResults = limitTo === "all" ? results : results.slice(0, limitTo);

  return (
    <article className={cx("w-full rounded pt-7", "shadow-md")}>
      <h3 className={cx("px-7 text-3xl font-bold uppercase")}>
        {eventType === "competition" ? "Acro World Tour" : "Acro World Qualifier"}
      </h3>
      <h4 className={cx("px-7 font-semibold uppercase text-secondary")}>
        {eventType === "competition"
          ? event.name
          : `Overall Standings ${event.name.split(" ").at(-1)}`}
      </h4>
      <header className={cx("my-4 grid grid-cols-12 px-7 text-sm font-bold text-secondary")}>
        <p className={cx("col-span-2")}>Pos.</p>
        <p className={cx("col-span-8 ml-9")}>Pilot</p>
        <p className={cx("col-span-2")}>Pts.</p>
      </header>

      <ul className={cx("col-span-full")}>
        {clampedResults.map((result, index) => {
          const { pilot, score } = result;
          const roundedScore = score.toFixed(3);

          return (
            <li
              key={pilot?.civlid}
              className={cx(
                "grid w-full grid-cols-12 px-7 py-4 text-sm font-bold odd:bg-secondary-light",
                updating && "opacity-75 [&>*]:animate-pulse [&>*]:blur-[1px]",
              )}
            >
              <p className={cx("col-span-2 text-secondary")}>{index + 1}</p>
              <span className={cx("col-span-8 flex gap-4")}>
                <Flag country={pilot?.country} />
                {pilot?.name}
              </span>
              <p className={cx("col-span-2")}>{roundedScore}</p>
            </li>
          );
        })}
      </ul>

      <footer
        className={cx(
          "mx-auto py-4",
          "w-max",
          "font-bold text-accent",
          "hover:-translate-y-0.5 hover:drop-shadow-md",
        )}
      >
        <Link
          href={`/events/${event.code}/${event.name}`}
          title={`View detailed results for ${event.name}`}
          className="w-full py-4 text-center"
        >
          View More
        </Link>
      </footer>
    </article>
  );
};

export default BasicResultsCard;
