import cx from "classix";

import HomeIntroNewsMain from "./HomeIntroNewsMain";
import HomeIntroNewsSecondary from "./HomeIntroNewsSecondary";
import HomeYouTubeEmbed from "./HomeYoutubeEmbed";

const HomeIntro = () => {
  return (
    <div
      className={cx(
        "awt-home-section awt-center",
        "flex flex-col gap-10",
        "lg:flex-row",
      )}
    >
      <HomeYouTubeEmbed
        title="Acro World Tour 2023 | Stop 01 - Nest Games"
        embedId="tIfpP5pdqZ4"
      />

      <section className={cx("flex flex-col")}>
        <h2 className={cx("mb-4 text-3xl font-black uppercase")}>Hot News</h2>

        <HomeIntroNewsMain
          title="Dutch pilot wins Acro World Cup for the first time in history"
          date="17 June 2023"
          href="/news/kings-of-the-box-results"
          imageUrl="/img/news/news-1.webp"
        />

        <div className={cx("flex flex-col gap-3")}>
          <HomeIntroNewsSecondary
            title="Nest Games AWT 01 results"
            date="24 September 2022"
            href="/news/nest-games-results"
            imageUrl="/img/news/news-2.webp"
          />
          <HomeIntroNewsSecondary
            title="The AWT 2023 is about to start!"
            date="24 September 2022"
            href="/news/the-awt-2023-is-about-to-start"
            imageUrl="/img/news/news-3.webp"
          />
        </div>
      </section>
    </div>
  );
};

export default HomeIntro;
