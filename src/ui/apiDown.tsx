import cn from "classix";
import Image from "next/image";

const ApiDown = () => {
  return (
    <div
      className={cn(
        "flex flex-col items-center gap-8",
        "w-screen",
        "px-8",
        "text-center text-2xl font-bold uppercase text-[#6783b0]",
        "sm:text-2xl",
      )}
    >
      <p className={cn("animate-pulse")}>Waking up the database...</p>
      <Image
        src="/img/wakeup.webp"
        alt="Waking up the API"
        width={446}
        height={413}
        className="-mb-4 -mr-4 -mt-8"
      />
      <p className={cn("animate-pulse")}>This may take a minute.</p>
    </div>
  );
};

export default ApiDown;
