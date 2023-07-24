import Link from "next/link";

import { Flag } from "@/components/ui/flag";
import { Season } from "@/types/project";

import cn from "classix";

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
    <div>
      {uniquePilots.map((pilot) => {
        const { name, civlid, country } = pilot;
        return (
          <Link
            key={civlid}
            href={`/pilots/${civlid}/${name}`}
            className={cn("flex items-center pl-7 pr-5 text-sm text-secondary")}
          >
            <Flag country={country} className="-mt-px mr-2 h-3 w-3" />
            <p>{name}</p>
          </Link>
        );
      })}
    </div>
  );
};

export default SeasonCardPilots;
