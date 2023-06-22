import "flickity/css/flickity.css";

import cn from "classnames";
import Link from "next/link";
import Flickity from "react-flickity-component";
import useSWR from "swr";

import PilotCard from "@/components/pilot/pilotCard";
import PilotCardSkeleton from "@/components/pilot/pilotCardSkeleton";
import { API_URL } from "@/constants";
import { components } from "@/types";

type Pilot = components["schemas"]["Pilot"];

const HomePilots = () => {
  let {
    data: pilots,
    error: pilotsError,
    isLoading: pilotsLoading,
  } = useSWR<Pilot[], Error>(`${API_URL}/pilots/`);

  const awtPilots = pilots?.filter((pilot) => pilot.is_awt);

  return (
    <section className={cn("bg-secondary-light awt-section", "flex flex-col")}>
      <header className="flex items-center justify-between awt-center">
        <h2 className={cn("mb-8 text-3xl font-black uppercase", "md:text-5xl")}>
          Discover Our Pilots
        </h2>
        <Link
          href="/pilots"
          title="View all competitions"
          className={cn(
            "mb-8 min-w-max font-bold text-accent-text hover:text-hover hover:drop-shadow-md",
          )}
        >
          View All
        </Link>
      </header>
      <Flickity
        className={cn(
          "w-screen" /* cancel .section padding */,
          "sm:[&_ol]:-bottom-10" /* vertical position of pagination dots */,
          "[&_li]:!bg-primary" /* pagination dots dots colour */,
          "[&_article]:m-2 sm:[&_article]:m-4" /* cards margin */,
        )}
        options={{
          initialIndex: 2,
          prevNextButtons: false,
          cellAlign: "center",
        }}
      >
        {pilotsLoading || pilotsError
          ? Array(10)
              .fill(0)
              .map((_, index) => (
                <PilotCardSkeleton key={index} error={!!pilotsError} />
              ))
          : awtPilots?.map((pilot) => (
              <PilotCard key={pilot.civlid} pilot={pilot} />
            ))}
      </Flickity>
    </section>
  );
};

export default HomePilots;
