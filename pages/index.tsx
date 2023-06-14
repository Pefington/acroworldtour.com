// import dynamic from "next/dynamic";
import { useEffect } from "react";
import { preload } from "swr";

import HomeHero from "@/components/home/hero";
import HomeIntro from "@/components/home/intro/homeIntro";
import HomePilots from "@/components/home/pilots/homePilots";
import HomeResults from "@/components/home/results/homeResults";
import HomeUpcoming from "@/components/home/upcoming/homeUpcoming";
// import CurrentCompetitions from "@/components/competition/currentCompetitions";
// import Download from "@/components/download";
import { useLayout } from "@/components/layout/layoutContext";
import { API_URL } from "@/constants";
import { fetcher } from "@/utils/fetcher";

// const About = dynamic(() => import("@/components/about"), {
//   ssr: false,
// });

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
      <HomeUpcoming />
      <HomeResults />
      <HomePilots />
      {/* <About />
      <CurrentCompetitions />
      <Download /> */}
    </>
  );
};

export default Home;
