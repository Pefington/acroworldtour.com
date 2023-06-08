import "@/styles/globals.css";
import "semantic-ui-flag/flag.min.css";

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
        <Component {...pageProps} className={font.className} />
      </Layout>
    </SWRConfig>
  );
};

export default App;
