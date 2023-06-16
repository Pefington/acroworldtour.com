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

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <SWRConfig value={{ fetcher }}>
      <Layout fontClass={font.className}>
        <main className={classNames(font.className, "flex w-full flex-col")}>
          <Component {...pageProps} />
        </main>
      </Layout>
    </SWRConfig>
  );
};

export default App;
