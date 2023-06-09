import classNames from "classnames";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const HomeIntro = () => {
  const [isHoveredNews1, setIsHoveredNews1] = useState(false);
  const [isHoveredNews2, setIsHoveredNews2] = useState(false);
  const [isHoveredNews3, setIsHoveredNews3] = useState(false);

  return (
    <section
      className={classNames(
        "section wrapper",
        "flex flex-col gap-10",
        "lg:flex-row",
      )}
    >
      <article
        className={classNames(
          /* "introduction__video", */
          "w-full",
          "lg:w-2/3",
        )}
      >
        <h2
          className={classNames(
            /* "introduction__title", */
            "mb-4 text-3xl font-black uppercase",
          )}
        >
          Acro World Tour 2023 Teaser
        </h2>
        <iframe
          src="https://www.youtube.com/embed/44WsXRnHtms"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className={classNames(
            /* "introduction__iframe", */
            "aspect-video w-full rounded shadow-md",
          )}
        />
      </article>
      <section className={classNames(/* "introduction__news news", */)}>
        <h2
          className={classNames(
            /* "introduction__title", */
            "mb-4 text-3xl font-black uppercase",
          )}
        >
          Hot News
        </h2>
        <div
          className={classNames(
            /* "news__list", */
            "flex flex-col gap-3",
            "sm:flex-row",
            "lg:w-full lg:flex-col",
          )}
        >
          <Link
            href="/news/the-awt-2023-is-about-to-start"
            className={classNames(
              /* "news__item", */
              "overflow-hidden rounded shadow-md",
            )}
            onMouseEnter={() => setIsHoveredNews1(true)}
            onMouseLeave={() => setIsHoveredNews1(false)}
          >
            <div
              className={classNames(
                /* "news__image", */
                "relative w-full overflow-hidden pt-[50%]",
              )}
            >
              <Image
                src="/img/news/news-1.jpg"
                alt="Picture of a paraglider landing in a lake"
                fill
                className={classNames(
                  /* "news__image img", */
                  "duration-1000",
                  isHoveredNews1 && "scale-105",
                )}
              />
            </div>
            <div
              className={classNames(
                /* "news__content", */
                "flex items-center px-7 py-4 uppercase",
              )}
            >
              <div
                className={classNames(
                  /* "news__topic", */
                  "w-full",
                )}
              >
                <h3
                  className={classNames(
                    /* "news__title", */
                    "mb-1 font-bold",
                  )}
                >
                  The AWT 2023 is about to start!
                </h3>
                <span
                  className={classNames(
                    /* "news__date", */
                    "text-sm font-medium text-secondary",
                  )}
                >
                  25 May 2023
                </span>
              </div>
              <Image
                src="/img/icons/arrow.svg"
                alt=""
                height={20}
                width={20}
                className={classNames(
                  /* "news__arrow", */
                  "aspect-square h-5",
                  isHoveredNews1 && "translate-x-1/4",
                )}
              />
            </div>
          </Link>
          <div
            className={classNames(
              /* "news__more", */
              "flex flex-col gap-3",
              "sm:w-1/2",
              "lg:w-full",
            )}
          >
            <Link
              href="/news/the-awt-2022-overall-standings"
              className={classNames(
                /* "news__item news__item--min", */
                "flex rounded p-4 shadow-md",
              )}
              onMouseEnter={() => setIsHoveredNews2(true)}
              onMouseLeave={() => setIsHoveredNews2(false)}
            >
              <div
                className={classNames(
                  /* "news__image", */
                  "relative aspect-square min-h-[100px]",
                )}
              >
                <Image
                  src="/img/news/news-2.jpg"
                  alt=""
                  fill
                  className={classNames(
                    /* "news__image img", */
                    "duration-1000",
                    "rounded-xl object-cover",
                    isHoveredNews2 && "scale-105",
                  )}
                />
              </div>
              <div
                className={classNames(
                  /* "news__content", */
                  "flex items-center px-7 uppercase",
                )}
              >
                <div
                  className={classNames(
                    /* "news__topic", */
                    "",
                  )}
                >
                  <h3
                    className={classNames(
                      /* "news__title", */
                      "",
                    )}
                  >
                    The AWT 2022 Overall Standings
                  </h3>
                  <span
                    className={classNames(
                      /* "news__date", */
                      "",
                    )}
                  >
                    24 September 2022
                  </span>
                </div>
                <Image
                  src="/img/icons/arrow.svg"
                  alt=""
                  height={20}
                  width={20}
                  className={classNames(
                    /* "news__arrow", */
                    "aspect-square h-5",
                    isHoveredNews2 && "translate-x-1/4",
                  )}
                />
              </div>
            </Link>

            <Link
              href="/news/theo-de-blic-and-luke-the-weert-are-out-of-season"
              className={classNames(
                /* "news__item news__item--min", */
                "flex rounded p-4 shadow-md",
              )}
              onMouseEnter={() => setIsHoveredNews3(true)}
              onMouseLeave={() => setIsHoveredNews3(false)}
            >
              <div
                className={classNames(
                  /* "news__image", */
                  "relative aspect-square min-h-[100px]",
                )}
              >
                <Image
                  src="/img/news/news-3.jpg"
                  alt=""
                  fill
                  className={classNames(
                    /* "news__image img", */
                    "duration-1000",
                    "rounded-xl",
                    isHoveredNews3 && "scale-105",
                  )}
                />
              </div>
              <div
                className={classNames(
                  /* "news__content", */
                  "flex items-center px-7 py-4 uppercase",
                )}
              >
                <div
                  className={classNames(
                    /* "news__topic", */
                    "",
                  )}
                >
                  <h3
                    className={classNames(
                      /* "news__title", */
                      "",
                    )}
                  >
                    Theo de Blic & Luke de Weert are out of the season!
                  </h3>
                  <span
                    className={classNames(
                      /* "news__date", */
                      "",
                    )}
                  >
                    12 September 2022
                  </span>
                </div>
                <Image
                  src="/img/icons/arrow.svg"
                  alt=""
                  height={20}
                  width={20}
                  className={classNames(
                    /* "news__arrow", */
                    "aspect-square h-5",
                    isHoveredNews3 && "translate-x-1/4",
                  )}
                />
              </div>
            </Link>
          </div>
        </div>
      </section>
    </section>
  );
};

export default HomeIntro;
