import classNames from "classnames";

import HomeNewsMain from "./newsMain";
import HomeNewsSecondary from "./newsSecondary";
import HomeVideo from "./video";

const HomeIntro = () => {
  return (
    <section
      className={classNames(
        "section wrapper",
        "flex flex-col gap-10",
        "lg:flex-row",
      )}
    >
      <HomeVideo
        title="Replay Acro World Tour 2023 Nest Games"
        /* USE youtube-nocookie.com (official) as we don't want tracking */
        embedUrl="https://www.youtube-nocookie.com/embed/G3mZelZKIaU"
      />

      <section className={classNames("flex flex-col")}>
        <h2 className={classNames("mb-4 text-3xl font-black uppercase")}>
          Hot News
        </h2>

        <HomeNewsMain
          title="Nest Games AWT 01 Results"
          href="news/nest-games-results"
          imageUrl="/img/news/DSC05527.jpg"
        />

        <div className={classNames("flex flex-col gap-3")}>
          <HomeNewsSecondary
            title="The AWT 2023 is about to start!"
            href="/news/the-awt-2023-is-about-to-start"
            imageUrl="/img/news/news-1.jpg"
          />
          <HomeNewsSecondary
            title="The AWT 2022 Overall Standings"
            href="/news/the-awt-2022-overall-standings"
            imageUrl="/img/news/news-2.jpg"
          />
        </div>
      </section>
    </section>
  );
};

export default HomeIntro;
