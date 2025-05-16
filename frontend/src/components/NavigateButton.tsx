import { FC } from "react";
import { Place } from "../features/trips/types";
import { IoNavigateCircle } from "react-icons/io5";
import Swal from "sweetalert2";

type NavigateBtnProps = {
  places?: Place[];
};
const NavigateButton: FC<NavigateBtnProps> = ({ places }) => {
  const generateUrl = () => {
    if (places) {
      const destination = `${places[places.length - 1].lat},${places[places.length - 1].lon}`;
      const waypoints = places
        .slice(1, -1)
        .map((place) => `${place.lat},${place.lon}`)
        .join("|");

      const url = `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent("Current+Location")}&destination=${encodeURIComponent(destination)}&waypoints=${encodeURIComponent(waypoints)}`;
      window.open(url, "_blank");
    } else {
      Swal.fire("Nessuna località impostata");
    }
  };

  return (
    <button
      onClick={generateUrl}
      className="text-white bg-honda px-5 py-1 border-none cursor-pointer text-base flex items-center justify-center"
    >
      Naviga
      <IoNavigateCircle className="ml-2" />
    </button>
  );
};

export default NavigateButton;
