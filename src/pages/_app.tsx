import "@styles/tailwind.css";

import Footer from "@layout/Footer";
import HeadComponent from "@layout/HeadComponent";
import Nav from "@layout/Nav";
import cx from "classix";
import type { AppProps } from "next/app";
import { Exo } from "next/font/google";

const font = Exo({
  subsets: ["latin"],
});

const { className } = font;

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <HeadComponent />
      <Nav className={className} />

      <main className={cx(className, "flex w-full grow flex-col md:pt-20")}>
        <Component {...pageProps} />
      </main>

      <Footer />
    </>
  );
};

export default App;
