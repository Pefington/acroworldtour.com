import { Flag } from "@ui/Flag";
import { NewTabIcon } from "@ui/icons";
import cx from "classix";
import Link from "next/link";

interface Props {
  season: API.Season;
  isExpanded: boolean;
}

const SeasonCardComps = ({ season, isExpanded }: Props) => {
  const { competitions } = season;
  competitions.sort((a, b) => a.start_date.localeCompare(b.start_date));

  return (
    <div aria-hidden={!isExpanded} className={cx(isExpanded && "pb-2")}>
      {competitions.map((comp) => {
        const { name, code, location, start_date, state } = comp;
        const isUnderway = state === "open";
        const isOpen = state === "init";
        const isFinished = state === "closed";
        const nameWithoutYear = name.split(" ").slice(0, -1).join(" ");
        const country = location.split(", ").at(-1);
        const startDate = new Date(start_date).toLocaleString("en-IE", {
          day: "2-digit",
          month: "long",
        });

        return (
          <Link
            key={code}
            href={`/events/${code}/${name}`}
            target="_blank"
            title={`${nameWithoutYear}'s page - new tab`}
            className={cx(
              "flex items-center",
              "pl-7 pr-5",
              "text-sm",
              "group/comp",
              "odd:bg-secondary-light",
              "[&>div]:hover:translate-x-1 [&>div]:hover:text-primary",
              isFinished && "text-secondary",
              isUnderway && "text-accent",
              isOpen && "text-sky-600",
              isExpanded ? "py-1 [&>*]:my-1" : "[&_*]:-my-10",
            )}
          >
            <Flag country={country} className="-mt-px mr-2 h-4 w-4" />
            <div className="flex flex-col pl-1">
              <p>{nameWithoutYear}</p>
              <p className={cx("text-xs", isUnderway && "animate-pulse")}>
                {state === "init" ? `${startDate}` : "Finished"}
              </p>
            </div>
            <NewTabIcon
              className={cx(
                "fill-secondary opacity-0",
                "h-2.5 w-2.5",
                "ml-4 -translate-y-px",
                "group-hover/comp:opacity-100",
              )}
            />
          </Link>
        );
      })}
    </div>
  );
};

export default SeasonCardComps;
