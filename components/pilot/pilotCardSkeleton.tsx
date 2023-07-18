import cn from "classix";

interface Props {
  error: boolean;
}

const PilotCardSkeleton = ({ error }: Props) => (
  <article
    title={error ? "Could not fetch data." : "Fetching data..."}
    className={cn(
      "flex flex-col items-center justify-end gap-2",
      "aspect-[260/370] w-full max-w-card",
      "rounded bg-skeleton shadow-md",
      "pb-8",
      error ? "outline outline-red-500/80 [&>*]:animate-none" : "animate-pulse",
    )}
  >
    <h3 className="text-9xl opacity-40">{error && "😵"}</h3>
    <div className="mb-12 text-2xl font-semibold text-red-500 opacity-80">
      {error && "Could not fetch data."}
    </div>
    <div className="h-5 w-3/5 rounded-sm bg-white/75" />
    <div className="h-4 w-1/3 rounded-sm bg-secondary-light/75" />
  </article>
);

export default PilotCardSkeleton;
