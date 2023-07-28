import HomeEvents from "@home/HomeEvents";
import HomeHero from "@home/HomeHero";
import HomeIntro from "@home/HomeIntro";
import HomePilots from "@home/HomePilots";
import HomeResults from "@home/HomeResults";
import HomeRules from "@home/HomeRules";
import { activeNavAtom, pageDescriptionAtom, pageTitleAtom } from "@state";
import { swrPreload } from "@utils/swr";
import { useSetAtom } from "jotai";
import { useEffect } from "react";

swrPreload("competitions");
swrPreload("seasons");
swrPreload("pilots");

const Home = () => {
  const setActiveNav = useSetAtom(activeNavAtom);
  const setPageTitle = useSetAtom(pageTitleAtom);
  const setPageDescription = useSetAtom(pageDescriptionAtom);

  useEffect(() => {
    setActiveNav("home");
    setPageTitle(
      "Acro World Tour | The world's best pilots fighting for the most prestigious title",
    );
    setPageDescription(
      `Home page for the official web application of the Acro World Tour.
      In this app you can find everything you need to know about competition results and your favourite pilots.`,
    );
  }, [setActiveNav, setPageTitle, setPageDescription]);

  return (
    <>
      <HomeHero />
      <HomeIntro />

      <HomeEvents />
      <HomeResults />
      <HomePilots />

      <HomeRules />
    </>
  );
};

export default Home;
