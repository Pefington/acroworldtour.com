import EventCard from "@event/EventCard";
import { useAPI } from "@utils/swr";
import cx from "classix";
import Link from "next/link";

const HomeEvents = () => {
  const { data: competitions } = useAPI<API.Competition[]>("competitions");

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
      className={cx(
        "bg-secondary-light awt-home-section awt-center",
        "flex flex-col",
      )}
    >
      <header className="flex items-center justify-between">
        <h2 className={cx("mb-8 text-3xl font-black uppercase", "md:text-5xl")}>
          {`${
            competitions && upcomingEvents?.length === 0 ? "No " : ""
          }Upcoming Events`}
        </h2>
        <Link
          href="/competitions"
          title="View all competitions"
          className={cx(
            "hover:text-hover mb-8 min-w-max font-bold text-accent hover:drop-shadow-md",
          )}
        >
          View All
        </Link>
      </header>
      <div
        className={cx(
          "grid place-items-center gap-10",
          "sm:grid-cols-2",
          "lg:grid-cols-3",
          "xl:grid-cols-4",
        )}
      >
        {nextFourEvents?.map((competition) => (
          <EventCard key={competition.code} competition={competition} />
        ))}
      </div>
    </section>
  );
};

export default HomeEvents;
