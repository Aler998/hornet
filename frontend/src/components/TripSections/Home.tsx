import ThemeSwitcher from "../ThemeSwitcher";
import Logo from "../Logo";
import Rating from "../Rating";
import StatsBox from "../StatsBox";
import { Trip } from "../../features/trips/types";
import ExportPdfButton from "../ExportButton";
import NavigateButton from "../NavigateButton";
import InfoButton from "../InfoButton";

export function HomeContent({ trip }: { trip: Trip }) {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
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
      <p className="font-oswald font-semibold p-2 dark:text-honda text-center">{trip.description}</p>
      <StatsBox
        time={trip.time}
        liters={trip.liters}
        km={trip.km}
        velocity={trip.velocity}
      />
      <div className="flex justify-center items-center gap-4">
        <InfoButton trip={trip} />
        <NavigateButton places={trip.places} />
        <ExportPdfButton
          immagini={trip.images.map(
            (image) => import.meta.env.VITE_ASSETS_URL + image.path,
          )}
        />
      </div>
    </div>
  );
}
