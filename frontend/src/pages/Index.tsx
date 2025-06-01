import Layout from "../components/Layout/Layout";
import { useGetTripsQuery } from "../features/trips/tripsApi";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { NavItem } from "../utils/types";
import Home from "../components/HomeSections/Home";
import { heatmapNav, homeNav, todoNav } from "../components/NavItems";
import { Trip as ITrip } from "../features/trips/types";
import HeatmapContent from "../components/HomeSections/Map";
import TodoContent from "../components/HomeSections/Todo";

function Index() {
  const { data: trips, isLoading, isError, error } = useGetTripsQuery();
  const tabs: NavItem[] = [homeNav, heatmapNav, todoNav];
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true)

  const [selectedTab, setSelectedTab] = useState<NavItem>(tabs[0]);

  useEffect(() => {
    setLoading(isLoading)
  }, [isLoading])
  

  useEffect(() => {
    if (isError && error && typeof error === "object" && "status" in error) {
      const status = (error as { status: number }).status;
      navigate(`/${status}`);
    }
  }, [isError, error, navigate]);

  const renderTab = (tab: string, trips: ITrip[]) => {
    switch (tab) {
      case "details":
        return <Home title="IlMotoDiario" trips={trips} />;
      case "heatmap":
        return (
          <HeatmapContent
            places={trips.flatMap((trip) => (trip.places ? trip.places : []))}
          />
        );
      case "todos":
        return <TodoContent setLoading={setLoading}/>;
      default:
        return <p>Unknown status</p>;
    }
  };

  return (
    <Layout
      tabs={tabs}
      selectedTab={selectedTab}
      setSelectedTab={setSelectedTab}
      isLoading={loading}
      title="IlMotoDiario"
    >
      {trips ? renderTab(selectedTab.label, trips) : ""}
    </Layout>
  );
}

export default Index;
