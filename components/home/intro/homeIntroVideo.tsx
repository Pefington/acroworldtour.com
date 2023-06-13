import classNames from "classnames";

interface Props {
  title: string;
  embedUrl: string;
}

const HomeIntroVideo = ({ title, embedUrl }: Props) => (
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
      {title}
    </h2>
    <iframe
      src={embedUrl}
      title="YouTube video player"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowFullScreen
      className={classNames(
        /* "introduction__iframe", */
        "aspect-video w-full rounded shadow-md",
      )}
    />
  </article>
);

export default HomeIntroVideo;