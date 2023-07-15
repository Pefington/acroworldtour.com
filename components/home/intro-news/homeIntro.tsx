import cn from "classix";

import HomeIntroNewsMain from "./homeIntroNewsMain";
import HomeIntroNewsSecondary from "./homeIntroNewsSecondary";
import HomeYouTubeEmbed from "./homeYoutubeEmbed";

const HomeIntro = () => {
  return (
    <div
      className={cn(
        "awt-home-section awt-center",
        "flex flex-col gap-10",
        "lg:flex-row",
      )}
    >
      <HomeYouTubeEmbed
        title="Acro World Tour 2023 | Stop 01 - Nest Games"
        embedId="tIfpP5pdqZ4"
      />

      <section className={cn("flex flex-col")}>
        <h2 className={cn("mb-4 text-3xl font-black uppercase")}>Hot News</h2>

        <HomeIntroNewsMain
          title="Nest Games AWT 01 Results"
          href="news/nest-games-results"
          imageUrl="/img/news/DSC05527.jpg"
        />

        <div className={cn("flex flex-col gap-3")}>
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
    </div>
  );
};

export default HomeIntro;
