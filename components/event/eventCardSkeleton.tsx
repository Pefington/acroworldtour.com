import cn from "classix";

interface Props {
  error: boolean;
}

const EventCardSkeleton = ({ error }: Props) => (
  <div
    title={error ? "Could not fetch data." : "Fetching data..."}
    className={cn(
      "flex aspect-[2/3] w-full flex-col overflow-hidden rounded bg-white shadow-md",
      "[&_div]:rounded-sm",
      "[&>*]:animate-pulse",
      error && "outline outline-red-500/80 [&>*]:animate-none",
    )}
  >
    <div className="flex grow flex-col overflow-hidden">
      <div className="flex w-full grow flex-col items-center justify-center gap-4 overflow-hidden bg-skeleton">
        <div className="text-9xl opacity-40">{error && "😵"}</div>
        <div className="text-2xl font-semibold text-red-500 opacity-80">
          {error && "Could not fetch data."}
        </div>
      </div>
      <div className="flex flex-col gap-3 px-7 py-4">
        <div className="my-1 h-6 w-5/6 bg-skeleton" />
        <div className="flex items-center gap-2">
          <div className="h-5 w-5 bg-skeleton" />
          <div className="h-5 w-2/3 bg-skeleton" />
        </div>
        <div className="flex items-center gap-3">
          <div className="-mx-[2px] h-5 w-5 !rounded-full bg-skeleton" />
          <div className="h-3 w-3/5 bg-skeleton" />
        </div>
      </div>
    </div>
    <div className="mb-4 flex gap-2 px-7">
      {Array(3)
        .fill(0)
        .map((_, index) => (
          <div key={index} className="h-9 w-14 !rounded-xl bg-skeleton" />
        ))}
    </div>
  </div>
);

export default EventCardSkeleton;
