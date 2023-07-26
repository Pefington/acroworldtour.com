import "flickity/css/flickity.css";

import PilotCard from "@pilot/pilotCard";
import { useAPI } from "@utils/swr";
import cn from "classix";
import Link from "next/link";
import Flickity from "react-flickity-component";

import { Pilot } from "@/types/project";

const HomePilots = () => {
  const {
    data: pilots,
    isLoading: pilotsLoading,
    error: pilotsError,
  } = useAPI<Pilot[]>("pilots");

  const awtPilots = pilots
    ?.filter((pilot) => pilot.is_awt)
    .sort((a, b) => a.rank - b.rank);

  return (
    <section className="flex flex-col bg-secondary-light awt-home-section">
      <header className="flex items-center justify-between awt-center">
        <h2
          className={cn(
            "mb-8 text-3xl font-black uppercase",
            "md:text-5xl",
            pilotsError && "text-secondary-medium",
          )}
        >
          {pilotsError ? "❌ Couldn't fetch pilots" : "Discover Our Pilots"}
        </h2>
        {!pilotsError && (
          <Link
            href="/pilots"
            title="View all competitions"
            className={cn(
              "min-w-max",
              "mb-8",
              "font-bold text-accent",
              "hover:-translate-y-0.5 hover:drop-shadow-md",
            )}
          >
            View All
          </Link>
        )}
      </header>
      <Flickity /* Carousel */
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
        {!pilotsError &&
          awtPilots?.map((pilot) => (
            <PilotCard
              key={pilot.civlid}
              pilot={pilot}
              loading={pilotsLoading}
            />
          ))}
      </Flickity>
    </section>
  );
};

export default HomePilots;
