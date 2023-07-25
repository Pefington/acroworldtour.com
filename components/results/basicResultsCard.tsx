import { Flag } from "@ui/flag";
import cn from "classix";
import Link from "next/link";

import {
  Competition,
  CompetitionResult,
  Season,
  SeasonResult,
} from "@/types/project";

interface Props {
  event: Competition | Season;
  updating: boolean;
  limitTo?: number | "all";
}

const BasicResultsCard = ({ event, updating, limitTo = 5 }: Props) => {
  const results =
    "overall_results" in event.results
      ? (event.results.overall_results as CompetitionResult[])
      : (event.results
          .filter((result) => result.type === "overall")
          .map((result) => result.results)
          .flat() as SeasonResult[]);

  results.sort((a, b) => b.score - a.score);

  const isCompetition = "overall_results" in event.results;

  const clampedResults =
    limitTo === "all" ? results : results.slice(0, limitTo);

  return (
    <article className={cn("w-full rounded pt-7", "shadow-md")}>
      <h3 className={cn("px-7 text-3xl font-bold uppercase")}>
        {isCompetition ? "Acro World Tour" : "Acro World Qualifier"}
      </h3>
      <h4 className={cn("px-7 font-semibold uppercase text-secondary")}>
        {isCompetition
          ? event.name
          : `Overall Standings ${event.name.split(" ").at(-1)}`}
      </h4>
      <header
        className={cn(
          "my-4 grid grid-cols-12 px-7 text-sm font-bold text-secondary",
        )}
      >
        <p className={cn("col-span-2")}>Pos.</p>
        <p className={cn("col-span-8 ml-9")}>Pilot</p>
        <p className={cn("col-span-2")}>Pts.</p>
      </header>

      <ul className={cn("col-span-full")}>
        {clampedResults.map((result, index) => {
          const { pilot, score } = result;
          const roundedScore = score.toFixed(3);

          return (
            <li
              key={pilot?.civlid}
              className={cn(
                "grid w-full grid-cols-12 px-7 py-4 text-sm font-bold odd:bg-secondary-light",
                updating && "opacity-75 [&>*]:animate-pulse [&>*]:blur-[1px]",
              )}
            >
              <p className={cn("col-span-2 text-secondary")}>{index + 1}</p>
              <span className={cn("col-span-8 flex gap-4")}>
                <Flag country={pilot?.country} />
                {pilot?.name}
              </span>
              <p className={cn("col-span-2")}>{roundedScore}</p>
            </li>
          );
        })}
      </ul>

      <footer
        className={cn(
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
