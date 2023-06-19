import "@/styles/tailwind.css";

import classNames from "classnames";
import type { AppProps } from "next/app";
import { Exo } from "next/font/google";
import { SWRConfig } from "swr";

import Layout from "@/components/layout/layout";
import { fetcher } from "@/utils/fetcher";

const font = Exo({
  subsets: ["latin"],
});

export const fontClass = font.className;

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <SWRConfig value={{ fetcher }}>
      <Layout fontClass={font.className}>
        <main
          className={classNames(
            font.className,
            "w-full grow",
            "flex flex-col",
            "md:pt-20",
          )}
        >
          <Component {...pageProps} />
        </main>
      </Layout>
    </SWRConfig>
  );
};

export default App;
