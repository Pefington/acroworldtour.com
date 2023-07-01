import { useEffect } from "react";
import { preload } from "swr";

import HomePilots from "@/components/home/discover-pilots/homePilots";
import HomeHero from "@/components/home/homeHero";
import HomeIntro from "@/components/home/intro-news/homeIntro";
import HomeResults from "@/components/home/latest-results/homeResults";
import HomeRules from "@/components/home/learn-rules/homeRules";
import HomeEvents from "@/components/home/upcoming-events/homeEvents";
import { API_URL } from "@/constants";
import { useLayout } from "@/state/layoutContext";
import { fetcher } from "@/utils/fetcher";

preload(`${API_URL}/competitions/`, fetcher);
preload(`${API_URL}/seasons/`, fetcher);
preload(`${API_URL}/pilots/`, fetcher);

const Home = () => {
  const { setPageTitle, setPageDescription, setActiveNav } = useLayout();

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
      <HomeEvents />
      <HomeResults />
      <HomePilots />
      <HomeRules />
    </>
  );
};

export default Home;
