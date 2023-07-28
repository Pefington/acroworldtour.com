import cx from "classix";
import { NextPageContext } from "next/types";

interface Props {
  statusCode?: number;
}

const Error = ({ statusCode }: Props) => {
  return (
    <h2
      className={cx(
        "w-screen grow",
        "flex items-center justify-center",
        "text-lg font-bold",
        "sm:text-xl",
      )}
    >
      {statusCode
        ? `${statusCode} ${(
            <div className="mx-3 h-12 w-[2px] bg-primary/50" />
          )} An error occurred on the server.`
        : "An error occurred on the client"}
    </h2>
  );
};

Error.getInitialProps = ({
  res,
  err,
}: {
  res: NextPageContext["res"];
  err: NextPageContext["err"];
}) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
