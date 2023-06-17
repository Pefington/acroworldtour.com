import classNames from "classnames";
import Link from "next/link";
import useSWR from "swr";

import FetchError from "@/components/ui/fetchError";
import FetchLoading from "@/components/ui/fetchLoading";
import { API_URL } from "@/constants";
import { components } from "@/types";

import UpcomingEventCard from "./eventCard";

type Competition = components["schemas"]["CompetitionPublicExport"];

const HomeUpcoming = () => {
  const {
    data: competitions,
    error,
    isLoading,
  } = useSWR<Competition[], Error>(`${API_URL}/competitions/`);

  if (isLoading) return <FetchLoading />;
  if (error) return <FetchError />;
  if (!competitions) return <h2>Competitions not found</h2>;

  const upcomingEvents = competitions
    .filter((competition) => competition.state === "init")
    .slice(0, 4);

  upcomingEvents.sort((a, b) => {
    const aDate = new Date(a.start_date);
    const bDate = new Date(b.start_date);
    return aDate.getTime() - bDate.getTime();
  });

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
          Upcoming Events
        </h2>
        <Link
          href="/competitions"
          title="View all competitions"
          className={classNames(
            "mb-8 min-w-max font-bold text-accent-text hover:text-hover hover:drop-shadow-md",
          )}
        >
          View All
        </Link>
      </header>
      <div
        className={classNames(
          "grid place-items-center gap-10",
          "sm:grid-cols-2",
          "lg:grid-cols-3",
          "xl:grid-cols-4",
        )}
      >
        {upcomingEvents.map((competition) => (
          <UpcomingEventCard key={competition.code} competition={competition} />
        ))}
      </div>
    </section>
  );
};

export default HomeUpcoming;
