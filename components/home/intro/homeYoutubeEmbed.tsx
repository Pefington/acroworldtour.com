import cn from "classnames";

interface Props {
  title: string;
  embedSlug: string;
}

const HomeYouTubeEmbed = ({ title, embedSlug }: Props) => (
  <article className={cn("w-full", "lg:w-2/3")}>
    <h2 className={cn("mb-4 text-3xl font-black uppercase")}>{title}</h2>
    <iframe
      src={`https://www.youtube-nocookie.com/embed/${embedSlug}`}
      title="YouTube video player"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowFullScreen
      className={cn("aspect-video w-full rounded shadow-md outline-none")}
    />
  </article>
);

export default HomeYouTubeEmbed;
