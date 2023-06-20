import classNames from "classnames";
import { ChangeEvent, Dispatch, SetStateAction } from "react";

interface Props {
  years: number[];
  list: any[];
  pluralString: string;
  selectedYear: number;
  setSelectedYear: Dispatch<SetStateAction<number>>;
}

const YearSelector = ({
  years,
  list,
  pluralString,
  selectedYear,
  setSelectedYear,
}: Props) => {
  const handleYearChange = ({ target }: ChangeEvent<HTMLSelectElement>) => {
    const year = parseInt(target.value);
    setSelectedYear(year);
  };

  return (
    <>
      <h1
        className={classNames(
          "mr-3 min-w-max",
          "text-4xl font-black",
          "md:text-6xl",
        )}
      >
        <label htmlFor="year-selector">
          {list.length === 0
            ? `No ${pluralString} in `
            : `${list.length} ${pluralString} in `}
        </label>
      </h1>
      <select
        id="year-selector"
        title="Select a year"
        value={selectedYear ?? ""}
        className={classNames(
          "border-none bg-transparent focus:ring-0 md:text-6xl",
          "-ml-3 pr-14",
          "md:pr-24",
          "text-4xl font-black",
        )}
        onChange={handleYearChange}
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
    </>
  );
};

export default YearSelector;
