import cn from "classix";

const Custom500 = () => {
  return (
    <h2
      className={cn(
        "w-screen grow",
        "flex items-center justify-center",
        "text-lg font-bold",
        "sm:text-xl",
      )}
    >
      500 <div className="mx-3 h-12 w-[2px] bg-primary/50" /> There was an error
      on our side. Please try again later.
    </h2>
  );
};

export default Custom500;
