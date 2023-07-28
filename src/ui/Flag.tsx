import { getCountryCode, getCountryName } from "@utils/countries";
import cx from "classix";
import { CircleFlag } from "react-circle-flags";

interface Props {
  country: string | undefined;
  className?: string;
}

export const Flag = ({ country, className }: Props) => (
  <CircleFlag
    title={getCountryName(country) || country}
    width={20}
    height={20}
    countryCode={getCountryCode(country)}
    className={cx(className || "h-5 w-5")}
  />
);
