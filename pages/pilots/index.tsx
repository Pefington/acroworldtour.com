import { useEffect } from "react";
import useSWR from "swr";

import { useLayout } from "@/components/layout/layoutContext";
import PilotCard from "@/components/pilot/pilotCard";
import FetchError from "@/components/ui/fetchError";
import FetchLoading from "@/components/ui/fetchLoading";
import { API_URL } from "@/constants";
import { components } from "@/types";

type Pilot = components["schemas"]["Pilot"];

const Pilots = () => {
  const {
    setPageTitle,
    setPageDescription,
    setActiveNav,
  } = useLayout();

  useEffect(() => {
    setPageTitle("Acro World Tour | Pilots");
    setPageDescription(`All the pilots of the Acro World Tour.`);
    setActiveNav("pilots");
  }, [
    setActiveNav,
    setPageDescription,
    setPageTitle,
  ]);

  const {
    data: pilots,
    error,
    isLoading,
  } = useSWR<Pilot[], Error>(`${API_URL}/pilots/`);

  if (isLoading) return <FetchLoading />;
  if (error) return <FetchError />;
  if (!pilots) return <h2>No pilots found.</h2>;

  const awtPilots = pilots.filter((pilot) => pilot.is_awt);
  const awqPilots = pilots.filter(
    (pilot) => !pilot.is_awt && pilot.rank < 9999,
  );

  return (
    <>
      <h2>AWT Pilots</h2>
      <section className="wrapper">
        {awtPilots.map((pilot) => (
          <PilotCard key={pilot.civlid} pilot={pilot} />
        ))}
      </section>

      <h2>AWQ Pilots</h2>
      <section className="wrapper">
        {awqPilots.map((pilot) => (
          <PilotCard key={pilot.civlid} pilot={pilot} />
        ))}
      </section>
    </>
  );
};

export default Pilots;
