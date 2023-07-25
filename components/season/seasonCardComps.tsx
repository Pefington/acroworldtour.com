import { Flag } from "@ui/flag";
import { NewTabIcon } from "@ui/icons";
import cn from "classix";
import Link from "next/link";

import { Season } from "@/types/project";

interface Props {
  season: Season;
  isExpanded: boolean;
}

const SeasonCardComps = ({ season, isExpanded }: Props) => {
  const { competitions } = season;
  competitions.sort((a, b) => a.start_date.localeCompare(b.start_date));

  return (
    <div aria-hidden={!isExpanded} className={cn(isExpanded && "pb-2")}>
      {competitions.map((comp) => {
        const { name, code, location, start_date, state } = comp;
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
            className={cn(
              "flex items-center",
              "pl-7 pr-5",
              "text-sm",
              "group/comp",
              "odd:bg-secondary-light",
              "[&>div]:hover:translate-x-1 [&>div]:hover:text-primary",
              state === "closed" && "text-secondary",
              state === "open" && "text-accent",
              state === "init" && "text-sky-600",
              isExpanded ? "py-1 [&>*]:my-1" : "[&_*]:-my-10",
            )}
          >
            <Flag country={country} className="-mt-px mr-2 h-4 w-4" />
            <div className="flex flex-col pl-1">
              <p>{nameWithoutYear}</p>
              <p className="text-xs">
                {state === "init" ? `${startDate}` : "Finished"}
              </p>
            </div>
            <NewTabIcon
              className={cn(
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
