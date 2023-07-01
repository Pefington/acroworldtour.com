import "@/styles/tailwind.css";

import cn from "classnames";
import type { AppProps } from "next/app";
import { Exo } from "next/font/google";
import { useState } from "react";
import { SWRConfig } from "swr";

import Layout from "@/components/layout/layout";
import UserContext from "@/state/userContext";
import { fetcher } from "@/utils/fetcher";

const font = Exo({
  subsets: ["latin"],
});

export const fontClass = font.className;

const currentYear = new Date().getFullYear();

const App = ({ Component, pageProps }: AppProps) => {
  const [activeYear, setActiveYear] = useState(currentYear);
  const [seasonCodes, setSeasonCodes] = useState({});

  return (
    <SWRConfig value={{ fetcher }}>
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
              activeYear,
              setActiveYear,
              activeSeasonCodes: seasonCodes,
              setActiveSeasonCodes: setSeasonCodes,
            }}
          >
            <Component {...pageProps} />
          </UserContext.Provider>
        </main>
      </Layout>
    </SWRConfig>
  );
};

export default App;
