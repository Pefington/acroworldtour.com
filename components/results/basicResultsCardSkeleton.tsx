import cn from "classix";

interface Props {
  error: boolean;
  limitTo?: number;
}

const BasicResultsCard = ({ error, limitTo = 5 }: Props) => {
  return (
    <article
      title={error ? "Could not fetch data." : "Fetching data..."}
      className={cn(
        "relative",
        "w-full pt-8",
        "rounded shadow-md",
        "[&_div]:rounded-sm",
        "[&_div]:animate-pulse",
        error && "outline outline-red-500/80 [&>*]:animate-none",
      )}
    >
      {error && (
        <div className="absolute inset-0 z-10 grid place-items-center py-32">
          <div className="text-9xl opacity-60">😵</div>
          <div className="text-2xl font-semibold text-red-500 opacity-80">
            Could not fetch data.
          </div>
        </div>
      )}
      <div className="mx-7 h-6 w-2/3 bg-skeleton" />
      <div className="mx-7 mt-3 h-4 w-1/3 bg-skeleton/60" />
      <header className="mb-4 mt-6 grid h-4 w-full grid-cols-12 px-7 [&>*]:bg-skeleton/60">
        <div className="col-span-2 w-8" />
        <div className="col-span-8 ml-9 w-10" />
        <div className="col-span-2 w-8" />
      </header>

      <ul className="w-full">
        {Array(limitTo)
          .fill(0)
          .map((_, index) => (
            <li
              key={index}
              className="grid grid-cols-12 px-7 py-4 odd:bg-secondary-light/75 [&_div]:bg-skeleton"
            >
              <div className="col-span-2 h-5 w-5 " />
              <span className="col-span-8 flex gap-4">
                <div className="w-5 !rounded-full" />
                <div className="my-0.5 w-48" />
              </span>
              <div className="col-span-2 w-14 bg-skeleton" />
            </li>
          ))}
      </ul>

      <footer className="grid w-full place-items-center py-5">
        <div className="h-4 w-24 bg-skeleton/60" />
      </footer>
    </article>
  );
};

export default BasicResultsCard;
