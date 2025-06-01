import { Trip } from "../../features/trips/types";
import GPXMap from "../GPXMap";

export const MapsContent = ({ trip }: { trip: Trip }) => {
  return trip.decodedTracks ? (
    <div className="w-full h-full overflow-scroll max-w-5xl px-4">
      <h4 className="text-4xl font-oswald text-gray-900 font-semibold text-center leading-[var(--navbar-height)] h-[var(--navbar-height)]">
        Mappa
      </h4>
      {trip.decodedTracks.map((track, index) => {
        if (trip.decodedTracks && trip.decodedTracks.length > 1) {
          return (
            <GPXMap
              key={index}
              classes="mb-[2rem] h-[calc(100vh-var(--navbar-height)-var(--navbar-height)-2rem)]"
              serverData={track}
            />
          );
        } else {
          return (
            <GPXMap
              key={index}
              classes="h-[calc(100vh-var(--navbar-height)-var(--navbar-height))]"
              serverData={track}
            />
          );
        }
      })}
    </div>
  ) : (
    ""
  );
};
