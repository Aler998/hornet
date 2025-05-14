import ThemeSwitcher from "../ThemeSwitcher";
import Logo from "../Logo";
import Rating from "../Rating";
import StatsBox from "../StatsBox";
import { Trip } from "../../features/trips/types";
import { MdSpaceDashboard } from "react-icons/md";
import ExportPdfButton from "../ExportButton";

// eslint-disable-next-line react-refresh/only-export-components
export const homeNav = {
  label: "details",
  nav: (
    <span className="mx-2 flex items-center font-oswald font-semibold text-lg cursor-pointer">
      <MdSpaceDashboard className="mr-2" /> Home
    </span>
  ),
};

export function HomeContent({ trip }: { trip: Trip }) {
  return (
    <>
      <div className="absolute top-8 right-4">
        <ThemeSwitcher />
      </div>
      <Logo classes="w-20 h-20" />
      <h1 className="font-oswald text-6xl my-4 dark:text-honda text-center">
        {trip.title}
      </h1>
      <Rating
        voto={trip.rating}
        placeItems="place-items-center"
        dimensions="w-8 h-8"
      />
      <p className="font-oswald font-semibold p-2">{trip.description}</p>
      <StatsBox
        start={trip.start}
        end={trip.end}
        liters={trip.liters}
        km={trip.km}
        velocity={trip.velocity}
      />
      <ExportPdfButton
        immagini={trip.images.map(
          (image) => import.meta.env.VITE_ASSETS_URL + image.path,
        )}
      />
    </>
  );
}
