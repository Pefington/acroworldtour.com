import Head from "next/head";
import { ReactNode, useState } from "react";

import Header from "./header";
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
      </Head>
      <Header fontClass={fontClass} />
      {children}
      <Nav fontClass={fontClass} activeNav={activeNav} />
    </LayoutContext.Provider>
  );
};

export default Layout;
