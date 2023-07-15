import cn from "classix";
import Image from "next/image";
import { useEffect, useState } from "react";

import { YouTubeIcon } from "@/components/ui/icons";
import useLocalStorage from "@/state/useLocalStorage";
import { useUserContext } from "@/state/userContext";

interface Props {
  title: string;
  embedId: string;
}

const HomeYouTubeEmbed = ({ title, embedId }: Props) => {
  const [showDialog, setShowDialog] = useState(false);
  const { youTubeConsent, setYouTubeConsent } = useUserContext();
  const [storedYouTubeConsent, setStoredYouTubeConsent] = useLocalStorage(
    "youTubeConsent",
    null,
  );

  useEffect(() => {
    if (storedYouTubeConsent) {
      setYouTubeConsent(storedYouTubeConsent);
    } else {
      setStoredYouTubeConsent(youTubeConsent);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setStoredYouTubeConsent(youTubeConsent);
  }, [setStoredYouTubeConsent, youTubeConsent]);

  const handleDialog = (choice: "Accepted" | "Rejected") => {
    if (choice === "Accepted") setYouTubeConsent(true);
    setShowDialog(false);
  };

  return (
    <article className={cn("w-full", "lg:w-2/3")}>
      <h2 className={cn("mb-4 text-3xl font-black uppercase")}>{title}</h2>
      {youTubeConsent ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${embedId}`}
          title="YouTube Video Player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className={cn("aspect-video w-full rounded shadow-md outline-none")}
        />
      ) : (
        <div
          role="button"
          tabIndex={0}
          className={cn(
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
            className={cn("rounded object-cover")}
          />

          <YouTubeIcon className={cn("z-20 scale-[300%] fill-[#ff0000]")} />
          <div className={cn("absolute z-10 h-8 w-8 bg-white")} />

          {showDialog && (
            <div
              className={cn(
                "absolute z-30 flex max-w-sm flex-col gap-4",
                "rounded bg-white shadow-xl",
                "text-left text-lg font-semibold",
                "px-2 py-8",
                "lg:px-8",
              )}
            >
              <p>
                {`Choosing 'OK' will load the YouTube embed and Google may track you.`}
              </p>
              <p>{`We can't help that.`}</p>
              <div className={cn("mt-4 flex w-full justify-center gap-8")}>
                <button
                  className={cn(
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
                  className={cn(
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
