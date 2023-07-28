import { Flag } from "@ui/flag";
import { NewTabIcon } from "@ui/icons";
import cn from "classix";
import Link from "next/link";

import { Season } from "@/types/api-types";

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
            title={`${name}'s page - new tab`}
            className={cn(
              "flex items-center",
              "pl-7 pr-5",
              "text-sm text-secondary",
              "group/pilots",
              "odd:bg-secondary-light",
              "[&>p]:hover:translate-x-1 [&>p]:hover:text-primary",
              isExpanded ? "[&>*]:my-1" : "[&>*]:-my-3",
            )}
          >
            <Flag country={country} className="-mt-px mr-3 h-3.5 w-3.5" />
            <p>{name}</p>
            <NewTabIcon
              className={cn(
                "fill-secondary opacity-0",
                "h-2.5 w-2.5",
                "ml-4 -translate-y-px",
                "group-hover/pilots:opacity-100",
              )}
            />
          </Link>
        );
      })}
    </div>
  );
};

export default SeasonCardPilots;
