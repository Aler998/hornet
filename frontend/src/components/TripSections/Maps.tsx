import { MdOutlineMap } from "react-icons/md";
import { Trip } from "../../features/trips/types";
import GPXMap from "../GPXMap";

export const mapsNav = {
  label: "maps",
  nav: (
    <span className="mx-2 flex items-center font-oswald font-semibold text-lg cursor-pointer">
      <MdOutlineMap className="mr-2" /> Mappe
    </span>
  ),
};

export const MapsContent = ({ trip }: { trip: Trip }) => {
  return trip.decodedTracks ? (
    <div className="w-full h-full overflow-scroll max-w-5xl px-4">
      <h4 className="text-4xl font-oswald text-honda font-semibold text-center leading-[var(--navbar-height)] h-[var(--navbar-height)]">
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
