import classNames from "classnames";

const HomeIntro = () => (
  <section className="section">
    <div className="wrapper introduction">
      <div className="introduction__video">
        <h2 className="introduction__title">Acro World Tour 2023 Teaser</h2>
        <div className="introduction__iframe">
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/44WsXRnHtms"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </div>
      </div>
      <div className="introduction__news news">
        <h2 className="introduction__title">Hot News</h2>
        <div className="news__list">
          <a href="/news/the-awt-2023-is-about-to-start" className="news__item">
            <div className="news__image">
              <img src="/assets/img/news/news-1.jpg" />
            </div>
            <div className="news__content">
              <div className="news__topic">
                <h3 className="news__title">The AWT 2023 is about to start!</h3>
                <span className="news__date">25 May 2023</span>
              </div>
              <i className="news__arrow"></i>
            </div>
          </a>
          <div className="news__more">
            <a
              href="/news/the-awt-2022-overall-standings"
              className="news__item news__item--min"
            >
              <div className="news__image">
                <img src="/assets/img/news/news-2.jpg" />
              </div>
              <div className="news__content">
                <div className="news__topic">
                  <h3 className="news__title">
                    The AWT 2022 Overall Standings
                  </h3>
                  <span className="news__date">24 September 2022</span>
                </div>
                <i className="news__arrow"></i>
              </div>
            </a>
            <a
              href="/news/theo-de-blic-and-luke-the-weert-are-out-of-season"
              className="news__item news__item--min"
            >
              <div className="news__image">
                <img src="/assets/img/news/news-3.jpg" />
              </div>
              <div className="news__content">
                <div className="news__topic">
                  <h3 className="news__title">
                    Theo de Blic & Luke de Weert are out of the season!
                  </h3>
                  <span className="news__date">12 September 2022</span>
                </div>
                <i className="news__arrow"></i>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default HomeIntro;
