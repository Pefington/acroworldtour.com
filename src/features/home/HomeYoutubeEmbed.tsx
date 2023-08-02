import { youTubeConsentAtom } from "@state";
import { YouTubeIcon } from "@ui/icons";
import cx from "classix";
import { useAtom } from "jotai";
import Image from "next/image";
import { useState } from "react";

interface Props {
  title: string;
  embedId: string;
}

const HomeYouTubeEmbed = ({ title, embedId }: Props) => {
  const [showDialog, setShowDialog] = useState(false);
  const [youTubeConsent, setYouTubeConsent] = useAtom(youTubeConsentAtom);

  const handleDialog = (choice: "Accepted" | "Rejected") => {
    if (choice === "Accepted") setYouTubeConsent(true);
    setShowDialog(false);
  };

  return (
    <article className={cx("w-full", "lg:w-2/3")}>
      <h2 className={cx("mb-4 text-3xl font-black uppercase")}>{title}</h2>
      {youTubeConsent ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${embedId}`}
          title="YouTube Video Player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className={cx("aspect-video w-full rounded shadow-md outline-none")}
        />
      ) : (
        <div
          role="button"
          tabIndex={0}
          className={cx(
            "relative grid place-items-center",
            "rounded bg-white shadow-md",
            "aspect-video w-full",
            showDialog && "pointer-events-none",
          )}
          onClick={() => setShowDialog(true)}
          onKeyDown={({ key }) => key === "Enter" && setShowDialog(true)}
        >
          <Image
            src={`https://img.youtube.com/vi/${embedId}/0.jpg`}
            alt="Youtube Video Thumbnail"
            fill
            sizes="100vw"
            className={cx("rounded object-cover")}
          />

          <YouTubeIcon className={cx("z-20 scale-[300%] fill-[#ff0000]")} />
          <div className={cx("absolute z-10 h-8 w-8 bg-white")} />

          {showDialog && (
            <div
              className={cx(
                "absolute z-30 flex max-w-sm flex-col gap-4",
                "rounded bg-white shadow-xl",
                "text-left text-lg font-semibold",
                "px-2 py-8",
                "lg:px-8",
              )}
            >
              <p>{`Choosing 'OK' will load the YouTube embed and Google may track you.`}</p>
              <p>{`We can't help that.`}</p>
              <div className={cx("mt-4 flex w-full justify-center gap-8")}>
                <button
                  className={cx(
                    "pointer-events-auto rounded-lg bg-[#ff0000] px-3 py-1 text-white hover:font-black",
                  )}
                  onClick={(event) => {
                    event.stopPropagation();
                    handleDialog("Accepted");
                  }}
                >
                  OK
                </button>
                <button
                  className={cx(
                    "pointer-events-auto rounded-lg bg-secondary px-3 py-1 text-white hover:font-black",
                  )}
                  onClick={(event) => {
                    event.stopPropagation();
                    handleDialog("Rejected");
                  }}
                >
                  NOPE
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </article>
  );
};

export default HomeYouTubeEmbed;
