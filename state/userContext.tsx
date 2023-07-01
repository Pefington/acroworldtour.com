import { createContext, useContext } from "react";

import { components } from "@/types";

type Season = components["schemas"]["SeasonExport"];
type SeasonCode = Season["code"];
type Year = number;

const currentYear = new Date().getFullYear();

interface Events {
  activeYear: Year;
  setActiveYear: Function;
  activeSeasonCodes: { [key: Year]: SeasonCode };
  setActiveSeasonCodes: Function;
}

const UserContext = createContext<Events>({
  activeYear: currentYear,
  setActiveYear: () => {},
  activeSeasonCodes: {},
  setActiveSeasonCodes: () => {},
});

export const useEvents = () => useContext(UserContext);

export default UserContext;
