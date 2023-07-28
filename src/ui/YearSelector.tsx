import { activeYearAtom } from "@state";
import cx from "classix";
import { useAtom } from "jotai";

interface Props {
  years: number[];
  list: any[];
  pluralString: string;
  loading?: boolean;
}

const YearSelector = ({ years, list, pluralString, loading }: Props) => {
  const [activeYear, setActiveYear] = useAtom(activeYearAtom);

  return (
    <>
      <h1
        className={cx(
          "mr-3 min-w-max",
          "text-4xl font-black",
          "md:text-6xl",
          loading && "opacity-30",
        )}
      >
        <label htmlFor="year-selector">
          {loading
            ? "Fetching events..."
            : list.length === 0
            ? `No ${pluralString} in `
            : `${list.length} ${pluralString} in `}
        </label>
      </h1>
      {!loading && (
        <select
          id="year-selector"
          title="Select a year"
          value={activeYear ?? ""}
          className={cx(
            "border-none bg-transparent focus:ring-0 md:text-6xl",
            "-ml-3 pr-14",
            "md:pr-24",
            "text-4xl font-black",
          )}
          onChange={({ target }) => setActiveYear(Number(target.value))}
        >
          {years.map((year) => (
            <option
              key={year}
              value={year}
              className="bg-secondary-light font-sans text-xl"
            >
              {year}
            </option>
          ))}
        </select>
      )}
    </>
  );
};

export default YearSelector;
