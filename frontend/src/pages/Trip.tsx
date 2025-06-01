import { useNavigate, useParams } from "react-router-dom";
import { useGetTripQuery } from "../features/trips/tripsApi";
import "react-image-gallery/styles/css/image-gallery.css";
import { useEffect, useState } from "react";
import { Trip as ITrip } from "../features/trips/types";
import { HomeContent } from "../components/TripSections/Home";
import { GalleryContent } from "../components/TripSections/Gallery";
import { MapsContent } from "../components/TripSections/Maps";
import Layout from "../components/Layout/Layout";
import { NavItem } from "../utils/types";
import { galleryNav, homeNav, mapsNav } from "../components/NavItems";

function Trip() {
  const { slug } = useParams<{ slug: string }>();
  const { data: trip, isLoading, isError, error } = useGetTripQuery(slug!);
  const navigate = useNavigate();

  const tabs = [homeNav, galleryNav, mapsNav];
  const [selectedTab, setSelectedTab] = useState<NavItem>(tabs[0]);

  const renderTab = (tab: string, trip: ITrip) => {
    switch (tab) {
      case "details":
        return <HomeContent trip={trip} />;
      case "gallery":
        return <GalleryContent trip={trip} />;
      case "maps":
        return <MapsContent trip={trip} />;
      default:
        return <p>Unknown status</p>;
    }
  };

  useEffect(() => {
    if (isError && error && typeof error === "object" && "status" in error) {
      const status = (error as { status: number }).status;
      navigate(`/${status}`);
    }
  }, [isError, error, navigate]);

  if (trip) {
    return (
      <Layout
        title={`IlMotoDiario - ${trip.title}`}
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
        tabs={tabs}
        isLoading={isLoading}
      >
        {renderTab(selectedTab.label, trip)}
      </Layout>
    );
  }
}

export default Trip;
