import { Flag } from "@ui/flag";
import { NewTabIcon } from "@ui/icons";
import cn from "classix";
import Link from "next/link";

import { Season } from "@/types/project";

interface Props {
  season: Season;
  isExpanded: boolean;
}

const SeasonCardPilots = ({ season, isExpanded }: Props) => {
  const { competitions } = season;
  const pilots = competitions
    .flatMap((comp) => comp.pilots)
    .sort((a, b) => a.name.split(" ")[1].localeCompare(b.name.split(" ")[1]));

  const uniqueIDs = new Set();
  const uniquePilots = pilots.filter((pilot) => {
    const duplicate = uniqueIDs.has(pilot.civlid);
    uniqueIDs.add(pilot.civlid);
    return !duplicate;
  });

  return (
    <div aria-hidden={!isExpanded} className={cn(isExpanded && "pb-2")}>
      {uniquePilots.map((pilot) => {
        const { name, civlid, country } = pilot;
        return (
          <Link
            key={civlid}
            href={`/pilots/${civlid}/${name}`}
            target="_blank"
            className={cn(
              "flex items-center",
              "pl-7 pr-5",
              "text-sm text-secondary",
              "odd:bg-secondary-light",
              "hover:text-primary [&>svg]:hover:opacity-100",
              isExpanded ? "[&>*]:my-1" : "[&>*]:-my-3",
            )}
          >
            <Flag country={country} className="-mt-px mr-2 h-3 w-3" />
            <p>{name}</p>
            <NewTabIcon className="ml-2 h-2.5 w-2.5 -translate-y-px fill-secondary opacity-0" />
          </Link>
        );
      })}
    </div>
  );
};

export default SeasonCardPilots;
