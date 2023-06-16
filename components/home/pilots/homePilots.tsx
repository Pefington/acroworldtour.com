import "flickity/css/flickity.css";

import classNames from "classnames";
import Link from "next/link";
import Flickity from "react-flickity-component";
import useSWR from "swr";

import FetchError from "@/components/ui/fetchError";
import FetchLoading from "@/components/ui/fetchLoading";
import { API_URL } from "@/constants";
import { components } from "@/types";

import PilotCard from "./pilotCard";

type Pilot = components["schemas"]["Pilot"];

const HomePilots = () => {
  const {
    data: pilots,
    error,
    isLoading,
  } = useSWR<Pilot[], Error>(`${API_URL}/pilots/`);

  if (isLoading) return <FetchLoading />;
  if (error) return <FetchError />;
  if (!pilots) return <h2>Competitions not found</h2>;

  const awtPilots = pilots.filter((pilot) => pilot.is_awt);

  return (
    <section
      className={classNames("section bg-secondary-light", "flex flex-col")}
    >
      <header className="flex items-center justify-between">
        <h2
          className={classNames(
            "mb-8 text-3xl font-black uppercase",
            "md:text-5xl",
          )}
        >
          Discover Our Pilots
        </h2>
        <Link
          href="/pilots"
          title="View all competitions"
          className={classNames(
            "mb-8 min-w-max font-bold text-accent-text hover:text-hover hover:drop-shadow-md",
          )}
        >
          View All
        </Link>
      </header>
      <Flickity
        className={
          "-mx-5 w-screen overflow-visible bg-lime-400 outline-none lg:-mx-16 [&_.dot]:!bg-secondary-medium [&_.dot]:!opacity-100 [&_.is-selected]:!bg-accent"
        }
        options={{
          initialIndex: 2,
          prevNextButtons: false,
          pageDots: true,
          cellAlign: "left",
          contain: true,
        }}
        reloadOnUpdate
      >
        {awtPilots.map((pilot) => (
          <PilotCard key={pilot.civlid} pilot={pilot} />
        ))}
      </Flickity>
    </section>
  );
};

export default HomePilots;