import SeasonCard from "@season/seasonCard";
import SeasonCardSkeleton from "@season/seasonCardSkeleton";
import cn from "classix";

import { Season } from "@/types/project";

interface Props {
  seasons: Season[];
  loading: boolean;
  error: boolean;
}

const EventsSection = ({ seasons, loading, error }: Props) => {
  const type = seasons ? seasons[0].type : null;

  return (
    <section className={cn("awt-section awt-center")}>
      <h2
        className={cn(
          "text-3xl font-black uppercase text-primary/80",
          "md:text-5xl",
        )}
      >
        {(seasons?.length || 0) > 0 ? type : `No ${type} Seasons`}
      </h2>
      {(seasons?.length || 0) > 0 && (
        <div
          className={cn(
            "mt-6 grid gap-8",
            "sm:grid-cols-2",
            "lg:grid-cols-3",
            "xl:grid-cols-4",
          )}
        >
          {loading || error
            ? Array(4)
                .fill(0)
                .map((_, index) => (
                  <SeasonCardSkeleton key={index} error={error} />
                ))
            : seasons?.map((season) => (
                <SeasonCard key={season.code} season={season} />
              ))}
        </div>
      )}
    </section>
  );
};

export default EventsSection;
