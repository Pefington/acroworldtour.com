import cn from "classnames";
import Link from "next/link";
import useSWR from "swr";

import EventCardSkeleton from "@/components/event/eventCardSkeleton";
import { API_URL } from "@/constants";
import { components } from "@/types";

import EventCard from "../../event/eventCard";

type Competition = components["schemas"]["CompetitionPublicExport"];

const HomeEvents = () => {
  let {
    data: competitions,
    error: competitionsError,
    isLoading: competitionsLoading,
    isValidating: competitionsValidating,
  } = useSWR<Competition[], Error>(`${API_URL}/competitions/`);

  const upcomingEvents = competitions
    ?.filter((competition) => competition.state === "init")
    .slice(0, 4);

  upcomingEvents?.sort((a, b) => {
    const aDate = new Date(a.start_date);
    const bDate = new Date(b.start_date);
    return aDate.getTime() - bDate.getTime();
  });

  return (
    <section
      className={cn(
        "bg-secondary-light awt-section awt-center",
        "flex flex-col",
      )}
    >
      <header className="flex items-center justify-between">
        <h2 className={cn("mb-8 text-3xl font-black uppercase", "md:text-5xl")}>
          {`${
            competitions && upcomingEvents?.length === 0 && "No "
          }Upcoming Events`}
        </h2>
        <Link
          href="/competitions"
          title="View all competitions"
          className={cn(
            "mb-8 min-w-max font-bold text-accent-text hover:text-hover hover:drop-shadow-md",
          )}
        >
          View All
        </Link>
      </header>
      <div
        className={cn(
          "grid place-items-center gap-10",
          "sm:grid-cols-2",
          "lg:grid-cols-3",
          "xl:grid-cols-4",
        )}
      >
        {competitionsLoading || competitionsError
          ? Array(4)
              .fill(0)
              .map((_, index) => (
                <EventCardSkeleton key={index} error={!!competitionsError} />
              ))
          : upcomingEvents?.map((competition) => (
              <EventCard
                key={competition.code}
                competition={competition}
                updating={competitionsValidating}
              />
            ))}
      </div>
    </section>
  );
};

export default HomeEvents;
