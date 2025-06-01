import Swal from "sweetalert2";
import { MdInfoOutline, MdOutlineEuro } from "react-icons/md";
import { Trip } from "../features/trips/types";
import { ReactNode } from "react";
import { renderToString } from "react-dom/server";
import { RxLapTimer } from "react-icons/rx";
import { MdLocalGasStation } from "react-icons/md";
import { GiPathDistance } from "react-icons/gi";
import { BiTachometer } from "react-icons/bi";
import { formatMinutes } from "../utils/format-date";

function InfoButton({ trip }: { trip: Trip }) {
  const buildHtmlTitle = (): ReactNode => {
    return (
      <strong className="w-full text-start font-oswald">
        {trip.title.toLocaleUpperCase()}
      </strong>
    );
  };
  const buildHtmlBody = (): ReactNode => {
    return (
      <>
        <p className="mb-2">{trip.description}</p>
        <hr className="my-4" />
        <ul className="list-none">
          <li className="mb-2">
            <p>Tempo di percorrenza</p>
            <span>
              <RxLapTimer className="mr-2" color="#ea3323" />
              {formatMinutes(trip.time)}
            </span>
          </li>
          <li className="mb-2">
            <p>Kilometri totali percorsi</p>
            <span>
              <GiPathDistance className="mr-2" color="#ea3323" />
              {trip.km}Km
            </span>
          </li>
          <li className="mb-2">
            <p>Velocità media</p>
            <span>
              <BiTachometer className="mr-2" color="#ea3323" />
              {trip.velocity}Km/h
            </span>
          </li>
          <li className="mb-2">
            <p>Benzina Usata</p>
            <span>
              <MdLocalGasStation className="mr-2" color="#ea3323" />
              {(Math.round(trip.liters * 100) / 100).toFixed(2)}L
            </span>
          </li>
          <li className="mb-2">
            <p>Costo</p>
            <span>
              <MdOutlineEuro className="mr-2" color="#ea3323" />
              {(Math.round(trip.cost * 100) / 100).toFixed(2)}€
            </span>
          </li>
        </ul>
      </>
    );
  };

  const openInfo = () => {
    Swal.fire({
      title: renderToString(buildHtmlTitle()),
      //   icon: "info",
      html: renderToString(buildHtmlBody()),
      showCloseButton: true,
      showConfirmButton: false,
      //   showCancelButton: true,
      //   focusConfirm: false,
      //   confirmButtonText: `
      //       <i class="fa fa-thumbs-up"></i> Great!
      //     `,
      //   confirmButtonAriaLabel: "Thumbs up, great!",
      //   cancelButtonText: `
      //       <i class="fa fa-thumbs-down"></i>
      //     `,
      //   cancelButtonAriaLabel: "Thumbs down",
    });
  };

  return (
    <button
      onClick={openInfo}
      className="font-inter border-none cursor-pointer flex justify-center items-center bg-gray-900 rounded text-white px-4 py-3 text-sm no-underline hover:bg-gray-600 duration-500"
    >
      Info
      <MdInfoOutline className="ml-2" />
    </button>
  );
}

export default InfoButton;
