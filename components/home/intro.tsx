import classNames from "classnames";
import Image from "next/image";

const HomeIntro = () => (
  <section
    className={classNames(
      "section wrapper",
      "flex flex-col gap-10",
      "lg:flex-row",
    )}
  >
    <article className={classNames("w-full", "lg:w-2/3")}>
      <h2 className={classNames("mb-4 text-3xl font-black uppercase", "")}>
        Acro World Tour 2023 Teaser
      </h2>
      <iframe
        src="https://www.youtube.com/embed/44WsXRnHtms"
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        className={classNames("aspect-video w-full rounded shadow-lg")}
      />
    </article>
    <div className={classNames("introduction__news news")}>
      <h2 className={classNames("introduction__title")}>Hot News</h2>
      <div className={classNames("news__list")}>
        <a
          href="/news/the-awt-2023-is-about-to-start"
          className={classNames("news__item")}
        >
          <div className={classNames("news__image")}>
            <Image src="/img/news/news-1.jpg" alt="" height={0} width={0} />
          </div>
          <div className={classNames("news__content")}>
            <div className={classNames("news__topic")}>
              <h3 className={classNames("news__title")}>
                The AWT 2023 is about to start!
              </h3>
              <span className={classNames("news__date")}>25 May 2023</span>
            </div>
            <i className={classNames("news__arrow")}></i>
          </div>
        </a>
        <div className={classNames("news__more")}>
          <a
            href="/news/the-awt-2022-overall-standings"
            className={classNames("news__item news__item--min")}
          >
            <div className={classNames("news__image")}>
              <Image src="/img/news/news-2.jpg" alt="" height={0} width={0} />
            </div>
            <div className={classNames("news__content")}>
              <div className={classNames("news__topic")}>
                <h3 className={classNames("news__title")}>
                  The AWT 2022 Overall Standings
                </h3>
                <span className={classNames("news__date")}>
                  24 September 2022
                </span>
              </div>
              <i className={classNames("news__arrow")}></i>
            </div>
          </a>
          <a
            href="/news/theo-de-blic-and-luke-the-weert-are-out-of-season"
            className={classNames("news__item news__item--min")}
          >
            <div className={classNames("news__image")}>
              <Image src="/img/news/news-3.jpg" alt="" height={0} width={0} />
            </div>
            <div className={classNames("news__content")}>
              <div className={classNames("news__topic")}>
                <h3 className={classNames("news__title")}>
                  Theo de Blic & Luke de Weert are out of the season!
                </h3>
                <span className={classNames("news__date")}>
                  12 September 2022
                </span>
              </div>
              <i className={classNames("news__arrow")}></i>
            </div>
          </a>
        </div>
      </div>
    </div>
  </section>
);

export default HomeIntro;
