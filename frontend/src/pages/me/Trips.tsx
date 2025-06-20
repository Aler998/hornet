import { useGetTripsQuery } from "../../features/trips/tripsApi";
import { Link, useNavigate } from "react-router-dom";
import MeLayout from "../../components/Layout/MeLayout";
import Rating from "../../components/Rating";
import PlaceHolderImage from "../../components/PlaceHolderImage";
import Masonry from "react-masonry-css";
import { useGetMeQuery } from "../../features/auth/authApi";
import { useEffect } from "react";

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
                return (
                  <div
                    key={index}
                    className="block relative group w-full break-inside-avoid"
                  >
                    <Link
                      to={`/me/trip/${trip.slug}`}
                      className="block relative w-full"
                    >
                      {trip.images.length > 0 ? (
                        <img
                          className="w-full h-full"
                          src={
                            import.meta.env.VITE_ASSETS_URL +
                            trip.images[0].path
                          }
                        />
                      ) : (
                        <PlaceHolderImage classes="w-full h-full" />
                      )}
                      <div className="absolute top-0 left-0 w-full text-white capitalize bg-gradient-to-b p-2 from-slate-700 to-white/0">
                        <h5 className="fonte-inter">{trip.title}</h5>
                      </div>
                      <div className="absolute bottom-0 left-0 w-full">
                        <Rating voto={trip.rating} />
                      </div>
                    </Link>
                  </div>
                );
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
