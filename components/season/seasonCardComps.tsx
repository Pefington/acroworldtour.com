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
        const startDate = new Date(start_date).toLocaleString("en-US", {
          month: "long",
        });

        return (
          <Link
            key={code}
            href={`/events/${code}/${name}`}
            target="_blank"
            className={cn(
              "flex items-center",
              "pl-7 pr-5",
              "text-sm",
              "odd:bg-secondary-light",
              "hover:text-primary [&>svg]:hover:opacity-100",
              state === "closed" && "text-secondary",
              state === "open" && "text-accent",
              state === "init" && "text-green-600",
              isExpanded ? "[&>*]:my-1" : "[&>*]:-my-6",
            )}
          >
            <Flag country={country} className="-mt-px mr-2 h-3 w-3" />
            <p>
              {nameWithoutYear} {state === "init" ? `- ${startDate}` : ""}
            </p>
            <NewTabIcon className="ml-2 h-2.5 w-2.5 -translate-y-px fill-secondary opacity-0" />
          </Link>
        );
      })}
    </div>
  );
};

export default SeasonCardComps;
