import cn from "classix";

const Custom404 = () => {
  return (
    <h2
      className={cn(
        "bg-[url('/img/404.jpg')] bg-cover bg-center bg-no-repeat",
        "w-screen grow",
        "flex items-center justify-center",
        "text-lg font-bold",
        "sm:text-xl",
      )}
    >
      404 <div className="mx-3 h-12 w-[2px] bg-primary/50" /> This page could
      not be found.
    </h2>
  );
};

export default Custom404;
