import "@/styles/tailwind.css";

import cn from "classix";
import type { AppProps } from "next/app";
import { Exo } from "next/font/google";
import { useState } from "react";

import Layout from "@/components/layout/layout";
import UserContext from "@/state/userContext";

const font = Exo({
  subsets: ["latin"],
});

export const fontClass = font.className;

const currentYear = new Date().getFullYear();

const App = ({ Component, pageProps }: AppProps) => {
  const [activeYear, setActiveYear] = useState(currentYear);
  const [activeSeasonCodes, setActiveSeasonCodes] = useState({});
  const [youTubeConsent, setYouTubeConsent] = useState(false);

  return (
    <Layout fontClass={font.className}>
      <main
        className={cn(
          font.className,
          "w-full grow",
          "flex flex-col",
          "md:pt-20",
        )}
      >
        <UserContext.Provider
          value={{
            youTubeConsent,
            setYouTubeConsent,
            activeYear,
            setActiveYear,
            activeSeasonCodes,
            setActiveSeasonCodes,
          }}
        >
          <Component {...pageProps} />
        </UserContext.Provider>
      </main>
    </Layout>
  );
};

export default App;
