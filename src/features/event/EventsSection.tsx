import { Season } from "@api-types";
import SeasonCard from "@season/SeasonCard";
import cx from "classix";

interface Props {
  seasons: Season[];
}

const EventsSection = ({ seasons }: Props) => {
  const type = seasons[0].type === "solo" ? "Solo" : "Synchro";

  return (
    <section className={cx("awt-section awt-center")}>
      <h2
        className={cx(
          "text-3xl font-black uppercase text-primary/80",
          "md:text-5xl",
        )}
      >
        {seasons?.length ? type : `No ${type} Seasons`}
      </h2>
      {seasons?.length && (
        <div
          className={cx(
            "mt-6 grid gap-8",
            "sm:grid-cols-2",
            "lg:grid-cols-3",
            "xl:grid-cols-4",
          )}
        >
          {seasons?.map((season) => (
            <SeasonCard key={season.code} season={season} />
          ))}
        </div>
      )}
    </section>
  );
};

export default EventsSection;
