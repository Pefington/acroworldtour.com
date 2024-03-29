import { SPORTING_CODE_MANUAL_URL } from "@constants";
import cx from "classix";
import Link from "next/link";

const HomeRules = () => (
  <section className={cx("awt-home-section awt-center", "flex flex-col")}>
    <h2 className={cx("mb-8 text-3xl font-black uppercase", "md:text-5xl")}>Learn the Rules</h2>
    <p>
      If you are interested in learning more about the insights of the competitions like the rules,
      tricks, scoring etc. Download the FAI Sporting Code 7B here.
    </p>
    <Link
      href={{
        pathname: SPORTING_CODE_MANUAL_URL,
      }}
      target="_blank"
      rel="noopener noreferrer"
      className={cx(
        "w-full max-w-sm",
        "mt-7 p-4",
        "text-center text-sm font-bold",
        "rounded-xl bg-secondary-light text-accent shadow",
        "hover:bg-secondary-light-hover hover:shadow-md",
      )}
    >
      📑 Download the FAI Sporting Code
    </Link>
  </section>
);

export default HomeRules;
