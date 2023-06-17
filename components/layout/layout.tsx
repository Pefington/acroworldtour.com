import Head from "next/head";
import { ReactNode, useState } from "react";

import Footer from "./footer";
import LayoutContext from "./layoutContext";
import Nav from "./nav";

interface LayoutProps {
  children: ReactNode;
  fontClass: string;
}

const Layout = ({ children, fontClass }: LayoutProps) => {
  const [pageTitle, setPageTitle] = useState("");
  const [pageDescription, setPageDescription] = useState("");
  const [activeNav, setActiveNav] = useState("");

  return (
    <LayoutContext.Provider
      value={{
        pageTitle,
        pageDescription,
        activeNav,
        setPageTitle,
        setPageDescription,
        setActiveNav,
      }}
    >
      <Head>
        <title>{pageTitle}</title>

        <meta name="description" content={pageDescription} />

        <meta
          name="Generator"
          content="Acro World Tour - Copyright (C). All rights reserved."
        />
        <meta name="author" content="Acro World Tour" />
        <meta
          name="copyright"
          content="Copyright &copy; Acro World Tour, All Rights Reserved"
        />
        <meta name="reply-to" content="info[at]acroworldtour.com" />
        <meta
          name="Keywords"
          content="Acro World Tour - The world's best pilots fighting for the most prestigious title"
        />
        <meta
          name="Description"
          content="The world's best pilots fighting for the most prestigious title"
        />

        {/* Favicon */}
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="theme-color" content="#ffffff" />
      </Head>
      <Nav fontClass={fontClass} activeNav={activeNav} />
      {children}
      <Footer />
    </LayoutContext.Provider>
  );
};

export default Layout;
