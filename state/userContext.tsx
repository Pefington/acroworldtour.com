import { createContext, useContext } from "react";

import { components } from "@/types";

type Season = components["schemas"]["SeasonExport"];
type SeasonCode = Season["code"];
type Year = number;

const currentYear = new Date().getFullYear();

interface UserState {
  youTubeConsent: boolean;
  setYouTubeConsent: Function;
  activeYear: Year;
  setActiveYear: Function;
  activeSeasonCodes: { [key: Year]: SeasonCode };
  setActiveSeasonCodes: Function;
}

const UserContext = createContext<UserState>({
  youTubeConsent: false,
  setYouTubeConsent: () => {},
  activeYear: currentYear,
  setActiveYear: () => {},
  activeSeasonCodes: {},
  setActiveSeasonCodes: () => {},
});

export const useUserContext = () => useContext(UserContext);

export default UserContext;
