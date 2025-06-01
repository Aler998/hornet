import ThemeSwitcher from "../ThemeSwitcher";
import Rating from "../Rating";
import StatsBox from "../StatsBox";
import { Trip } from "../../features/trips/types";
// import ExportPdfButton from "../ExportButton";
import NavigateButton from "../NavigateButton";
import InfoButton from "../InfoButton";
import Logo from "../Logo";

export function HomeContent({ trip }: { trip: Trip }) {
  const renderTitle = () => {
    const trimmed = trip.title.trim();
    const length = trimmed.length;

    const mid = Math.floor(length / 2);

    const firstHalf = trimmed.slice(0, mid);
    const secondHalf = trimmed.slice(mid);
    return (
      <h1 className="text-center text-3xl font-medium text-gray-900 dark:text-gray-50 sm:text-6xl font-inter">
        {firstHalf}
        <span className="font-inter animate-text-gradient inline-flex bg-gradient-to-r from-neutral-900 via-slate-500 to-neutral-500 bg-[200%_auto] bg-clip-text leading-tight text-transparent dark:from-neutral-100 dark:via-slate-400 dark:to-neutral-400">
          {secondHalf}
        </span>
      </h1>
    );
  };

  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <div className="absolute top-8 right-4">
        <ThemeSwitcher />
      </div>
        <Logo classes="w-10 h-10"/>
      {renderTitle()}
      <Rating
        voto={trip.rating}
        placeItems="place-items-center"
        dimensions="w-8 h-8"
      />
      {/* <ExportPdfButton
          immagini={trip.images.map(
            (image) => import.meta.env.VITE_ASSETS_URL + image.path
          )}
        /> */}
      <p className="mt-6 text-center text-lg leading-6 text-gray-600 dark:text-gray-200 font-inter max-w-2xl px-4">
        {trip.description}
      </p>
      <StatsBox
        time={trip.time}
        liters={trip.liters}
        km={trip.km}
        velocity={trip.velocity}
      />
      <div className="flex justify-center items-center gap-4">
        <InfoButton trip={trip} />
        <NavigateButton places={trip.places} />
        
      </div>
    </div>
  );
}
