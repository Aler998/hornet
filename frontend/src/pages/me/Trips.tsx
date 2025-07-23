import { useGetTripsQuery } from "../../features/trips/tripsApi";
import { useNavigate } from "react-router-dom";
import MeLayout from "../../components/Layout/MeLayout";
import Masonry from "react-masonry-css";
import { useGetMeQuery } from "../../features/auth/authApi";
import { useEffect } from "react";
import TripCard from "../../components/TripCard";

function Trips() {
  const { data: trips, isLoading, isError } = useGetTripsQuery({});
  const navigate = useNavigate();
  const { data: me, isLoading: meLoading, isError: meError } = useGetMeQuery();

  useEffect(() => {
    if (isError || meError) {
      navigate("/500");
    }
  }, [me, isError, trips, meError, navigate]);

  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1,
  };
  return (
    <MeLayout me={me} isLoading={isLoading || meLoading} title="IlMotoDiario">
      <div className="max-w-3xl mx-auto px-4">
        {trips ? (
          <>
            <Masonry
              breakpointCols={breakpointColumnsObj}
              className="my-masonry-grid"
              columnClassName="my-masonry-grid_column"
            >
              {trips.map((trip, index) => {
                return <TripCard trip={trip} index={index} />;
              })}
            </Masonry>
          </>
        ) : (
          ""
        )}
      </div>
    </MeLayout>
  );
}

export default Trips;
