import HomePilots from "@home/discover-pilots/homePilots";
import HomeHero from "@home/homeHero";
import HomeIntro from "@home/intro-news/homeIntro";
import HomeResults from "@home/latest-results/homeResults";
import HomeRules from "@home/learn-rules/homeRules";
import HomeEvents from "@home/upcoming-events/homeEvents";
import { useLayout } from "@state/layoutContext";
import ApiDown from "@ui/apiDown";
import { swrPreload, useAPI } from "@utils/swr";
import { useEffect } from "react";

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
