import classNames from "classnames";

import HomeIntroNewsMain from "./homeIntroNewsMain";
import HomeIntroNewsSecondary from "./homeIntroNewsSecondary";
import HomeIntroVideo from "./homeIntroVideo";

const HomeIntro = () => {
  return (
    <section
      className={classNames(
        "awt-section awt-center",
        "flex flex-col gap-10",
        "lg:flex-row",
      )}
    >
      <HomeIntroVideo
        title="Replay Acro World Tour 2023 Nest Games"
        /* Use youtube-nocookie.com (official) as we don't want tracking */
        embedUrl="https://www.youtube-nocookie.com/embed/G3mZelZKIaU"
      />

      <section className={classNames("flex flex-col")}>
        <h2 className={classNames("mb-4 text-3xl font-black uppercase")}>
          Hot News
        </h2>

        <HomeIntroNewsMain
          title="Nest Games AWT 01 Results"
          href="news/nest-games-results"
          imageUrl="/img/news/DSC05527.jpg"
        />

        <div className={classNames("flex flex-col gap-3")}>
          <HomeIntroNewsSecondary
            title="The AWT 2023 is about to start!"
            href="/news/the-awt-2023-is-about-to-start"
            imageUrl="/img/news/news-1.jpg"
          />
          <HomeIntroNewsSecondary
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
