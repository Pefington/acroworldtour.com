import cn from "classix";
import Link from "next/link";

import EventCardSkeleton from "@/components/event/eventCardSkeleton";
import { useCompetitions } from "@/utils/swr";

import EventCard from "../../event/eventCard";

const HomeEvents = () => {
  const { competitions, compsLoading, compsError } = useCompetitions();

  const upcomingEvents = competitions?.filter(
    (competition) => competition.state === "init",
  );

  upcomingEvents?.sort((a, b) => {
    const aDate = new Date(a.start_date);
    const bDate = new Date(b.start_date);
    return aDate.getTime() - bDate.getTime();
  });

  const nextFourEvents = upcomingEvents?.slice(0, 4);

  return (
    <section
      className={cn(
        "bg-secondary-light awt-home-section awt-center",
        "flex flex-col",
      )}
    >
      <header className="flex items-center justify-between">
        <h2 className={cn("mb-8 text-3xl font-black uppercase", "md:text-5xl")}>
          {`${
            competitions && upcomingEvents?.length === 0 ? "No " : ""
          }Upcoming Events`}
        </h2>
        <Link
          href="/competitions"
          title="View all competitions"
          className={cn(
            "mb-8 min-w-max font-bold text-accent hover:text-hover hover:drop-shadow-md",
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
        {compsLoading || compsError
          ? Array(4)
              .fill(0)
              .map((_, index) => (
                <EventCardSkeleton key={index} error={!!compsError} />
              ))
          : nextFourEvents?.map((competition) => (
              <EventCard key={competition.code} competition={competition} />
            ))}
      </div>
    </section>
  );
};

export default HomeEvents;
