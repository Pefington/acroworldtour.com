import { useEffect } from "react";

import HomePilots from "@/components/home/discover-pilots/homePilots";
import HomeHero from "@/components/home/homeHero";
import HomeIntro from "@/components/home/intro-news/homeIntro";
import HomeResults from "@/components/home/latest-results/homeResults";
import HomeRules from "@/components/home/learn-rules/homeRules";
import HomeEvents from "@/components/home/upcoming-events/homeEvents";
import ApiDown from "@/components/ui/apiDown";
import { useLayout } from "@/state/layoutContext";
import { swrPreload, useAPI } from "@/utils/swr";

swrPreload("competitions");
swrPreload("seasons");
swrPreload("pilots");

const Home = () => {
  const { setPageTitle, setPageDescription, setActiveNav } = useLayout();

  const { isApiDown } = useAPI("seasons");

  useEffect(() => {
    setPageTitle(
      "Acro World Tour | The world's best pilots fighting for the most prestigious title",
    );
    setPageDescription(
      `Home page for the official web application of the Acro World Tour.
      In this app you can find everything you need to know about competition results and your favourite pilots.`,
    );
    setActiveNav("home");
  }, [setActiveNav, setPageDescription, setPageTitle]);

  return (
    <>
      <HomeHero />
      <HomeIntro />
      {isApiDown ? (
        <ApiDown />
      ) : (
        <>
          <HomeEvents />
          <HomeResults />
          <HomePilots />
        </>
      )}
      <HomeRules />
    </>
  );
};

export default Home;
