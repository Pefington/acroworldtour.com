import cn from "classix";
import { CircleFlag } from "react-circle-flags";

import { getCountryCode, getCountryName } from "@/utils/countries";

interface Props {
  country: string | undefined;
  className?: string;
}

export const Flag = ({ country, className }: Props) => (
  <CircleFlag
    title={getCountryName(country)}
    width={20}
    height={20}
    countryCode={getCountryCode(country)}
    className={cn(className || "h-5 w-5")}
  />
);
