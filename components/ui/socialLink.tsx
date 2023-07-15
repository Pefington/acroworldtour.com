import cn from "classix";
import Link from "next/link";

import {
  FacebookIcon,
  InstagramIcon,
  TikTokIcon,
  TwitterIcon,
  WebsiteIcon,
  WikipediaIcon,
  YouTubeIcon,
} from "./icons";

interface Props {
  className?: string;
  link: string;
}

const SocialLink = ({ className, link }: Props) => {
  const mediaLookup: { [substring: string]: string } = {
    facebook: "Facebook",
    instagram: "Instagram",
    tiktok: "TikTok",
    twitter: "Twitter",
    "/t.co": "Twitter",
    wiki: "Wikipedia",
    youtube: "YouTube",
    "youtu.be": "YouTube",
  };

  let media;

  for (const substring in mediaLookup) {
    if (link.includes(substring)) {
      media = mediaLookup[substring];
      break;
    }
  }

  return (
    <Link
      href={{ pathname: link }}
      title={media}
      target="_blank"
      className={cn(
        /* "icons", in caller */
        className,
      )}
      rel="noopener noreferrer"
    >
      {(media === "Facebook" && <FacebookIcon />) ||
        (media === "Instagram" && <InstagramIcon />) ||
        (media === "TikTok" && <TikTokIcon />) ||
        (media === "Twitter" && <TwitterIcon />) ||
        (media === "Wikipedia" && <WikipediaIcon />) ||
        (media === "YouTube" && <YouTubeIcon />) || <WebsiteIcon />}
    </Link>
  );
};

export default SocialLink;
