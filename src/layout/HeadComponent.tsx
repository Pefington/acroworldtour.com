import { pageDescriptionAtom, pageTitleAtom } from "@state";
import { useAtom } from "jotai";
import Head from "next/head";

const HeadComponent = () => {
  const [pageTitle] = useAtom(pageTitleAtom);
  const [pageDescription] = useAtom(pageDescriptionAtom);

  return (
    <Head>
      <title>{pageTitle}</title>

      <meta name="description" content={pageDescription} />

      <meta name="generator" content="Acro World Tour - Copyright (C). All rights reserved." />
      <meta name="author" content="Acro World Tour" />
      <meta name="copyright" content="Copyright &copy; Acro World Tour, All Rights Reserved" />
      <meta name="reply-to" content="info[at]acroworldtour.com" />
      <meta
        name="keywords"
        content="Acro World Tour AWT Paragliding Competitions Championships FAI Féderation Aéronautique Internationale"
      />

      {/* Favicon */}
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="manifest" href="/site.webmanifest" />
      <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
      <meta name="msapplication-TileColor" content="#ffffff" />
      <meta name="theme-color" content="#ffffff" />
    </Head>
  );
};

export default HeadComponent;
